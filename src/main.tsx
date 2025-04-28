
// This file now serves as a bridge between the Google Apps Script application and the preview
// Instead of trying to fetch Index.html, we'll display the content directly

document.addEventListener('DOMContentLoaded', function() {
  // Get the root element where content will be displayed
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Root element not found!');
    return;
  }

  // In GAS environment, the HTML is rendered by doGet() function
  // For preview purposes, we'll display a placeholder with the form structure
  rootElement.innerHTML = `
    <div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
      <div class="header" style="text-align: center; padding: 20px 0; background-color: #d3d3d3; margin-bottom: 30px;">
        <h1 style="color: #333; font-size: 24px; font-weight: 500;">Portfolio Management Dashboard</h1>
      </div>
      
      <!-- Accordion sections will be rendered here when deployed in GAS -->
      <div style="margin: 20px 0; text-align: center;">
        <p>Preview mode - This application is designed to run in Google Apps Script.</p>
        <p>The full version will display 4 accordion sections with form fields.</p>
        <p>Deploy the Code.gs and Index.html files to your Google Apps Script project to see the complete application.</p>
      </div>
    </div>
  `;

  // In production GAS environment, the actual content from Index.html is rendered
  console.log('GAS Portfolio Management Dashboard preview loaded');
});
