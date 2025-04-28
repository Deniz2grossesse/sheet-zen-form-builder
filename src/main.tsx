
// This file now acts as a bridge between the GAS application and the frontend
// It will load the HTML content from Index.html instead of rendering the React app

document.addEventListener('DOMContentLoaded', function() {
  // Fetch the HTML content from Index.html and inject it into the root element
  fetch('/src/Index.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('root').innerHTML = html;
      
      // Execute any scripts in the HTML content
      const scripts = document.getElementById('root').querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
      });
    })
    .catch(error => {
      console.error('Error loading GAS HTML content:', error);
      document.getElementById('root').innerHTML = 
        '<div style="text-align: center; padding: 2rem;">' +
        '<h2>Error Loading Portfolio Management Dashboard</h2>' +
        '<p>Please ensure you are viewing this in Google Apps Script environment.</p>' +
        '</div>';
    });
});
