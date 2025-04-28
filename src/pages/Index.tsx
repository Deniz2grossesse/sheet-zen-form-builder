
import { useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
          options: [
            "Digital workspace", "Cyber security", "Roof", "Div", "Affiliate", 
            "DI-infrastructure", "LAN", "SECURITY", "Wireless & industry", 
            "Infra & deploy", "WAN", "Asiapac", "North america", "GE", "UK", "SP", "FR"
          ]
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
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <div 
        className="relative min-h-screen"
        style={{
          background: `linear-gradient(135deg, 
            rgba(26,26,26,1) 0%, 
            rgba(26,26,26,0.9) 30%,
            rgba(255,126,0,0.1) 60%,
            rgba(0,183,211,0.1) 100%
          )`
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-screen bg-[#FF7E00] opacity-10 transform -skew-x-12" />
          <div className="absolute top-0 right-1/4 w-1/3 h-screen bg-[#00B7D3] opacity-10 transform -skew-x-12" />
        </div>

        <div className="relative max-w-5xl mx-auto p-6">
          <div className="mb-12 pt-8">
            <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-[#FF7E00] via-[#FFA500] to-[#00B7D3] bg-clip-text text-transparent">
              Portfolio Management Dashboard
            </h1>
            <p className="text-[#8E9196] text-center">Gestion des initiatives et des portefeuilles</p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-6">
            {sections.map((section, index) => (
              <AccordionItem
                key={index}
                value={`section-${index}`}
                className="border-none bg-[#252525] rounded-xl overflow-hidden shadow-lg transition-all duration-200 hover:shadow-[#FF7E00]/5"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <span className="text-xl font-medium bg-gradient-to-r from-white to-[#8E9196] bg-clip-text text-transparent group-hover:from-[#FF7E00] group-hover:to-[#00B7D3] transition-all duration-300">
                    {section.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="space-y-2">
                        <label className="block text-sm text-[#8E9196] font-medium">
                          {field.label}
                        </label>
                        {field.type === "select" ? (
                          <Select>
                            <SelectTrigger className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg p-3 text-white">
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent className="bg-[#252525] border border-[#333333]">
                              {field.options?.map((option) => (
                                <SelectItem
                                  key={option}
                                  value={option.toLowerCase()}
                                  className="text-white hover:bg-[#333333] focus:bg-[#333333] focus:text-white"
                                >
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <input
                            type="text"
                            className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg p-3 text-white placeholder-[#4A4A4A] 
                                     focus:border-[#FF7E00] focus:ring-1 focus:ring-[#FF7E00] transition-all duration-200
                                     hover:border-[#333333]/80"
                            placeholder="Enter value..."
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button 
                      className="px-6 py-2 bg-gradient-to-r from-[#FF7E00] to-[#00B7D3] hover:from-[#FF7E00]/90 hover:to-[#00B7D3]/90
                               text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105
                               shadow-lg hover:shadow-[#FF7E00]/20"
                    >
                      Valider
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center space-y-8">
            <Button 
              className="px-8 py-6 bg-gradient-to-r from-[#FF7E00] to-[#00B7D3] hover:from-[#FF7E00]/90 hover:to-[#00B7D3]/90
                         text-white text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105
                         shadow-lg hover:shadow-[#FF7E00]/20"
              onClick={() => console.log('Publish clicked')}
            >
              Publier
            </Button>

            <div className="p-6 rounded-xl border border-[#333333] bg-[#252525]/50 backdrop-blur-sm">
              <p className="text-[#8E9196] text-sm leading-relaxed">
                Cette visualisation est une simulation de l'application complète qui s'exécute dans Google Apps Script.
                <br />Pour déployer l'application réelle, utilisez les fichiers <span className="text-[#FF7E00]">Code.gs</span> et <span className="text-[#00B7D3]">Index.html</span> dans votre projet Google Apps Script.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
