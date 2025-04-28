
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Force dark mode on component mount
    document.documentElement.classList.add('dark');
    console.log('GAS Portfolio Management Dashboard component loaded');
  }, []);

  return (
    <div id="gas-content" className="min-h-screen bg-[#1A1F2C]">
      {/* The content placeholder is now managed by main.tsx */}
    </div>
  );
};

export default Index;
