function setCategory(cat, catCell, val){ // to set categories based on course preferences
  var categoryCellval = catCell.getValue();
  if(categoryCellval === ""){
    catCell.setValue(val);
  }
  else{
    if(categoryCellval.indexOf(val) === -1){
      catCell.setValue(categoryCellval+", "+val);
    }
  }
}
function addInCourseSheet(sourceSheet, targetSheet, row){
  targetSheet.insertRowsAfter(1, 1);
  var fields = targetSheet.getRange("A1:1").getValues();
  var col = fields[0].indexOf("Categories") + 1;
  var numColumns = sourceSheet.getLastColumn();
  var target = targetSheet.getRange(2, col);
  sourceSheet.getRange(row, 1, 1, numColumns).copyTo(target);
}

function updateValues(sourceSheet, targetSheet, row){
  var currEmail = sourceSheet.getRange(row, 3).getValue();
  var numColumns = targetSheet.getLastColumn();
  var fields = targetSheet.getRange("A1:1").getValues();
  var col = fields[0].indexOf("Email Address") + 1;
  var emails = targetSheet.getRange(2, col, targetSheet.getMaxRows(),col).getValues();
  for(var i =0; i < emails.length; i++){
    //Logger.log(emails[i][0]);
    if(emails[i][0] === currEmail){
      var target = targetSheet.getRange(i+2, col); // as i start from 0 and 1st row is for field names
      //startrow, startcol, no. of rows, no. of cols
      sourceSheet.getRange(row, 3, 1, numColumns).copyTo(target);
      break;            
    }
  } 
}

function onEdit(e) {
  var sheets = ['All Applications','DSAlgo Applications','DEV Applications','ML Applications','Android Applications','Python Applications'];
  var srcSheet = e.source.getActiveSheet();
  var allApplicationSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheets[0]);
  var webdevSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheets[2]);//for web dev with nodejs
  var dsAlgoSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheets[1]);// for c++, java, competitive, DP
  var mlSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheets[3]);// for machine learning, data science
  var androidSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheets[4]);// for android
  var pythonSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheets[5]);// for django, python basics, chatbot
  var applicationCategories = ["ANDROID","DS - ALGO","MACHINE LEARNING","PYTHON", "WEB DEV"];
  var courses = ["Android","C++ Courses","Competitive Programming","JAVA Courses","Machine Learning","Web Development with Nodejs","Web Development with Python-Django"];
  var startRow = e.range.getRow();
  var startCol = e.range.getColumn(); 
  var endCol = e.range.getLastColumn()
  var endRow = e.range.getLastRow();
  var r = e.source.getActiveRange();
  //Logger.log(r.getA1Notation());
  Logger.log(startRow);
  Logger.log(startCol);
  Logger.log(endRow);
  Logger.log(endCol);
  
  if(srcSheet.getName() === sheets[0]){ //for changes in all applications sheet
    
      for (var currRow = startRow; currRow <= endRow; currRow++) {
        var categoryCell = allApplicationSheet.getRange(currRow, 1);
        var category = categoryCell.getValue();
        if(category == ""){
          var coursePreference = allApplicationSheet.getRange(currRow, 7).getValue(); 
          // android
          if(coursePreference.indexOf(courses[0]) !== -1){
            setCategory(coursePreference, categoryCell,applicationCategories[0]);
            addInCourseSheet(srcSheet,androidSheet,currRow);
          }
          //ds - algo
          if(coursePreference.indexOf(courses[1]) !== -1 || coursePreference.indexOf(courses[2]) !== -1 || coursePreference.indexOf(courses[3]) !== -1){
            setCategory(coursePreference, categoryCell,applicationCategories[1]);
            addInCourseSheet(srcSheet,dsAlgoSheet,currRow);
          }
          // machine learning
          if(coursePreference.indexOf(courses[4]) !== -1){
            setCategory(coursePreference, categoryCell,applicationCategories[2]);
            addInCourseSheet(srcSheet,mlSheet,currRow);
          }
          // python, django
          if(coursePreference.indexOf(courses[6]) !== -1){
            setCategory(coursePreference, categoryCell,applicationCategories[3]);
            addInCourseSheet(srcSheet,pythonSheet,currRow);
          }
          //nodejs
          if(coursePreference.indexOf(courses[5]) !== -1){
            setCategory(coursePreference, categoryCell,applicationCategories[4]);
            addInCourseSheet(srcSheet,webdevSheet,currRow);
          }   
        }    
        else{
          // android
          if(category.indexOf(applicationCategories[0]) !== -1){
            Logger.log("inside android");
            updateValues(srcSheet,androidSheet,currRow);
          }
          //ds - algo
          if(category.indexOf(applicationCategories[1]) !== -1){
            Logger.log("inside ds algo");
            updateValues(srcSheet,dsAlgoSheet,currRow);
          }
          // machine learning
          if(category.indexOf(applicationCategories[2]) !== -1){
            Logger.log("inside ML");
            updateValues(srcSheet,mlSheet,currRow);
          }
          // python, django
          if(category.indexOf(applicationCategories[3]) !== -1){
            Logger.log("inside py");
            updateValues(srcSheet,pythonSheet,currRow);
          }
          //nodejs
          if(category.indexOf(applicationCategories[4]) !== -1){
            Logger.log("inside web");
            updateValues(srcSheet,webdevSheet,currRow);
          }
          
        }
     }
  }
}



