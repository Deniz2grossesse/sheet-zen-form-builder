
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface DataItem {
  id: number;
  [key: string]: any;
}

const DataView = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add('dark');
    fetchData();
  }, []);

  const fetchData = () => {
    // Simulation de l'appel à getAllData() dans un environnement React
    // Dans un vrai environnement Google Apps Script, cette fonction appellerait google.script.run.getAllData()
    console.log("Récupération des données...");
    
    // Simule un délai de chargement pour l'exemple
    setTimeout(() => {
      // Données simulées pour le tableau
      const mockData = [
        {
          id: 1,
          requestor: "Client A",
          dinPortfolio: "Digital workspace",
          initiativeName: "Projet A",
          status: "In progress",
          goNoGo: "GO",
          budgetEstimated: "50K€"
        },
        {
          id: 2,
          requestor: "Client B",
          dinPortfolio: "Cyber security",
          initiativeName: "Projet B",
          status: "Completed",
          goNoGo: "GO",
          budgetEstimated: "75K€"
        },
        {
          id: 3,
          requestor: "Client C",
          dinPortfolio: "LAN",
          initiativeName: "Projet C",
          status: "Not started",
          goNoGo: "Waiting",
          budgetEstimated: "30K€"
        }
      ];
      
      setData(mockData);
      setLoading(false);
    }, 1000);
  };

  // Déterminer les colonnes du tableau à partir des données
  const getTableHeaders = () => {
    if (data.length === 0) return [];
    const firstItem = data[0];
    return Object.keys(firstItem);
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
      
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="mb-8 pt-8 flex items-center">
          <Button 
            className="mr-4 bg-gradient-to-r from-[#252525] to-[#333] hover:from-[#333] hover:to-[#444] text-white rounded-xl transition-all duration-300"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-[#FF4B00] hover:text-[#FF8E00] transition-colors duration-300">
              Visualisation des données
            </h1>
            <p className="text-white hover:text-[#FF4B00]/80 transition-colors duration-200">
              Initiatives et portefeuilles enregistrés
            </p>
          </div>
        </div>

        <Card className="bg-[#1A1A1A] border border-[#333] rounded-3xl shadow-lg overflow-hidden">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="relative w-16 h-16">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-[#FF4B00]/20 rounded-full animate-spin" />
                  <div className="absolute top-0 left-0 w-full h-full border-t-4 border-[#FF4B00] rounded-full animate-spin" />
                </div>
              </div>
            ) : data.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#252525] border-b border-[#333]">
                      {getTableHeaders().map((header, index) => (
                        <th 
                          key={index}
                          className="px-6 py-4 text-left text-[#FF4B00] font-medium tracking-wider"
                        >
                          {header === 'id' ? 'ID' : header
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, str => str.toUpperCase())}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, rowIndex) => (
                      <tr 
                        key={rowIndex} 
                        className={`hover:bg-[#252525]/50 transition-colors ${rowIndex % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#222]'}`}
                      >
                        {getTableHeaders().map((header, colIndex) => (
                          <td 
                            key={colIndex}
                            className="px-6 py-4 whitespace-nowrap text-white"
                          >
                            {row[header]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-64 text-center">
                <p className="text-lg text-gray-400 mb-4">Aucune donnée disponible</p>
                <Button 
                  className="bg-[#FF4B00] hover:bg-[#FF6B00] text-white rounded-xl transition-all duration-300"
                  onClick={() => fetchData()}
                >
                  Rafraîchir
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataView;
