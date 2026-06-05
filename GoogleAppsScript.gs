const SHEET_NAME = "Sheet1"; // Change if your sheet tab is named differently

function doPost(e) {
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(SHEET_NAME) || doc.getActiveSheet();

    // Ensure header row exists on first run
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Nombre",
        "Asistencia",
        "Entrante",
        "Plato Principal",
        "Desayuno de Desvelados"
      ]);
    }

    // Parse the payload sent from the React app
    const body = JSON.parse(e.postData.contents);
    const timestamp = new Date();

    // Append a new row matching column order
    sheet.appendRow([
      timestamp,
      body.name      || "",
      body.attending || "",
      body.food1     || "",
      body.food2     || "",
      body.food3     || ""
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "RSVP recorded." })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
