
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
        <div class="bg-[#2A2F3C] rounded-lg shadow-xl p-8 mb-8 transition-all duration-300 hover:shadow-2xl">
          <h1 class="text-3xl font-semibold text-center mb-8 bg-gradient-to-r from-[#9b87f5] to-[#847ad1] bg-clip-text text-transparent">
            Portfolio Management Dashboard
          </h1>
          
          <!-- Preview content that simulates the GAS application -->
          <div class="space-y-6">
            <!-- Section 1 -->
            <div class="border border-[#3A3F4C] rounded-lg overflow-hidden">
              <div class="bg-gradient-to-r from-[#2A2F3C] to-[#252A36] p-4 flex justify-between items-center cursor-pointer hover:bg-[#252A36]/50 transition-colors">
                <h2 class="text-xl font-medium text-white">Initiative Description</h2>
                <div class="text-[#9b87f5]">▼</div>
              </div>
              <div class="bg-[#1A1F2C] p-6 border-t border-[#3A3F4C]">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="block text-sm text-[#8E9196]">Requestor/Customer</label>
                    <input type="text" class="w-full bg-[#252A36] border border-[#3A3F4C] rounded-md p-2 text-white placeholder-[#8E9196]/50 focus:border-[#9b87f5] transition-colors" disabled placeholder="John Doe" />
                  </div>
                  <div class="space-y-2">
                    <label class="block text-sm text-[#8E9196]">DIN Portfolio</label>
                    <select class="w-full bg-[#252A36] border border-[#3A3F4C] rounded-md p-2 text-white focus:border-[#9b87f5] transition-colors" disabled>
                      <option>Digital workspace</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Section 2 -->
            <div class="border border-[#3A3F4C] rounded-lg overflow-hidden">
              <div class="bg-gradient-to-r from-[#2A2F3C] to-[#252A36] p-4 flex justify-between items-center cursor-pointer hover:bg-[#252A36]/50 transition-colors">
                <h2 class="text-xl font-medium text-white">Portfolio Management Decision</h2>
                <div class="text-[#9b87f5]">▲</div>
              </div>
              <div class="bg-[#1A1F2C] p-6 border-t border-[#3A3F4C] hidden">
                <!-- Future form content -->
              </div>
            </div>
            
            <!-- Section 3 -->
            <div class="border border-[#3A3F4C] rounded-lg overflow-hidden">
              <div class="bg-gradient-to-r from-[#2A2F3C] to-[#252A36] p-4 flex justify-between items-center cursor-pointer hover:bg-[#252A36]/50 transition-colors">
                <h2 class="text-xl font-medium text-white">Financial Assessment</h2>
                <div class="text-[#9b87f5]">▲</div>
              </div>
              <div class="bg-[#1A1F2C] p-6 border-t border-[#3A3F4C] hidden">
                <!-- Future form content -->
              </div>
            </div>
            
            <!-- Section 4 -->
            <div class="border border-[#3A3F4C] rounded-lg overflow-hidden">
              <div class="bg-gradient-to-r from-[#2A2F3C] to-[#252A36] p-4 flex justify-between items-center cursor-pointer hover:bg-[#252A36]/50 transition-colors">
                <h2 class="text-xl font-medium text-white">Risk / Issue / Status</h2>
                <div class="text-[#9b87f5]">▲</div>
              </div>
              <div class="bg-[#1A1F2C] p-6 border-t border-[#3A3F4C] hidden">
                <!-- Future form content -->
              </div>
            </div>
          </div>

          <!-- Explanation message -->
          <div class="mt-8 p-4 bg-[#1A1F2C] rounded-lg border border-[#3A3F4C] text-[#8E9196] text-sm">
            <p class="mb-2">Cette visualisation est une simulation de l'application complète qui s'exécute dans Google Apps Script.</p>
            <p>Pour déployer l'application réelle, utilisez les fichiers <span class="text-[#9b87f5]">Code.gs</span> et <span class="text-[#9b87f5]">Index.html</span> dans votre projet Google Apps Script.</p>
          </div>

          <!-- Publish Button -->
          <div class="mt-8 text-center">
            <button 
              class="px-8 py-4 bg-[#9b87f5] hover:bg-[#847ad1] text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg shadow-[#9b87f5]/20"
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
