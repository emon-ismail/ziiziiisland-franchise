# Google Sheets Form Integration Setup Guide

## Step 1: Set up Google Apps Script

1. **Open your Google Sheets document**: https://docs.google.com/spreadsheets/d/1mVrXq5EOx3uGUymfvFTNIznWwfO8qCLO9Sg5qnhKF3g/edit?gid=0#gid=0

2. **Go to Extensions > Apps Script**
   - Click on "Extensions" in the menu
   - Select "Apps Script"

3. **Replace the default code** with the code from `google-apps-script.js`
   - Delete the existing `myFunction()` code
   - Copy and paste the entire content from `google-apps-script.js`

4. **Save the script**
   - Click the save icon or press Ctrl+S
   - Give it a name like "Form Handler"

## Step 2: Deploy the Web App

1. **Click "Deploy" > "New deployment"**

2. **Configure the deployment**:
   - **Type**: Web app
   - **Execute as**: Me (your Google account)
   - **Who has access**: Anyone
   - **Description**: Form Handler v1

3. **Click "Deploy"**

4. **Authorize the app**:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" > "Go to [Project Name] (unsafe)"
   - Click "Allow"

5. **Copy the Web App URL**
   - You'll get a URL like: `https://script.google.com/macros/s/AKfycbz.../exec`
   - Copy this URL

## Step 3: Update Your Website

1. **Open `script.js`** in your website

2. **Replace the placeholder URL**:
   ```javascript
   const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
   
   With your actual Web App URL:
   ```javascript
   const scriptURL = 'https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec';
   ```

## Step 4: Set up Spreadsheet Headers

1. **Go back to Google Apps Script**

2. **Run the setup function**:
   - In the Apps Script editor, you'll see a dropdown next to the function names
   - Select `setupHeaders` from the dropdown
   - Click the "Run" button (play icon)
   - This will create the column headers in your spreadsheet

3. **Check your spreadsheet** - you should now see formatted headers

## Step 5: Test the Integration

1. **Test the form submission**:
   - Go to your website
   - Fill out the contact form
   - Submit the form
   - Check your Google Sheets - you should see the data appear

2. **If there are issues**:
   - Open browser developer tools (F12)
   - Check the Console tab for any error messages
   - Verify the Web App URL is correct

## Troubleshooting

### Common Issues:

1. **CORS Errors**: The form should work despite CORS warnings due to `mode: 'no-cors'`

2. **Authorization Issues**: Make sure you've authorized the Apps Script properly

3. **URL Issues**: Double-check that you've copied the entire Web App URL correctly

4. **Data Not Appearing**: 
   - Check that `setupHeaders()` was run successfully
   - Verify the Apps Script has permission to edit the spreadsheet

### Security Notes:

- The Web App URL will be public, but only authorized users can execute the script
- Form data is sent over HTTPS
- Consider adding rate limiting or CAPTCHA for production use

## Data Structure

The form will send the following data to your spreadsheet:

| Column | Field | Description |
|--------|-------|-------------|
| A | Timestamp | When the form was submitted |
| B | First Name | User's first name |
| C | Last Name | User's last name |
| D | Email | User's email address |
| E | Phone | User's phone number |
| F | Start Date | When they want to start |
| G | Capital to Invest | Investment amount |
| H | City | Selected city |
| I | State | User's state |
| J | Market Preference | Market preference |
| K | How Did You Hear About Us | Source of referral |

## Support

If you encounter any issues:
1. Check the browser console for JavaScript errors
2. Verify the Apps Script deployment is active
3. Test with the `testSubmission()` function in Apps Script
4. Ensure all form fields have proper `name` attributes 