
import { useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const Index = () => {
  useEffect(() => {
    // Force dark mode on component mount
    document.documentElement.classList.add('dark');
  }, []);

  const sections = [
    {
      title: "Initiative Description",
      fields: [
        { id: "requestor", label: "Requestor/Customer" },
        { id: "dinPortfolio", label: "DIN portfolio" },
        { id: "dinFocalPoint", label: "DIN focal point" }
      ]
    },
    {
      title: "Portfolio Management Decision",
      fields: [
        { id: "goNoGo", label: "GO/NO-GO" },
        { id: "prioDin", label: "Prio DIN" },
        { id: "dinLead", label: "DIN Lead" }
      ]
    },
    {
      title: "Financial Assessment",
      fields: [
        { id: "budgetEstimated", label: "Budget Estimated" },
        { id: "budgetValidated", label: "Budget Validated" },
        { id: "cpn", label: "CPN" }
      ]
    },
    {
      title: "Risk / Issue / Status",
      fields: [
        { id: "statusFinal", label: "Status" },
        { id: "dinsNeeded", label: "DINS needed" },
        { id: "dinsComment", label: "DINS comment" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-[#2A2F3C] rounded-lg shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-semibold text-center mb-8 bg-gradient-to-r from-[#9b87f5] to-[#847ad1] bg-clip-text text-transparent">
            Portfolio Management Dashboard
          </h1>
          
          <Accordion type="single" collapsible className="space-y-4">
            {sections.map((section, index) => (
              <AccordionItem
                key={index}
                value={`section-${index}`}
                className="border border-[#3A3F4C] rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="bg-gradient-to-r from-[#2A2F3C] to-[#252A36] p-4 hover:no-underline hover:bg-[#252A36]/50">
                  <span className="text-xl font-medium text-white">{section.title}</span>
                </AccordionTrigger>
                <AccordionContent className="bg-[#1A1F2C] p-6 border-t border-[#3A3F4C]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="space-y-2">
                        <label className="block text-sm text-[#8E9196]">{field.label}</label>
                        <input
                          type="text"
                          className="w-full bg-[#252A36] border border-[#3A3F4C] rounded-md p-2 text-white placeholder-[#8E9196]/50 focus:border-[#9b87f5] transition-colors"
                          disabled
                          placeholder="Enter value..."
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 p-4 bg-[#1A1F2C] rounded-lg border border-[#3A3F4C] text-[#8E9196] text-sm">
            <p className="mb-2">Cette visualisation est une simulation de l'application complète qui s'exécute dans Google Apps Script.</p>
            <p>Pour déployer l'application réelle, utilisez les fichiers <span className="text-[#9b87f5]">Code.gs</span> et <span className="text-[#9b87f5]">Index.html</span> dans votre projet Google Apps Script.</p>
          </div>

          <div className="mt-8 text-center">
            <Button 
              className="px-8 py-4 bg-[#9b87f5] hover:bg-[#847ad1] text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg shadow-[#9b87f5]/20"
              onClick={() => console.log('Publish clicked')}
            >
              Publier
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
