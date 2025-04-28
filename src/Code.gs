
/**
 * Portfolio Management Dashboard
 * Application backend for Google Apps Script
 */

// Fonction exécutée à l'ouverture de l'application web
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Portfolio Management Dashboard')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Fonction pour obtenir les données des menus déroulants
 * @return {Object} Objet contenant toutes les options des menus déroulants
 */
function getDropdownOptions() {
  return {
    dinPortfolio: [
      "Digital workspace", "Cyber security", "Roof", "Div", "Affiliate", 
      "DI-infrastructure", "LAN", "SECURITY", "Wireless & industry", 
      "Infra & deploy", "WAN", "Asiapac", "North america", "GE", "UK", "SP", "FR"
    ],
    goNoGo: [
      "Waiting", "Go pending budget", "GO", "No GO", "Canceled"
    ]
  };
}

/**
 * Sauvegarde les données dans Google Sheets
 * @param {Object} data - Données à sauvegarder
 * @return {Boolean} - True si sauvegarde réussie, False sinon
 */
function saveData(data) {
  try {
    // Accès au fichier Google Sheets actif
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Trouver la dernière ligne avec des données dans la colonne A
    var lastRow = Math.max(
      2,
      sheet.getRange("A3:A").getValues().filter(String).length + 2
    );
    
    // Calculer le nouvel ID
    var newId = 1;
    if (lastRow > 2) {
      var lastId = sheet.getRange(lastRow, 1).getValue();
      newId = lastId + 1;
    }
    
    // Préparation des données à insérer
    var rowData = [
      newId,
      data.requestor || "",
      data.dinPortfolio || "",
      data.dinFocalPoint || "",
      data.goNoGo || "",
      data.prioDin || "",
      data.dinLead || "",
      data.budgetEstimated || "",
      data.budgetValidated || "",
      data.cpn || "",
      data.statusFinal || "",
      data.dinsNeeded || "",
      data.dinsComment || ""
    ];
    
    // Écriture des données
    var range = sheet.getRange(lastRow + 1, 1, 1, rowData.length);
    range.setValues([rowData]);
    
    return true;
  } catch (error) {
    Logger.log("Erreur lors de la sauvegarde des données: " + error.toString());
    return false;
  }
}

// Fonction de test pour vérifier que l'application fonctionne
function testConnection() {
  return "Connection successful!";
}
