function contestCategory(sheetsList, sourceSheet,mailData){
  
  if(sourceSheet.getName() === sheetsList[1]){//Ds Algo
    mailData[5] = "Data Structures & Algorithms";
  }
  else if(sourceSheet.getName() === sheetsList[2]){//dev
     mailData[5] = "Data Structures & Algorithms and Web Development";
  }
  else if(sourceSheet.getName() === sheetsList[3]){//ML
     mailData[5] = "Data Structures & Algorithms and Machine Learning";
  }
  else if(sourceSheet.getName() === sheetsList[4]){//Android
     mailData[5] = "Data Structures & Algorithms and Android";
  }
  else if(sourceSheet.getName() === sheetsList[5]){//Python
     mailData[5] = "Data Structures & Algorithms and Web Development(using Django)";
  }
}
function interviewCategory(sheetsList, sourceSheet,mailData){
  
  if(sourceSheet.getName() === sheetsList[1]){//Ds Algo
    mailData[3] = "Data Structures & Algorithms";
  }
  else if(sourceSheet.getName() === sheetsList[2]){//dev
     mailData[3] = "Web Development(using Nodejs)";
  }
  else if(sourceSheet.getName() === sheetsList[3]){//ML
     mailData[3] = "Machine Learning";
  }
  else if(sourceSheet.getName() === sheetsList[4]){//Android
     mailData[3] = "Android";
  }
  else if(sourceSheet.getName() === sheetsList[5]){//Python
     mailData[3] = "Web Development(using Django)";
  }
}
function sendMail(e) {

  var sheets = ['All Applications','DSAlgo Applications','DEV Applications','ML Applications','Android Applications','Python Applications'];
  var srcSheet = e.source.getActiveSheet();
  var applicationCategories = ["ANDROID","DS - ALGO","MACHINE LEARNING","PYTHON", "WEB DEV"];
  var startRow = e.range.getRow();
  var startCol = e.range.getColumn(); 
  var endCol = e.range.getLastColumn()
  var endRow = e.range.getLastRow();
  if(srcSheet.getName() !== sheets[0]){
     for (var currRow = startRow; currRow <= endRow; currRow++) {
      var fields = srcSheet.getRange("A1:1").getValues();
      var round1emailcol = fields[0].indexOf("Round1 Email") + 1;
      var round2emailcol = fields[0].indexOf("Round2 Email") + 1;
      var round3emailcol = fields[0].indexOf("Round3 Email") + 1;
      var userEmail = fields[0].indexOf("Email Address");
      var userName = fields[0].indexOf("Name");
      var currRowData = srcSheet.getRange(currRow, 1, 1, srcSheet.getLastColumn()).getValues();//startrow, startcol, no. of rows, no. of cols
       if(startCol == round1emailcol){  //round1 email - hb contest
        var colVal = srcSheet.getRange(currRow,round1emailcol).getValue();
        if(colVal === 'SEND'){ 
          var testmailhtml = HtmlService.createTemplateFromFile("HbTestEmail.html");
          var contestDate = fields[0].indexOf("HB Test Date");
          var contestTime = fields[0].indexOf("HB Test Time");
          var contestDuration = fields[0].indexOf("HB Test Duration");
          var contestLink = fields[0].indexOf("HB Test Link");
          var mailData = [currRowData[0][userName], currRowData[0][contestDate], currRowData[0][contestTime], currRowData[0][contestDuration], currRowData[0][contestLink],""];
          contestCategory(sheets,srcSheet,mailData);
          testmailhtml.mailData = mailData;
          var testmailhtmlText = testmailhtml.evaluate().getContent();
          var emailTo = 'sanjeet@codingblocks.com';
          var subject = "Coding Blocks TA Internship Test";
          var textBody = testmailhtmlText;
          var aliases = GmailApp.getAliases();
          var options = {htmlBody : testmailhtmlText, name:"Coding Blocks", from: aliases[0]};
          
          if(emailTo !== undefined){
            GmailApp.sendEmail(emailTo, subject, textBody, options);
          }
        }
      }
       
       if(startCol == round2emailcol){ //round2 email - interview
        var colVal = srcSheet.getRange(currRow,round2emailcol).getValue();
        if(colVal === 'SEND'){
          var interviewDate = fields[0].indexOf("Interview Date");
          var interviewTime = fields[0].indexOf("Interview Time");
          var mailData = [currRowData[0][userName], currRowData[0][interviewDate], currRowData[0][interviewTime],""];
          interviewCategory(sheets,srcSheet,mailData);
          var interviewmailhtml = HtmlService.createTemplateFromFile("InterviewEmail.html");
          interviewmailhtml.mailData = mailData;
          var interviewmailhtmlText = interviewmailhtml.evaluate().getContent();
          var emailTo = 'sanjeet@codingblocks.com';
          var subject = "Coding Blocks TA Internship Interview";
          var textBody = interviewmailhtmlText;
          var aliases = GmailApp.getAliases();
          var options = {htmlBody : interviewmailhtmlText, name:"Coding Blocks", from: aliases[0], cc: 'snjmithu@gmail.com'};
          
          if(emailTo !== undefined){
            Logger.log("here");
            GmailApp.sendEmail(emailTo, subject, textBody, options);
          }
        }
      }
      if(startCol == round3emailcol){ //round3 email - debugging 
        var colVal = srcSheet.getRange(currRow,round3emailcol).getValue();
        if(colVal === 'SEND'){
          var debuggingDate = fields[0].indexOf("Debugging Date");
          var debuggingTime = fields[0].indexOf("Debugging Time");
          var debuggingHangoutsLink = fields[0].indexOf("Debugging Hangouts Link");
          var debuggingGoogleSheeLink = fields[0].indexOf("Debugging Google Sheet Link");
          var mailData = [currRowData[0][userName], currRowData[0][debuggingDate], currRowData[0][debuggingTime],currRowData[0][debuggingHangoutsLink],currRowData[0][debuggingGoogleSheeLink]];
          var debuggingmailhtml = HtmlService.createTemplateFromFile("dsAlgoDebuggingEmail.html");
          debuggingmailhtml.mailData = mailData;
          var debuggingmailhtmlText = debuggingmailhtml.evaluate().getContent();
          var emailTo = 'sanjeet@codingblocks.com';
          var subject = "Coding Blocks TA Internship Debugging Round";
          var textBody = debuggingmailhtmlText;
          var aliases = GmailApp.getAliases();
          var options = {htmlBody : debuggingmailhtmlText, name:"Coding Blocks", from: aliases[0]};
          
          if(emailTo !== undefined){
            Logger.log("here");
            GmailApp.sendEmail(emailTo, subject, textBody, options);
          }
        }
      } 
    } 
  }
}
