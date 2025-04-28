
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // This component is a placeholder - the actual content is loaded directly from Index.html
    console.log('GAS Portfolio Management Dashboard is loading...');
  }, []);

  return (
    <div id="gas-content">
      {/* The GAS HTML content will be injected here by main.tsx */}
      <div style={{textAlign: 'center', padding: '2rem'}}>
        <h2>Portfolio Management Dashboard</h2>
        <p>Loading content...</p>
      </div>
    </div>
  );
};

export default Index;
