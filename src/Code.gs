
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
    category: [
      "Design", "Expertise", "Solution deployment", "Site extension", 
      "New solution", "Cabling deployment", "Evolution", "Mobility deployment"
    ],
    transversal: ["Yes", "No"],
    status: [
      "Not started", "In qualification", "In progress", 
      "Completed", "Cancelled", "Postponed"
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
    
    // Trouver la dernière ligne avec des données dans la colonne A (à partir de la ligne 3)
    var lastRow = Math.max(
      2,
      sheet.getRange("A3:A").getValues().filter(String).length + 2
    );
    
    // Calculer le nouvel ID (dernière valeur + 1)
    var newId = 1;
    if (lastRow > 2) {
      var lastId = sheet.getRange(lastRow, 1).getValue();
      newId = lastId + 1;
    }
    
    // Préparation des données à insérer (une ligne par formulaire)
    var rowData = [
      newId, // ID en colonne A
      // Section 1: Initiative Description (colonnes B à N)
      data.requestor || "",
      data.dinPortfolio || "",
      data.dinFocalPoint || "",
      data.initiativeName || "",
      data.initiativeDeliverables || "",
      data.year || "",
      data.sourceOfDemand || "",
      data.ppmId || "",
      data.category || "",
      data.workloadPerPsl || "",
      data.transversal || "",
      data.status || "",
      data.teamMember || "",
      
      // Section 2: Portfolio Management Decision (colonnes O à Q)
      data.goNoGo || "",
      data.prioDin || "",
      data.dinLead || "",
      
      // Section 3: Financial Assessment (colonnes R à U)
      data.budgetEstimated || "",
      data.budgetValidated || "",
      data.cpn || "",
      data.impactRcDin || "",
      
      // Section 4: Risk / Issue / Status (colonnes V à Y)
      data.statusFinal || "",
      data.dinsNeeded || "",
      data.dinsComment || "",
      data.dinsLink || ""
    ];
    
    // Écrire les données à partir de la nouvelle ligne (lastRow + 1) et de la colonne A
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
