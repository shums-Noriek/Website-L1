# Wire the consultation form to the Google Sheet

The form posts to `/api/enquiry`, which forwards each enquiry to a Google Apps
Script web app that appends a row to the Noriek sheet.

Sheet: https://docs.google.com/spreadsheets/d/1WTLZ8DhUedzAiaJwjq1sPZFs4b8rCJt5r4ooCku3IZ4/edit

## 1. Add a header row to the sheet (row 1)

| Received At | Name | Contact | Email | Property Type |
|-------------|------|---------|-------|---------------|

## 2. Create the Apps Script

In the sheet: **Extensions → Apps Script**. Delete the sample code, paste this,
and save:

```js
const SHEET_ID = "1WTLZ8DhUedzAiaJwjq1sPZFs4b8rCJt5r4ooCku3IZ4";

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
    sheet.appendRow([
      d.receivedAt || new Date().toISOString(),
      d.name || "",
      "'" + (d.contact || ""),   // leading quote keeps the leading 0 / avoids number formatting
      d.email || "",
      d.propertyType || "",
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3. Deploy as a web app

**Deploy → New deployment → (gear) Web app**
- Description: `Noriek enquiry intake`
- Execute as: **Me**
- Who has access: **Anyone**
- **Deploy**, authorise when prompted, then copy the **Web app URL**
  (`https://script.google.com/macros/s/AKfyc.../exec`)

## 4. Add the URL to Vercel

Vercel → project **noriek** → **Settings → Environment Variables**:
- Name: `SHEETS_WEBHOOK_URL`
- Value: the `/exec` URL from step 3
- Environments: Production, Preview, Development
- **Save**, then **Redeploy** the latest deployment (or push a commit).

## Notes

- Until `SHEETS_WEBHOOK_URL` is set, the API validates and logs the enquiry but
  does not write to the sheet (the form still shows the success message).
- If you change the Apps Script later, use **Deploy → Manage deployments → Edit →
  New version** so the same `/exec` URL keeps working.
