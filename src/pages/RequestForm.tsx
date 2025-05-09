
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
  requestor: z.string().min(2, "Le nom du demandeur est requis"),
  dinPortfolio: z.string().min(1, "Le portfolio DIN est requis"),
  dinFocalPoint: z.string().min(2, "Le point focal DIN est requis"),
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
    // @ts-ignore - La fonction window.google n'est pas reconnue par TypeScript
    if (typeof window.google !== 'undefined') {
      // @ts-ignore
      google.script.run
        .withSuccessHandler(function(options: { dinPortfolio: string[] }) {
          setPortfolioOptions(options.dinPortfolio || []);
        })
        .getDropdownOptions();
    } else {
      // Options de secours pour le développement local
      setPortfolioOptions([
        "Digital workspace", "Cyber security", "Roof", "Div", "Affiliate", 
        "DI-infrastructure", "LAN", "SECURITY", "Wireless & industry"
      ]);
    }
  }, []);
  
  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    // @ts-ignore - La fonction window.google n'est pas reconnue par TypeScript
    if (typeof window.google !== 'undefined') {
      // @ts-ignore
      google.script.run
        .withSuccessHandler(function(result: { success: boolean, id?: number, error?: string }) {
          setIsSubmitting(false);
          if (result.success) {
            toast.success(`Demande n°${result.id} créée avec succès. Un email a été envoyé.`);
            form.reset();
          } else {
            toast.error(`Erreur lors de la création de la demande: ${result.error || 'Raison inconnue'}`);
          }
        })
        .withFailureHandler(function(error: Error) {
          setIsSubmitting(false);
          toast.error(`Une erreur est survenue: ${error.message}`);
        })
        .saveSimpleRequest(values);
    } else {
      // Simulation pour le développement local
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Demande créée avec succès (simulation). Un email aurait été envoyé.");
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
            Nouvelle Demande DIN
          </h1>
          <p className="text-center text-gray-300 mb-6">
            Remplissez le formulaire ci-dessous pour soumettre une nouvelle demande
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
                        placeholder="Nom du demandeur" 
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
                          <SelectValue placeholder="Sélectionnez un portfolio" />
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
                        placeholder="Point focal DIN" 
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
                  {isSubmitting ? "Soumission en cours..." : "Soumettre la demande"}
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
