
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  requestor: z.string().min(2, "Requestor name is required"),
  dinPortfolio: z.string().min(1, "DIN portfolio is required"),
  dinFocalPoint: z.string().min(2, "DIN focal point is required"),
});

type FormValues = z.infer<typeof formSchema>;

const RequestForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [portfolioOptions, setPortfolioOptions] = useState<string[]>([]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requestor: "",
      dinPortfolio: "",
      dinFocalPoint: "",
    },
  });
  
  // Fixed: Changed useState to useEffect for loading options
  useEffect(() => {
    console.log("RequestForm - Loading portfolio options");
    // @ts-ignore - The window.google function is not recognized by TypeScript
    if (typeof window.google !== 'undefined') {
      console.log("Google Apps Script mode detected - calling getDropdownOptions");
      // @ts-ignore
      google.script.run
        .withSuccessHandler(function(options: { dinPortfolio: string[] }) {
          console.log("Options received from server:", options);
          setPortfolioOptions(options.dinPortfolio || []);
        })
        .withFailureHandler(function(error: Error) {
          console.error("Error retrieving options:", error);
          toast.error("Error loading options");
        })
        .getDropdownOptions();
    } else {
      console.log("Local development mode - using fallback options");
      // Fallback options for local development
      setPortfolioOptions([
        "Digital workspace", "Cyber security", "Roof", "Div", "Affiliate", 
        "DI-infrastructure", "LAN", "SECURITY", "Wireless & industry"
      ]);
    }
  }, []);
  
  const onSubmit = (values: FormValues) => {
    console.log("Form submission with values:", values);
    setIsSubmitting(true);
    
    // @ts-ignore - The window.google function is not recognized by TypeScript
    if (typeof window.google !== 'undefined') {
      console.log("Calling saveSimpleRequest with data:", values);
      // @ts-ignore
      google.script.run
        .withSuccessHandler(function(result: { 
          success: boolean, 
          id?: number, 
          fileWriteSuccess: boolean, 
          emailSentSuccess: boolean,
          error?: string 
        }) {
          console.log("Server response:", result);
          setIsSubmitting(false);
          if (result.success) {
            toast.success(`Request with ID ${result.id} has been created`);
            console.log("Request created successfully - ID:", result.id);
            form.reset();
          } else if (result.fileWriteSuccess && !result.emailSentSuccess) {
            toast.warning(`Request with ID ${result.id} has been created, but there was an error sending the email`);
            console.warn("Request created but email not sent - ID:", result.id);
            form.reset();
          } else if (!result.fileWriteSuccess) {
            console.error("File write error:", result.error);
            toast.error(`An error occurred while writing to the file: ${result.error || 'Unknown reason'}`);
          } else {
            console.error("General error:", result.error);
            toast.error(`An error occurred: ${result.error || 'Unknown reason'}`);
          }
        })
        .withFailureHandler(function(error: Error) {
          console.error("Error calling saveSimpleRequest:", error);
          setIsSubmitting(false);
          toast.error(`An error occurred: ${error.message}`);
        })
        .saveSimpleRequest(values);
    } else {
      // Simulation for local development
      console.log("Local development mode - simulating submission");
      setTimeout(() => {
        setIsSubmitting(false);
        const mockId = Math.floor(Math.random() * 100) + 1;
        console.log("Simulation - Generated ID:", mockId);
        toast.success(`Request with ID ${mockId} has been created (simulation)`);
        form.reset();
      }, 1000);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white relative overflow-hidden">
      {/* Background Design */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, #FF4B00 0%, transparent 40%),
              radial-gradient(circle at 80% 80%, #FF8E00 0%, transparent 40%)
            `,
            opacity: 0.1
          }}
        />
        <div className="absolute -top-[50%] -left-[10%] w-[100%] h-[150%] bg-[#FF4B00]/10 blur-[120px] transform rotate-12" />
        <div className="absolute -bottom-[50%] -right-[10%] w-[100%] h-[150%] bg-[#FF8E00]/10 blur-[120px] transform -rotate-12" />
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto p-6">
        <div className="mb-8 pt-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-[#FF4B00] hover:text-[#FF8E00] transition-colors duration-300">
            New DIN Request
          </h1>
          <p className="text-center text-gray-300 mb-6">
            Fill out the form below to submit a new request
          </p>
        </div>
        
        <div className="bg-[#222222] p-6 rounded-xl shadow-lg border border-[#333333]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="requestor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requestor / Customer</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Requestor name" 
                        {...field} 
                        className="bg-[#2A2A2A] border-[#444] focus:border-[#FF4B00]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dinPortfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DIN Portfolio</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-[#2A2A2A] border-[#444] focus:border-[#FF4B00]">
                          <SelectValue placeholder="Select a portfolio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#2A2A2A] border-[#444]">
                        {portfolioOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dinFocalPoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DIN Focal Point</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="DIN focal point" 
                        {...field} 
                        className="bg-[#2A2A2A] border-[#444] focus:border-[#FF4B00]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#FF4B00] to-[#FF8E00] hover:from-[#FF6B00] hover:to-[#FFAA00]"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
