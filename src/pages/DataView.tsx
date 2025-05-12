
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
    <div className="min-h-screen bg-[#4D2E19] text-white">
      <div className="container max-w-7xl mx-auto p-6">
        <div className="mb-8 pt-8 flex items-center">
          <Button 
            className="mr-4 bg-[#222222] hover:bg-[#333333] text-white"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-[#FF5500]">
              Visualisation des données
            </h1>
            <p className="text-[#AAAAAA] text-sm">
              Initiatives et portefeuilles enregistrés
            </p>
          </div>
        </div>

        <Card className="bg-[#222222] border border-[#444444] rounded-xl shadow-lg overflow-hidden">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="relative w-16 h-16">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-[#333333] rounded-full animate-spin" />
                  <div className="absolute top-0 left-0 w-full h-full border-t-4 border-[#FF5500] rounded-full animate-spin" />
                </div>
              </div>
            ) : data.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#1A1A1A] border-b border-[#444444]">
                      {getTableHeaders().map((header, index) => (
                        <th 
                          key={index}
                          className="px-6 py-4 text-left text-[#FF5500] font-medium tracking-wider"
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
                        className={`hover:bg-[#2A2A2A] transition-colors ${rowIndex % 2 === 0 ? 'bg-[#222222]' : 'bg-[#1A1A1A]'}`}
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
                <p className="text-lg text-[#AAAAAA] mb-4">Aucune donnée disponible</p>
                <Button 
                  className="bg-[#FF5500] hover:bg-[#FF7700] text-white"
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
