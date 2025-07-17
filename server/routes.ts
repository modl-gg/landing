import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import nodemailer from "nodemailer"; // Added
import crypto from "crypto"; // Added
import 'dotenv/config';
import { registrationSchema } from 'modl-shared-web';

// Rate limiting for registration - stores IP addresses and their last registration time
const registrationRateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes in milliseconds

export async function registerRoutes(app: Express): Promise<Server> {
  // Registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      // Get client IP address
      const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 
                      (req.connection as any)?.socket?.remoteAddress || 'unknown';
      
      console.log(`Registration attempt from IP: ${clientIP}`);
      console.log(`Current rate limit map size: ${registrationRateLimit.size}`);
      console.log(`Rate limit entries:`, Array.from(registrationRateLimit.entries()));
      
      // Check rate limit
      const now = Date.now();
      const lastRegistration = registrationRateLimit.get(clientIP);
      
      console.log(`Last registration for IP ${clientIP}: ${lastRegistration}`);
      console.log(`Time since last registration: ${lastRegistration ? now - lastRegistration : 'N/A'}ms`);
      
      if (lastRegistration && (now - lastRegistration) < RATE_LIMIT_WINDOW_MS) {
        const remainingTime = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - lastRegistration)) / 1000 / 60);
        console.log(`Rate limit triggered for IP ${clientIP}, remaining time: ${remainingTime} minutes`);
        return res.status(429).json({
          success: false,
          message: `Rate limit exceeded. You can only register one server every 10 minutes. Please try again in ${remainingTime} minute${remainingTime !== 1 ? 's' : ''}.`
        });
      }

      const validatedData = registrationSchema.parse(req.body);
      const emailVerificationToken = crypto.randomBytes(32).toString("hex"); // Added
      
      // Create the server entry in MongoDB
      const serverInfo = await storage.createServer({
        adminEmail: validatedData.email,
        serverName: validatedData.serverName,
        customDomain: validatedData.customDomain,
        plan: validatedData.plan,
        emailVerificationToken, // Added
        emailVerified: false, // Added
      });

      // Update rate limit tracking - only after successful registration
      registrationRateLimit.set(clientIP, now);
      console.log(`Rate limit updated for IP ${clientIP} at ${now}`);
      
      // Clean up old entries (optional optimization)
      const sizeBefore = registrationRateLimit.size;
      registrationRateLimit.forEach((timestamp, ip) => {
        if (now - timestamp > RATE_LIMIT_WINDOW_MS) {
          registrationRateLimit.delete(ip);
        }
      });
      console.log(`Rate limit cleanup: ${sizeBefore} -> ${registrationRateLimit.size} entries`);

      // Send verification email
      const transporter = nodemailer.createTransport({
        host: "localhost", // Assuming postfix is running on localhost
        port: 25,
        secure: false, // true for 465, false for other ports
        tls: {
          rejectUnauthorized: false // Allow self-signed certificates
        }
      });

      const appDomain = process.env.APP_DOMAIN || "modl.gg";
      const verificationLink = `https://${serverInfo.customDomain}.${appDomain}/verify-email?token=${emailVerificationToken}`;

      await transporter.sendMail({
        from: '"modl" <noreply@cobl.gg>', // sender address
        to: validatedData.email, // list of receivers
        subject: "Verify Your Email Address for modl", // Subject line
        text: `Please verify your email address by clicking the following link: ${verificationLink}`, // plain text body
        html: `<p>Please verify your email address by clicking the following link: <a href="${verificationLink}">${verificationLink}</a></p>`, // html body
      });
      
      return res.status(201).json({ 
        success: true, 
        message: "Registration successful. Please check your email to verify your account.", // Updated message
        server: {
          id: serverInfo.id,
          name: serverInfo.serverName
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation failed. Please check the details you provided and try again.", 
          errors: error.errors
        });
      }
      // Handle duplicate entry errors from storage.createServer
      if (error instanceof Error && error.message.startsWith("DUPLICATE_ENTRY:")) {
        return res.status(409).json({
          success: false,
          message: error.message.replace("DUPLICATE_ENTRY: ", ""), // More user-friendly message
        });
      }
      
      console.error("Registration error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "An internal server error occurred during registration. Please try again later. If the issue persists, contact support."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
