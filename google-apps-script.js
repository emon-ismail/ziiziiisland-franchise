// Google Apps Script to handle form submissions
// Copy this code to your Google Apps Script project

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.startDate || '',
      data.capital || '',
      data.city || '',
      data.state || '',
      data.marketPreference || '',
      data.heardFrom || ''
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'error', 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to set up the spreadsheet headers (run this once)
function setupHeaders() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();
  
  // Set up headers
  const headers = [
    'Timestamp',
    'First Name',
    'Last Name', 
    'Email',
    'Phone',
    'Start Date',
    'Capital to Invest',
    'City',
    'State',
    'Market Preference',
    'How Did You Hear About Us'
  ];
  
  // Clear existing data and set headers
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#4285f4')
    .setFontColor('white');
    
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
}

// Function to test the setup
function testSubmission() {
  const testData = {
    timestamp: new Date().toISOString(),
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '123-456-7890',
    startDate: '2024',
    capital: '$500,000',
    city: 'Dhaka',
    state: 'Test State',
    marketPreference: 'Urban',
    heardFrom: 'Website'
  };
  
  const response = doPost({
    postData: {
      contents: JSON.stringify(testData)
    }
  });
  
  Logger.log(response.getContent());
} 