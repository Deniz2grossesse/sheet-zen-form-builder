
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
import { Eye } from "lucide-react";

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
  
  useEffect(() => {
    document.documentElement.classList.add('dark');
    
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
    <div className="min-h-screen bg-[#4D2E19] text-white relative">
      <div className="container max-w-3xl mx-auto p-6">
        <div className="mb-8 pt-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#FF5500]">
              Nouvelle Demande DIN
            </h1>
            <p className="text-[#AAAAAA] text-sm">
              Remplissez le formulaire ci-dessous pour soumettre une nouvelle demande
            </p>
          </div>
          <Button 
            className="bg-[#222222] hover:bg-[#333333] text-white"
            onClick={() => navigate('/data-view')}
          >
            <Eye className="mr-2 h-4 w-4" />
            Visualiser
          </Button>
        </div>
        
        <div className="bg-[#222222] p-6 rounded-xl shadow-lg border border-[#444444]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="requestor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Requestor / Customer</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nom du demandeur" 
                        {...field} 
                        className="bg-[#333333] border-[#444444] text-white focus:border-[#FF5500] focus:ring-[#FF5500]"
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
                    <FormLabel className="text-white">DIN Portfolio</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-[#333333] border-[#444444] text-white focus:border-[#FF5500] focus:ring-[#FF5500]">
                          <SelectValue placeholder="Sélectionnez un portfolio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#222222] border-[#444444]">
                        {portfolioOptions.map((option) => (
                          <SelectItem key={option} value={option} className="text-white hover:bg-[#333333]">
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
                    <FormLabel className="text-white">DIN Focal Point</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Point focal DIN" 
                        {...field} 
                        className="bg-[#333333] border-[#444444] text-white focus:border-[#FF5500] focus:ring-[#FF5500]"
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
                  className="bg-[#FF5500] hover:bg-[#FF7700] text-white"
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
