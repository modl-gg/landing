import { useState, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@modl-gg/shared-web/components/ui/form";
import { Input } from "@modl-gg/shared-web/components/ui/input";
import { Button } from "@modl-gg/shared-web/components/ui/button";
import { Checkbox } from "@modl-gg/shared-web/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import SuccessModal from "./SuccessModal";
import { Label } from "@modl-gg/shared-web/components/ui/label";
import { useToast } from '@modl-gg/shared-web/hooks/use-toast';
import Turnstile, { TurnstileRef } from "../ui/Turnstile";
import { cn } from "@modl-gg/shared-web/lib/utils";


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
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredDomain, setRegisteredDomain] = useState<string | undefined>(undefined);
  const turnstileRef = useRef<TurnstileRef>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);

  const form = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      serverName: "",
      customDomain: "",
      agreeTerms: false as any,
      turnstileToken: "",
    },
  });

  const { formState: { isValid, errors } } = form;

  const onSubmit = async (values: RegistrationValues) => {
    if (!values.turnstileToken) {
      toast({
        title: "Security verification required",
        description: "Please complete the security challenge before registering",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData = {
        ...values,
        plan: "free" as const
      };
      const res = await apiRequest("POST", "/v1/public/registration", submitData);
      if (res.ok) {
        setShowSuccess(true);
        setRegisteredDomain(values.customDomain);
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        const colonIndex = errorMessage.indexOf(':');
        let parsedMessage = errorMessage;

        if (colonIndex !== -1) {
          const responseText = errorMessage.substring(colonIndex + 1).trim();
          try {
            const parsed = JSON.parse(responseText);
            parsedMessage = parsed.message || responseText;
          } catch {
            parsedMessage = responseText;
          }
        }

        if (errorMessage.startsWith("409:") && parsedMessage.toLowerCase().includes("email")) {
          form.setError("email", { type: "manual", message: parsedMessage });
        } else if (errorMessage.startsWith("409:") && parsedMessage.toLowerCase().includes("server name")) {
          form.setError("serverName", { type: "manual", message: parsedMessage });
        } else if (errorMessage.startsWith("409:") && parsedMessage.toLowerCase().includes("domain")) {
          form.setError("customDomain", { type: "manual", message: parsedMessage });
        } else {
          toast({
            title: "Registration failed",
            description: parsedMessage || "Please try again later",
            variant: "destructive",
          });
        }
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

  const handleTurnstileSuccess = useCallback((token: string) => {
    console.log("Turnstile verification successful, token:", token?.substring(0, 20) + "...");
    form.setValue("turnstileToken", token);
    form.clearErrors("turnstileToken");
    setTurnstileReady(true);
  }, [form]);

  const handleTurnstileError = useCallback(() => {
    console.log("Turnstile verification failed");
    form.setValue("turnstileToken", "");
    setTurnstileReady(false);
    toast({
      title: "Verification failed",
      description: "Please try again",
      variant: "destructive",
    });
  }, [form, toast]);

  const handleTurnstileExpired = useCallback(() => {
    console.log("Turnstile verification expired, resetting...");
    form.setValue("turnstileToken", "");
    setTurnstileReady(false);
    // Reset the widget to get a new challenge
    turnstileRef.current?.reset();
  }, [form]);

  const handleTurnstileLoad = useCallback(() => {
    // Turnstile loaded and ready for interaction
    console.log("Turnstile widget loaded");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SuccessModal show={showSuccess} onClose={() => setShowSuccess(false)} customDomain={registeredDomain} />
      
      <nav className="bg-background/90 backdrop-blur border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
          <a
            href="#"
            className="text-2xl font-extrabold tracking-tight"
            onClick={(e) => { e.preventDefault(); backToHome(); }}
          >
            <span className="text-primary font-['Audiowide',cursive]">modl</span>
            <span className="text-white font-['Audiowide',cursive]">.gg</span>
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
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>
                        Admin Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          {...field}
                          className={cn(
                            "px-4 py-3 rounded-md bg-card/50 border text-foreground focus:outline-none",
                            fieldState.error
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-700 focus:border-primary"
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="serverName"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>
                        Server Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="My Awesome Server"
                          {...field}
                          className={cn(
                            "px-4 py-3 rounded-md bg-card/50 border text-foreground focus:outline-none",
                            fieldState.error
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-700 focus:border-primary"
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="customDomain"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>
                        Panel Subdomain <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input
                            placeholder="yourserver"
                            {...field}
                            className={cn(
                              "px-4 py-3 rounded-l-md bg-card/50 border text-foreground focus:outline-none",
                              fieldState.error
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-700 focus:border-primary"
                            )}
                          />
                        </FormControl>
                        <div className={cn(
                          "inline-flex items-center px-3 rounded-r-md border border-l-0 bg-card/80 text-muted-foreground",
                          fieldState.error ? "border-red-500" : "border-gray-700"
                        )}>
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

                {/* Turnstile Component - Visible widget for better reliability */}
                <div className="flex justify-center">
                  <Turnstile
                    ref={turnstileRef}
                    sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    onSuccess={handleTurnstileSuccess}
                    onError={handleTurnstileError}
                    onExpired={handleTurnstileExpired}
                    onLoad={handleTurnstileLoad}
                    invisible={false}
                    theme="auto"
                    action="register"
                    retry="auto"
                    refresh-expired="auto"
                  />
                </div>

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
                  disabled={isSubmitting || !isValid || !turnstileReady}
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
