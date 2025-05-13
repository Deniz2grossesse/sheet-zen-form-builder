
/**
 * Portfolio Management Dashboard
 * Application backend pour Google Apps Script
 * Design modernisé avec dégradés orange et turquoise
 */

// ID du fichier Google Sheets
const SPREADSHEET_ID = '10QxgzOtwTq3zAcuV8YQxtIJd7dzwAgvADq1QaiFp30E';

// Adresse email de destination pour les notifications
const EMAIL_DESTINATION = "votre_email@exemple.com";

// Adresses email en copie (CC) pour les notifications
const EMAIL_CC = "cc_email@exemple.com, autre_cc@exemple.com";

// Lien vers l'application pour les mises à jour
const UPDATE_LINK = "https://votre-lien-application.com";

// Fonction exécutée à l'ouverture de l'application web
function doGet(e) {
  const page = e.parameter.page;
  if (page === "phase2") {
    return HtmlService.createHtmlOutputFromFile('Phase2')
      .setTitle('Liste de diffusion - Portfolio DIN')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Portfolio Management Dashboard')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Fonction pour obtenir les données des menus déroulants
 * @return {Object} Objet contenant toutes les options des menus déroulants
 */
function getDropdownOptions() {
  Logger.log("Début de la fonction getDropdownOptions()");
  var options = {
    dinPortfolio: [
      "Digital workspace", "Cyber security", "Roof", "Div", "Affiliate", 
      "DI-infrastructure", "LAN", "SECURITY", "Wireless & industry", 
      "Infra & deploy", "WAN", "Asiapac", "North america", "GE", "UK", "SP", "FR"
    ],
    goNoGo: [
      "Waiting", "Go pending budget", "GO", "No GO", "Canceled"
    ],
    category: [
      "design", "expertise", "solution deployment", "site extension",
      "new solution", "cabling deployment", "evolution", "mobility deployment"
    ],
    transversal: ["yes", "no"],
    status: [
      "not started", "in qualification", "in progress", "completed", "cancelled", "postponed"
    ]
  };
  
  Logger.log("Options de menus déroulants générées avec succès: " + JSON.stringify(options));
  return options;
}

/**
 * Sauvegarde les données simplifiées et envoie un email
 * @param {Object} data - Données à sauvegarder (version simplifiée)
 * @return {Object} - Objet détaillé avec les résultats de l'opération
 */
function saveSimpleRequest(data) {
  var result = {
    success: false,
    fileWriteSuccess: false,
    emailSentSuccess: false,
    id: null,
    error: null
  };
  
  try {
    // Accès au fichier Google Sheets spécifié par l'ID
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = spreadsheet.getSheets()[2]; // Changé de [1] à [2]
    
    // Trouver toutes les valeurs de la colonne A à partir de la ligne 4
    var idValues = sheet.getRange("A4:A").getValues();
    
    // Filtrer pour ne garder que les cellules qui contiennent des données
    var nonEmptyIds = idValues.filter(function(row) {
      return row[0] !== "";
    });
    
    // Calculer le nouvel ID
    var newId = 1;
    if (nonEmptyIds.length > 0) {
      // Prendre la dernière valeur d'ID et l'incrémenter
      var lastId = nonEmptyIds[nonEmptyIds.length - 1][0];
      
      // S'assurer que c'est un nombre
      if (typeof lastId === 'number') {
        newId = lastId + 1;
      } else {
        // Si ce n'est pas un nombre, essayer de le convertir
        var parsedId = parseInt(lastId, 10);
        if (!isNaN(parsedId)) {
          newId = parsedId + 1;
        }
      }
    }
    
    // Préparation des données à insérer
    var rowData = [
      newId,
      data.requestor || "",
      data.dinPortfolio || "",
      data.dinFocalPoint || "",
      "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" // Champs vides pour le reste
    ];
    
    // Trouver la prochaine ligne vide pour l'insertion
    var nextRow = nonEmptyIds.length + 4;
    
    // Écriture des données
    var range = sheet.getRange(nextRow, 1, 1, rowData.length);
    range.setValues([rowData]);
    
    // Marquer le succès de l'écriture du fichier
    result.fileWriteSuccess = true;
    result.id = newId;
    Logger.log("Données sauvegardées avec succès pour l'ID " + newId);
    
    // Envoi de l'email de notification
    var emailResult = sendNotificationEmail(newId, data);
    result.emailSentSuccess = emailResult;
    
    // Déterminer le succès global de l'opération
    result.success = result.fileWriteSuccess && result.emailSentSuccess;
    
    return result;
  } catch (error) {
    Logger.log("Erreur lors de la sauvegarde des données: " + error.toString());
    result.error = error.toString();
    return result;
  }
}

/**
 * Envoie un email de notification pour une nouvelle demande
 * @param {Number} id - ID de la demande
 * @param {Object} data - Données de la demande
 * @return {Boolean} - True si envoi réussi, False sinon
 */
function sendNotificationEmail(id, data) {
  try {
    // Construction de l'objet de l'email
    var subject = "NEW request " + id + " created for DIN Portfolio management";
    
    // URL dynamique pour accéder à la phase 2
    var scriptUrl = ScriptApp.getService().getUrl();
    var updateLink = scriptUrl + "?page=phase2&id=" + id;
    
    // Construction du corps de l'email
    var body = "Dear users,\n\n" +
      "A new request is now created as " + id + ". " +
      "You can find below information linked to it.\n\n" +
      "Requestor/customer: " + data.requestor + "\n" +
      "DIN portfolio: " + data.dinPortfolio + "\n" +
      "DIN focal point: " + data.dinFocalPoint + "\n\n" +
      "Please click on this link to show the updates: " + updateLink + "\n\n" +
      "Thanks & Regards.";
    
    // Options pour l'email avec CC
    var options = {
      cc: EMAIL_CC
    };
    
    // Envoi de l'email avec options CC
    GmailApp.sendEmail(EMAIL_DESTINATION, subject, body, options);
    
    Logger.log("Email envoyé avec succès à " + EMAIL_DESTINATION + " avec CC à " + EMAIL_CC);
    return true;
  } catch (error) {
    Logger.log("Erreur lors de l'envoi de l'email: " + error.toString());
    return false;
  }
}

/**
 * Récupère les données d'une demande spécifique par son ID
 * @param {Number|String} id - ID de la demande à récupérer
 * @return {Object} - Objet contenant les données ou une erreur
 */
function getRequestById(id) {
  try {
    Logger.log("Début de la fonction getRequestById() avec ID: " + id + " (type: " + typeof id + ")");
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = spreadsheet.getSheets()[2]; // Feuille n°2
    var data = sheet.getDataRange().getValues();
    
    Logger.log("Données récupérées depuis la feuille: lignes = " + data.length);
    var rowIndex = -1;

    // Convertir l'ID en chaîne pour la comparaison
    var stringId = String(id);
    Logger.log("ID converti en chaîne pour comparaison: " + stringId);

    // Recherche de l'ID dans la colonne A (index 0)
    for (var i = 3; i < data.length; i++) { // Démarrer à la ligne 4 (index 3)
      var sheetId = String(data[i][0]); // Convertir l'ID de la feuille en chaîne
      Logger.log("Comparaison - ID URL: " + stringId + " (type: " + typeof stringId + "), ID ligne " + (i+1) + ": " + sheetId + " (type: " + typeof sheetId + ")");
      
      if (sheetId === stringId) {
        rowIndex = i;
        Logger.log("ID trouvé à la ligne " + (rowIndex + 1));
        break;
      }
    }

    if (rowIndex === -1) {
      Logger.log("ID " + stringId + " non trouvé dans la feuille");
      return { success: false, error: "ID non trouvé" };
    }

    // Récupération des données de la ligne
    var rowData = data[rowIndex];
    Logger.log("Données de la ligne récupérées: " + JSON.stringify(rowData.slice(0, 14)));

    var result = {
      success: true,
      data: {
        id: rowData[0],
        requestor: rowData[1],
        dinPortfolio: rowData[2],
        dinFocalPoint: rowData[3],
        initiativeName: rowData[4],
        initiativeDeliverables: rowData[5],
        year: rowData[6],
        sourceDemand: rowData[7],
        ppmId: rowData[8],
        category: rowData[9],
        workloadPsl: rowData[10],
        transversal: rowData[11],
        status: rowData[12],
        teamMember: rowData[13]
      }
    };

    Logger.log("Données formatées à renvoyer: " + JSON.stringify(result));
    return result;
  } catch (error) {
    Logger.log("Erreur lors de la récupération des données: " + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Met à jour les données d'une demande existante
 * @param {Number|String} id - ID de la demande à mettre à jour
 * @param {Object} data - Nouvelles données pour la demande
 * @return {Object} - Résultat de la mise à jour
 */
function updateRequest(id, data) {
  try {
    Logger.log("Début de la fonction updateRequest() avec ID: " + id + " (type: " + typeof id + ")");
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = spreadsheet.getSheets()[2]; // Changé de [1] à [2]
    
    // Trouver la ligne correspondant à l'ID
    var idValues = sheet.getRange("A4:A").getValues();
    var rowIndex = -1;
    
    // Convertir l'ID en chaîne pour la comparaison
    var stringId = String(id);
    Logger.log("ID converti en chaîne pour comparaison: " + stringId);
    
    for (var i = 0; i < idValues.length; i++) {
      var sheetId = String(idValues[i][0]); // Convertir l'ID de la feuille en chaîne
      Logger.log("Comparaison - ID URL: " + stringId + " (type: " + typeof stringId + "), ID ligne " + (i+4) + ": " + sheetId + " (type: " + typeof sheetId + ")");
      
      if (sheetId === stringId) {
        rowIndex = i + 4; // +4 car on commence à la ligne 4
        Logger.log("ID trouvé à la ligne " + rowIndex);
        break;
      }
    }
    
    if (rowIndex === -1) {
      Logger.log("ID " + stringId + " non trouvé dans la feuille");
      return { success: false, error: "ID non trouvé" };
    }
    
    Logger.log("Mise à jour des données pour l'ID " + stringId + " à la ligne " + rowIndex);
    
    // Mise à jour des colonnes E à N (indices 4 à 13)
    sheet.getRange(rowIndex, 5, 1, 10).setValues([[
      data.initiativeName || "",
      data.initiativeDeliverables || "",
      data.year || "",
      data.sourceDemand || "",
      data.ppmId || "",
      data.category || "",
      data.workloadPsl || "",
      data.transversal || "",
      data.status || "",
      data.teamMember || ""
    ]]);
    
    // Envoi de l'email de confirmation
    var emailResult = sendUpdateEmail(id, data);
    
    return {
      success: true,
      emailSentSuccess: emailResult
    };
  } catch (error) {
    Logger.log("Erreur lors de la mise à jour: " + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Envoie un email de confirmation après mise à jour d'une demande
 * @param {Number} id - ID de la demande mise à jour
 * @param {Object} data - Données mises à jour
 * @return {Boolean} - True si envoi réussi, False sinon
 */
function sendUpdateEmail(id, data) {
  try {
    // Construction de l'objet de l'email
    var subject = "DIN portfolio update request " + id;
    
    // Construction du corps de l'email
    var body = "Dear user, the request " + id + " has been updated. Here are the new details:\n\n" +
      "* Initiative name: " + data.initiativeName + "\n" +
      "* Initiative deliverables: " + data.initiativeDeliverables + "\n" +
      "* Year: " + data.year + "\n" +
      "* Source of demand: " + data.sourceDemand + "\n" +
      "* PPM ID: " + data.ppmId + "\n" +
      "* Category: " + data.category + "\n" +
      "* Workload per PSL: " + data.workloadPsl + "\n" +
      "* Transversal: " + data.transversal + "\n" +
      "* Status: " + data.status + "\n" +
      "* Team member: " + data.teamMember + "\n\n" +
      "Thanks & Regards.";
    
    // Options pour l'email avec CC
    var options = {
      cc: EMAIL_CC
    };
    
    // Envoi de l'email avec options CC
    GmailApp.sendEmail(EMAIL_DESTINATION, subject, body, options);
    
    Logger.log("Email de mise à jour envoyé avec succès à " + EMAIL_DESTINATION + " avec CC à " + EMAIL_CC);
    return true;
  } catch (error) {
    Logger.log("Erreur lors de l'envoi de l'email de mise à jour: " + error.toString());
    return false;
  }
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
    var sheet = spreadsheet.getSheets()[2]; // Changé de [1] à [2]
    
    // Trouver toutes les valeurs de la colonne A à partir de la ligne 4
    var idValues = sheet.getRange("A4:A").getValues();
    
    // Filtrer pour ne garder que les cellules qui contiennent des données
    var nonEmptyIds = idValues.filter(function(row) {
      return row[0] !== "";
    });
    
    // Calculer le nouvel ID
    var newId = 1;
    if (nonEmptyIds.length > 0) {
      // Prendre la dernière valeur d'ID et l'incrémenter
      var lastId = nonEmptyIds[nonEmptyIds.length - 1][0];
      
      // S'assurer que c'est un nombre
      if (typeof lastId === 'number') {
        newId = lastId + 1;
      } else {
        // Si ce n'est pas un nombre, essayer de le convertir
        var parsedId = parseInt(lastId, 10);
        if (!isNaN(parsedId)) {
          newId = parsedId + 1;
        }
      }
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
    
    // Trouver la prochaine ligne vide pour l'insertion
    var nextRow = nonEmptyIds.length + 4;
    
    // Écriture des données
    var range = sheet.getRange(nextRow, 1, 1, rowData.length);
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
    var sheet = spreadsheet.getSheets()[2]; // Changé de [1] à [2]
    var data = sheet.getDataRange().getValues();
    
    // Supprimer l'en-tête
    data.shift();
    
    return data;
  } catch (error) {
    Logger.log("Erreur lors de la récupération des données: " + error.toString());
    return [];
  }
}
