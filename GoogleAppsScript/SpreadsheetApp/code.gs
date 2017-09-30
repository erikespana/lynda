/**
 * Reads a specified range of cells in a specified Google Sheet.
 *
 * 
 */
function read() {
  var id = "123456789123456789";		// sheet id

  // 
  var sheet = SpreadsheetApp.openById(id).getSheetByName("sheet1");
  
  var cells = "A1:C45";

  // Get 'Range' object based on the specified cell range 
  var range = sheet.getRange(cells);
  
  // Associative array that will store transaction sums,
  // grouped by description, ie: sums["Payroll"] = 1500
  var sums = new Array();
  
  // Turn range object into array of arrays to use the values, ie: rows[0]
  var rows = range.getValues();
  
  // call function to sum rows
  sumRows(rows, sums);
  
  // Logger.log('sums.length: '+sums.length());
  /*
  // print contents of sums[] array
  for (d in sums) {
    Logger.log(d + ' : ' + roundToTwo(sums[d]));
  }*/

  /*
  // getLastRow()
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  
  // This logs the value in the very last cell of this sheet
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var lastCell = sheet.getRange(lastRow, lastColumn);
  Logger.log(lastCell.getValue());
 */
  
} // end function read()

/**
 * Sum transactions with the same description
 *
 * 
 */
function sumRows(rows, sums) {
  var date, desc, amount;
  
  // loop through transactions in rows
  for (i=0; i< rows.length; i++) {
    // get date, ie "12/21"
    date = rows[i][0].split('/');
    
    // check if row isn't empty
    if (typeof date[1] === 'string') {
      desc = rows[i][1];
      amount = rows[i][2];
      
      // increment associative array by transaction amount
      if (typeof sums[desc] !== 'number') {
        sums[desc] = amount;
      } else {
        sums[desc] += amount;
      }
    }
  }
} // end function sumRows()
