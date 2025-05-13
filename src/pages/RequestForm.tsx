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
    console.log("RequestForm - Chargement des options du portfolio");
    // @ts-ignore - La fonction window.google n'est pas reconnue par TypeScript
    if (typeof window.google !== 'undefined') {
      console.log("Mode Google Apps Script détecté - appel à getDropdownOptions");
      // @ts-ignore
      google.script.run
        .withSuccessHandler(function(options: { dinPortfolio: string[] }) {
          console.log("Options reçues du serveur:", options);
          setPortfolioOptions(options.dinPortfolio || []);
        })
        .withFailureHandler(function(error: Error) {
          console.error("Erreur lors de la récupération des options:", error);
          toast.error("Erreur de chargement des options");
        })
        .getDropdownOptions();
    } else {
      console.log("Mode développement local - utilisation des options de secours");
      // Options de secours pour le développement local
      setPortfolioOptions([
        "Digital workspace", "Cyber security", "Roof", "Div", "Affiliate", 
        "DI-infrastructure", "LAN", "SECURITY", "Wireless & industry"
      ]);
    }
  }, []);
  
  const onSubmit = (values: FormValues) => {
    console.log("Soumission du formulaire avec les valeurs:", values);
    setIsSubmitting(true);
    
    // @ts-ignore - La fonction window.google n'est pas reconnue par TypeScript
    if (typeof window.google !== 'undefined') {
      console.log("Appel à saveSimpleRequest avec les données:", values);
      // @ts-ignore
      google.script.run
        .withSuccessHandler(function(result: { 
          success: boolean, 
          id?: number, 
          fileWriteSuccess: boolean, 
          emailSentSuccess: boolean,
          error?: string 
        }) {
          console.log("Réponse du serveur:", result);
          setIsSubmitting(false);
          if (result.success) {
            toast.success(`La demande portant l'ID ${result.id} est créée`);
            console.log("Demande créée avec succès - ID:", result.id);
            form.reset();
          } else if (result.fileWriteSuccess && !result.emailSentSuccess) {
            toast.warning(`La demande portant l'ID ${result.id} est créée, mais une erreur s'est produite lors de l'envoi de l'email`);
            console.warn("Demande créée mais email non envoyé - ID:", result.id);
            form.reset();
          } else if (!result.fileWriteSuccess) {
            console.error("Erreur d'écriture sur le fichier:", result.error);
            toast.error(`Une erreur s'est produite lors de l'écriture sur le fichier: ${result.error || 'Raison inconnue'}`);
          } else {
            console.error("Erreur générale:", result.error);
            toast.error(`Une erreur s'est produite: ${result.error || 'Raison inconnue'}`);
          }
        })
        .withFailureHandler(function(error: Error) {
          console.error("Erreur lors de l'appel à saveSimpleRequest:", error);
          setIsSubmitting(false);
          toast.error(`Une erreur s'est produite: ${error.message}`);
        })
        .saveSimpleRequest(values);
    } else {
      // Simulation pour le développement local
      console.log("Mode développement local - simulation de la soumission");
      setTimeout(() => {
        setIsSubmitting(false);
        const mockId = Math.floor(Math.random() * 100) + 1;
        console.log("Simulation - ID généré:", mockId);
        toast.success(`La demande portant l'ID ${mockId} est créée (simulation)`);
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
