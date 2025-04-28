
/**
 * Portfolio Management Dashboard
 * Application backend pour Google Apps Script
 * Design modernisé avec dégradés orange et turquoise
 */

// ID du fichier Google Sheets
const SPREADSHEET_ID = '10QxgzOtwTq3zAcuV8YQxtIJd7dzwAgvADq1QaiFp30E';

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
    // Accès au fichier Google Sheets spécifié par l'ID
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = spreadsheet.getActiveSheet();
    
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
      data.initiativeName || "",
      data.initiativeDeliverables || "",
      data.year || "",
      data.sourceDemand || "",
      data.ppmId || "",
      data.category || "",
      data.workloadPsl || "",
      data.transversal || "",
      data.status || "",
      data.teamMember || "",
      data.goNoGo || "",
      data.prioDin || "",
      data.dinLead || "",
      data.budgetEstimated || "",
      data.budgetValidated || "",
      data.cpn || "",
      data.impactRcDin || "",
      data.statusFinal || "",
      data.dinsNeeded || "",
      data.dinsComment || "",
      data.dinsLink || ""
    ];
    
    // Écriture des données
    var range = sheet.getRange(lastRow + 1, 1, 1, rowData.length);
    range.setValues([rowData]);
    
    // Journal de succès
    Logger.log("Données sauvegardées avec succès pour l'ID " + newId);
    
    return true;
  } catch (error) {
    Logger.log("Erreur lors de la sauvegarde des données: " + error.toString());
    return false;
  }
}

/**
 * Fonction de test pour vérifier que l'application fonctionne
 * @return {String} Message indiquant si la connexion est réussie
 */
function testConnection() {
  try {
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    return "Connection successful to spreadsheet: " + spreadsheet.getName();
  } catch (error) {
    return "Connection error: " + error.toString();
  }
}

/**
 * Obtenir toutes les données pour l'affichage dans un tableau
 * @return {Array} Tableau de toutes les entrées
 */
function getAllData() {
  try {
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = spreadsheet.getActiveSheet();
    var data = sheet.getDataRange().getValues();
    
    // Supprimer l'en-tête
    data.shift();
    
    return data;
  } catch (error) {
    Logger.log("Erreur lors de la récupération des données: " + error.toString());
    return [];
  }
}
