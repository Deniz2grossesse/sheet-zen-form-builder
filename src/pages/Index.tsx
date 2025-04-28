import { useEffect } from 'react';
import { FormModal } from "@/components/FormModal";

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

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[150%] bg-[#FF7E00]/20 blur-[120px] transform rotate-12" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[150%] bg-[#00B7D3]/20 blur-[120px] transform -rotate-12" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="mb-12 pt-8">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-[#FF7E00] via-[#FFA500] to-[#00B7D3] bg-clip-text text-transparent">
            Portfolio Management Dashboard
          </h1>
          <p className="text-[#8E9196] text-center">Gestion des initiatives et des portefeuilles</p>
        </div>

        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {sections.map((section, index) => (
            <FormModal 
              key={index}
              title={section.title}
              fields={section.fields}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
