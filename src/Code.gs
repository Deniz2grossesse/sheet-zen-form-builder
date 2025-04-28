
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
    
    // Préparation des données à insérer (une ligne par formulaire)
    var rowData = [
      // Section 1: Initiative Description
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
      
      // Section 2: Portfolio Management Decision
      data.goNoGo || "",
      data.prioDin || "",
      data.dinLead || "",
      
      // Section 3: Financial Assessment
      data.budgetEstimated || "",
      data.budgetValidated || "",
      data.cpn || "",
      data.impactRcDin || "",
      
      // Section 4: Risk / Issue / Status
      data.statusFinal || "",
      data.dinsNeeded || "",
      data.dinsComment || "",
      data.dinsLink || ""
    ];
    
    // Ajouter une nouvelle ligne à la fin de la feuille
    sheet.appendRow(rowData);
    
    return true;
  } catch (error) {
    Logger.log("Erreur lors de la sauvegarde des données: " + error.toString());
    return false;
  }
}
