import { useState, useEffect, useRef } from "react";
import { useLocation, useRoute } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@modl-gg/shared-web/components/ui/form";
import { Input } from "@modl-gg/shared-web/components/ui/input";
import { Button } from "@modl-gg/shared-web/components/ui/button";
import { Checkbox } from "@modl-gg/shared-web/components/ui/checkbox";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import SuccessModal from "./SuccessModal";
import { Label } from "@modl-gg/shared-web/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@modl-gg/shared-web/components/ui/alert";
import { useToast } from '@modl-gg/shared-web/hooks/use-toast';
import Turnstile, { TurnstileRef } from "../ui/Turnstile";


const BLOCKED_SUBDOMAINS = [
  'panel',
  'admin',
  'support',
  'payments',
  'api',
  'www',
  'mail',
  'email',
  'ftp',
  'ssh',
  'vpn',
  'help',
  'blog',
  'docs',
  'status',
  'app',
  'dashboard',
  'portal',
  'login',
  'signup',
  'register',
  'billing',
  'account',
  'secure',
  'dev',
  'test',
  'staging',
  'prod',
  'production',
  'demo',
  'beta',
  'alpha',
  'internal',
  'staff',
  'employee',
  'root',
  'super',
  'master',
  'owner',
  'moderator',
  'mod',
  'administrator'
];

const registrationSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  serverName: z.string()
    .min(3, { message: "Server name is required (min 3 characters)" })
    .max(100, { message: "Server name must be less than 100 characters" })
    .trim(),
  customDomain: z.string()
    .trim()
    .min(3, { message: "Subdomain is required (min 3 characters)" })
    .max(50, { message: "Subdomain must be less than 50 characters" })
    .regex(/^[a-z0-9-]+$/, { message: "Subdomain can only contain lowercase letters, numbers, and hyphens" })
    .refine((domain) => !BLOCKED_SUBDOMAINS.includes(domain.toLowerCase()), {
      message: "This subdomain is reserved and cannot be used. Please choose a different one.",
    }),
  
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms to continue" }),
  }),
  turnstileToken: z.string().min(1, { message: "Security verification is required" }),
});

type RegistrationValues = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/register");
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredDomain, setRegisteredDomain] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileRef>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  
  const form = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      serverName: "",
      customDomain: "",
      agreeTerms: false as any, // Will be validated by Zod
      turnstileToken: "",
    },
  });

  const onSubmit = async (values: RegistrationValues) => {
    // Ensure Turnstile token is present before submission
    if (!values.turnstileToken) {
      toast({
        title: "Security verification required",
        description: "Please wait for security verification to complete",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setEmailError(null); // Clear any previous email errors
    try {
      // Always submit with free plan - premium upgrades handled in modl-panel
      const submitData = {
        ...values,
        plan: "free" as const
      };
      const res = await apiRequest("POST", "/api/register", submitData);
      if (res.ok) {
        setShowSuccess(true);
        setRegisteredDomain(values.customDomain); // Save the custom domain
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;

        // Helper function to safely parse error response
        const parseErrorResponse = (message: string) => {
          try {
            // Find the colon separator after status code
            const colonIndex = message.indexOf(':');
            if (colonIndex === -1) {
              return { message: message };
            }

            const responseText = message.substring(colonIndex + 1).trim();

            // Try to parse as JSON first
            try {
              return JSON.parse(responseText);
            } catch {
              // If not JSON, return as plain text message
              return { message: responseText };
            }
          } catch {
            // Fallback to original message
            return { message: message };
          }
        };

        const parsedError = parseErrorResponse(errorMessage);

        // Check if it's a 409 error (duplicate email)
        if (errorMessage.startsWith("409:")) {
          // Check if the error message indicates email already exists
          if (parsedError.message && parsedError.message.toLowerCase().includes("email")) {
            setEmailError(parsedError.message);
            // Scroll to top to show the error
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return; // Don't show toast for email errors
          }
        }

        // For all other errors, use toast
        toast({
          title: "Registration failed",
          description: parsedError.message || "Please try again later",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration failed",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const backToHome = () => {
    navigate("/");
  };

  const handleTurnstileSuccess = (token: string) => {
    console.log("Turnstile verification successful");
    form.setValue("turnstileToken", token);
    setTurnstileReady(true);
  };

  const handleTurnstileError = () => {
    console.log("Turnstile verification failed");
    form.setValue("turnstileToken", "");
    setTurnstileReady(false);
    toast({
      title: "Verification failed",
      description: "Please try again",
      variant: "destructive",
    });
  };

  const handleTurnstileExpired = () => {
    console.log("Turnstile verification expired, retrying...");
    form.setValue("turnstileToken", "");
    setTurnstileReady(false);
    // Auto-retry on expiration
    setTimeout(() => {
      turnstileRef.current?.execute();
    }, 1000);
  };

  const handleTurnstileLoad = () => {
    // Turnstile loaded and ready for interaction
    console.log("Turnstile widget loaded");
    // Execute immediately in invisible mode
    setTimeout(() => {
      turnstileRef.current?.execute();
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SuccessModal show={showSuccess} onClose={() => setShowSuccess(false)} customDomain={registeredDomain} />
      
      <nav className="bg-background/90 backdrop-blur border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="#" onClick={(e) => { e.preventDefault(); backToHome(); }} className="flex items-center">
              <span className="text-2xl font-bold text-primary font-['Audiowide',cursive]">modl</span>
              <span className="ml-2 text-xs text-muted-foreground mt-1">BETA</span>
            </a>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground flex items-center" onClick={backToHome}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </div>
        </div>
      </nav>
      
        <div className="flex items-center justify-center p-4 sm:p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Register your server</h2>
              <p className="text-muted-foreground">
                Create a panel for your server and start using in minutes with our free plan.
              </p>
            </div>
            
            {emailError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Registration Error</AlertTitle>
                <AlertDescription>
                  {emailError}
                </AlertDescription>
              </Alert>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Admin Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          {...field}
                          className="px-4 py-3 rounded-md bg-card/50 border border-gray-700 text-foreground focus:outline-none focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="serverName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Server Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="My Awesome Server"
                          {...field}
                          className="px-4 py-3 rounded-md bg-card/50 border border-gray-700 text-foreground focus:outline-none focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="customDomain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Panel Subdomain <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input
                            placeholder="yourserver"
                            {...field}
                            className="px-4 py-3 rounded-l-md bg-card/50 border border-gray-700 text-foreground focus:outline-none focus:border-primary"
                          />
                        </FormControl>
                        <div className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-700 bg-card/80 text-muted-foreground">
                          .{process.env.APP_DOMAIN || 'modl.gg'}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-xs mt-1">You can setup your own custom domain after registration</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-1">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="agree-terms"
                          className="h-4 w-4 rounded border-gray-700 bg-card/50 text-primary focus:ring-primary focus:ring-offset-background"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <Label
                          htmlFor="agree-terms"
                          className="text-sm text-foreground cursor-pointer"
                        >
                          I agree to the <a href="/terms" className="text-primary hover:text-primary/80" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy" className="text-primary hover:text-primary/80" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                        </Label>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Turnstile Component - Hidden/Background verification */}
                <Turnstile
                  ref={turnstileRef}
                  sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                  onSuccess={handleTurnstileSuccess}
                  onError={handleTurnstileError}
                  onExpired={handleTurnstileExpired}
                  onLoad={handleTurnstileLoad}
                  invisible={true}
                  theme="auto"
                  action="register"
                />

                {/* Hidden field for Turnstile token */}
                <FormField
                  control={form.control}
                  name="turnstileToken"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input {...field} type="hidden" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </form>
            </Form>
        </div>
      </div>
    </div>
  );
}
