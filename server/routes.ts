import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import nodemailer from "nodemailer"; // Added
import crypto from "crypto"; // Added
import 'dotenv/config';

// Turnstile validation function
async function validateTurnstileToken(token: string, remoteip?: string): Promise<boolean> {
  try {
    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      console.error('TURNSTILE_SECRET_KEY is not set in environment variables');
      return false;
    }

    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (remoteip) {
      formData.append('remoteip', remoteip);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Error validating Turnstile token:', error);
    return false;
  }
}

// Registration schema that allows spaces in server names
const registrationSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  serverName: z.string()
    .min(3, { message: "Server name is required (min 3 characters)" })
    .max(100, { message: "Server name must be less than 100 characters" })
    .trim(),
  customDomain: z.string()
    .min(3, { message: "Subdomain is required (min 3 characters)" })
    .max(50, { message: "Subdomain must be less than 50 characters" })
    .regex(/^[a-z0-9-]+$/, { message: "Subdomain can only contain lowercase letters, numbers, and hyphens" })
    .trim(),
  plan: z.enum(["free", "premium"]).default("free"),
  turnstileToken: z.string().min(1, { message: "Security verification is required" }),
});

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
      
      // Validate Turnstile token
      const turnstileValid = await validateTurnstileToken(validatedData.turnstileToken, clientIP);
      if (!turnstileValid) {
        console.log(`Turnstile validation failed for IP ${clientIP}`);
        return res.status(400).json({
          success: false,
          message: "Security verification failed. Please try again."
        });
      }
      
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
      const smtpPort = Number(process.env.SMTP_PORT) || 25;
      const emailAuth = {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD 
      };
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "localhost", // Assuming postfix is running on localhost
        port: smtpPort,
        secure: false, // true for 465, false for other ports
        tls: {
          rejectUnauthorized: false // Allow self-signed certificates
        },
        auth: (emailAuth.user && emailAuth.pass) ? emailAuth : undefined
      });

      const appDomain = process.env.APP_DOMAIN || "modl.gg";
      const verificationLink = `https://${serverInfo.customDomain}.${appDomain}/verify-email?token=${emailVerificationToken}`;

      await transporter.verify();
      await transporter.sendMail({
        from: `"modl" <noreply@${appDomain}>`, // sender address
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
        // Create a more user-friendly validation error message
        const fieldErrors = error.errors.map(err => {
          const field = err.path.join('.');
          return `${field}: ${err.message}`;
        }).join(', ');

        return res.status(400).json({
          success: false,
          message: `Validation failed: ${fieldErrors}`,
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
