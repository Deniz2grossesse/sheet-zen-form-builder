
import { useEffect, useState } from 'react';
import { FormModal } from "@/components/FormModal";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  
  const { toast } = useToast();
  const [isHoveringSave, setIsHoveringSave] = useState(false);

  const sections = [
    {
      title: "Initiative Description",
      fields: [
        { id: "requestor", label: "Requestor/Customer", type: "text" },
        {
          id: "dinPortfolio",
          label: "DIN portfolio",
          type: "select",
          options: ["Digital workspace", "Cyber security", "Roof", "Div", "Affiliate", "DI-infrastructure", "LAN", "SECURITY", "Wireless & industry", "Infra & deploy", "WAN", "Asiapac", "North america", "GE", "UK", "SP", "FR"]
        },
        { id: "dinFocalPoint", label: "DIN focal point", type: "text" },
        { id: "initiativeName", label: "Initiative name", type: "text" },
        { id: "initiativeDeliverables", label: "Initiative deliverables", type: "text" },
        { id: "year", label: "Year", type: "text" },
        { id: "sourceDemand", label: "Source of demand", type: "text" },
        { id: "ppmId", label: "PPM ID", type: "text" },
        {
          id: "category",
          label: "Category",
          type: "select",
          options: [
            "Design", "Expertise", "Solution deployment", "Site extension",
            "New solution", "Cabling deployment", "Evolution", "Mobility deployment"
          ]
        },
        { id: "workloadPsl", label: "Workload per PSL", type: "text" },
        {
          id: "transversal",
          label: "Transversal",
          type: "select",
          options: ["Yes", "No"]
        },
        {
          id: "status",
          label: "Status",
          type: "select",
          options: [
            "Not started", "In qualification", "In progress",
            "Completed", "Cancelled", "Postponed"
          ]
        },
        { id: "teamMember", label: "Team member", type: "text" }
      ]
    },
    {
      title: "Portfolio Management Decision",
      fields: [
        {
          id: "goNoGo",
          label: "GO/NO-GO",
          type: "select",
          options: ["Waiting", "Go pending budget", "GO", "No GO", "Canceled"]
        },
        { id: "prioDin", label: "Prio DIN", type: "text" },
        { id: "dinLead", label: "DIN Lead", type: "text" }
      ]
    },
    {
      title: "Financial Assessment",
      fields: [
        { id: "budgetEstimated", label: "Budget Estimated", type: "text" },
        { id: "budgetValidated", label: "Budget Validated K€", type: "text" },
        { id: "cpn", label: "CPN", type: "text" },
        { id: "impactRcDin", label: "Impact RC DIN", type: "text" }
      ]
    },
    {
      title: "Risk / Issue / Status",
      fields: [
        { id: "statusFinal", label: "Status", type: "text" },
        { id: "dinsNeeded", label: "DINS needed", type: "text" },
        { id: "dinsComment", label: "DINS comment", type: "text" },
        { id: "dinsLink", label: "DINS link to the project", type: "text" }
      ]
    }
  ];

  const handleSaveAll = () => {
    toast({
      title: "Données sauvegardées",
      description: "Toutes les informations ont été enregistrées avec succès.",
      variant: "default",
    });
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
              radial-gradient(circle at 80% 80%, #FF6B00 0%, transparent 40%)
            `,
            opacity: 0.1
          }}
        />
        <div className="absolute -top-[50%] -left-[10%] w-[100%] h-[150%] bg-[#FF4B00]/10 blur-[120px] transform rotate-12" />
        <div className="absolute -bottom-[50%] -right-[10%] w-[100%] h-[150%] bg-[#FF6B00]/10 blur-[120px] transform -rotate-12" />
        
        {/* Floating hearts */}
        <div className="absolute top-[10%] left-[5%]">
          <Heart size={30} className="text-[#FF4B00]/20 animate-float-slow" fill="#FF4B00" />
        </div>
        <div className="absolute top-[30%] right-[15%]">
          <Heart size={20} className="text-[#FF4B00]/20 animate-float-medium" fill="#FF4B00" />
        </div>
        <div className="absolute bottom-[20%] left-[25%]">
          <Heart size={25} className="text-[#FF4B00]/20 animate-float-fast" fill="#FF4B00" />
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="mb-12 pt-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-white hover:bg-gradient-to-r hover:from-[#FF4B00] hover:via-[#FF8E00] hover:to-[#FF6B00] hover:bg-clip-text hover:text-transparent transition-all duration-200 flex items-center justify-center gap-2">
            <Heart size={32} className="text-[#FF4B00]" fill="#FF4B00" />
            Portfolio Management Dashboard
          </h1>
          <p className="text-white hover:text-[#FF6B00] transition-colors duration-200 text-center">Gestion des initiatives et des portefeuilles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {sections.map((section, index) => (
            <FormModal 
              key={index}
              title={section.title}
              fields={section.fields}
            />
          ))}
        </div>
        
        {/* Bouton Sauvegarder */}
        <div className="mt-12 flex justify-center">
          <Button
            onClick={handleSaveAll}
            className="relative px-10 py-6 bg-gradient-to-r from-[#FF4B00] to-[#FF6B00] hover:from-[#FF6B00] hover:to-[#FF4B00] rounded-2xl text-white font-bold text-lg shadow-lg shadow-[#FF4B00]/20 hover:shadow-xl hover:shadow-[#FF4B00]/30 hover:scale-105 transition-all duration-300 overflow-hidden group"
            onMouseEnter={() => setIsHoveringSave(true)}
            onMouseLeave={() => setIsHoveringSave(false)}
          >
            <span className="relative z-10 flex items-center gap-2">
              Sauvegarder
              <Heart 
                size={20} 
                className={`${isHoveringSave ? 'animate-heartbeat' : ''} text-white`}
                fill="white"
              />
            </span>
            
            {isHoveringSave && (
              <>
                <div className="absolute -top-4 -left-4 opacity-30">
                  <Heart size={40} className="text-white animate-float-fast" fill="white" />
                </div>
                <div className="absolute top-1/2 left-3/4 opacity-30">
                  <Heart size={30} className="text-white animate-float-medium" fill="white" />
                </div>
                <div className="absolute -bottom-2 -right-2 opacity-30">
                  <Heart size={25} className="text-white animate-float-slow" fill="white" />
                </div>
              </>
            )}
            
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
