
document.addEventListener('DOMContentLoaded', function() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Root element not found!');
    return;
  }

  // Set dark mode by default
  document.documentElement.classList.add('dark');

  rootElement.innerHTML = `
    <div class="min-h-screen bg-[#1A1F2C] text-white">
      <div class="max-w-5xl mx-auto p-6">
        <div class="bg-[#2A2F3C] rounded-lg shadow-xl p-8 mb-8">
          <h1 class="text-3xl font-semibold text-center mb-8 bg-gradient-to-r from-[#9b87f5] to-[#847ad1] bg-clip-text text-transparent">
            Portfolio Management Dashboard
          </h1>
          
          <!-- Placeholder content for preview -->
          <div class="space-y-6 text-[#8E9196]">
            <div class="bg-[#1A1F2C] rounded-lg p-6 border border-[#2A2F3C]">
              <h2 class="text-xl font-medium text-white mb-4">Preview Mode</h2>
              <p class="mb-2">Cette application est conçue pour s'exécuter dans Google Apps Script.</p>
              <p class="mb-2">La version complète affichera 4 sections d'accordéon avec des champs de formulaire.</p>
              <p>Déployez les fichiers Code.gs et Index.html dans votre projet Google Apps Script pour voir l'application complète.</p>
            </div>
          </div>

          <!-- Publish Button -->
          <div class="mt-12 text-center">
            <button 
              class="px-8 py-4 bg-[#9b87f5] hover:bg-[#8b77e5] text-white font-medium rounded-lg transition-colors duration-200 transform hover:scale-105"
              onclick="console.log('Publish clicked')"
            >
              Publier
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  console.log('GAS Portfolio Management Dashboard preview loaded');
});
