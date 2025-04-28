
import { useEffect } from 'react';
import { FormModal } from "@/components/FormModal";
import { Heart } from "lucide-react";

const Index = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

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
    // Handle save functionality
    console.log("Saving all data...");
    // Show success notification
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white relative overflow-hidden">
      {/* Background Design */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, #FF4B00 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, #00E0FF 0%, transparent 50%)
            `,
            opacity: 0.1
          }}
        />
        <div className="absolute -top-[50%] -left-[10%] w-[100%] h-[150%] bg-[#FF4B00]/10 blur-[120px] transform rotate-12" />
        <div className="absolute -bottom-[50%] -right-[10%] w-[100%] h-[150%] bg-[#00E0FF]/10 blur-[120px] transform -rotate-12" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="mb-12 pt-8">
          <h1 className="text-4xl font-bold text-center mb-2 flex items-center justify-center gap-3 text-white hover:bg-gradient-to-r hover:from-[#FF4B00] hover:via-[#FF8E00] hover:to-[#00E0FF] hover:bg-clip-text hover:text-transparent transition-all duration-200">
            <Heart className="text-[#FF4B00] h-8 w-8" />
            Portfolio Management Dashboard
            <Heart className="text-[#FF4B00] h-8 w-8" />
          </h1>
          <p className="text-white hover:text-[#00E0FF] transition-colors duration-200 text-center">Gestion des initiatives et des portefeuilles</p>
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

        {/* Save Button */}
        <div className="mt-12 max-w-xs mx-auto">
          <button 
            onClick={handleSaveAll}
            className="w-full relative overflow-hidden group flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF4B00] to-[#00E0FF] text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-[#FF4B00]/20 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
          >
            <Heart className="w-6 h-6 group-hover:scale-125 transition-all duration-300 group-hover:animate-pulse" />
            <span className="text-xl">Sauvegarder</span>
            <Heart className="w-6 h-6 group-hover:scale-125 transition-all duration-300 group-hover:animate-pulse" />
            
            {/* Heart animations on hover */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100">
              <Heart className="absolute animate-ping text-white/20 w-4 h-4" style={{ top: '20%', left: '30%', animationDuration: '2s' }} />
              <Heart className="absolute animate-ping text-white/20 w-5 h-5" style={{ bottom: '30%', right: '20%', animationDuration: '2.5s' }} />
              <Heart className="absolute animate-ping text-white/20 w-3 h-3" style={{ top: '40%', right: '30%', animationDuration: '1.8s' }} />
              <Heart className="absolute animate-ping text-white/20 w-4 h-4" style={{ bottom: '20%', left: '30%', animationDuration: '2.2s' }} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
