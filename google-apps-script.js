// Google Apps Script — paste this into https://script.google.com
// Deploy as: Web app, execute as "Me", access "Anyone"
// IMPORTANT: After pasting, update the SHEET_ID below with your Google Sheet ID

var SHEET_ID = "1TclOeMJG2oIw91K7--dAYoe-WsX0oC7UlcOUnUscHz0";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var phone = data.phone || "unknown";
    var action = data.action || "unknown";
    var timestamp = new Date();

    // Log to Google Sheet
    var sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Phone", "Action"]);
    }
    sheet.appendRow([timestamp, phone, action]);

    // Send email
    var subject = "Charles Baynes Home Alerts — " + action;
    var body = "Phone: " + phone + "\nAction: " + action + "\nTimestamp: " + timestamp.toLocaleString();

    MailApp.sendEmail({
      to: "2460@cccccccharles.com",
      subject: subject,
      body: body
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
