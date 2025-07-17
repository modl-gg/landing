import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "modl-shared-web/components/ui/form";
import { Input } from "modl-shared-web/components/ui/input";
import { Button } from "modl-shared-web/components/ui/button";
import { Checkbox } from "modl-shared-web/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import SuccessModal from "./SuccessModal";
import { Label } from "modl-shared-web/components/ui/label";

const registrationSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  serverName: z.string().min(3, { message: "Server name is required (min 3 characters)" }),
  customDomain: z.string().min(3, { message: "Subdomain is required (min 3 characters)" }),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms to continue" }),
  }),
});

type RegistrationValues = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/register");
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredDomain, setRegisteredDomain] = useState<string | undefined>(undefined);
  
  const form = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      serverName: "",
      customDomain: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (values: RegistrationValues) => {
    setIsSubmitting(true);
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
      toast({
        title: "Registration failed",
        description: error instanceof Error ? JSON.parse(error.message.substring(4)).message : "Please try again later", // substring 4 to remove '500: ' from the beginning of JSON string
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const backToHome = () => {
    navigate("/");
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
