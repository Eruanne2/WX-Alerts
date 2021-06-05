// run this file with `npm run babel-node app.js`


import axios from "axios";
// Email = require('https://smtpjs.com/v3/smtp.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
import { WX_KEY, PHONE_NO } from "./secrets";


async function checkWX(){

  const wxRequest = {
    method: 'GET',
    // url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?&aggregateHours=24&startDateTime=2019-06-13T00:00:00&endDateTime=2019-06-20T00:00:00&unitGroup=uk&contentType=json&dayStartTime=0:0:00&dayEndTime=0:0:00&location=BatonRouge,LA,US&key=${WX_KEY}`,
    url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&contentType=json&unitGroup=us&locationMode=single&key=${WX_KEY}&locations=London%2CUK `
  }


  /* SmtpJS.com - v3.0.0 */
  var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };
  
  function sendText() {
    
    Email.send({
      Host: "smtp.gmail.com",
      Username: "alignbank@gmail.com",
      Password: "UnsafePassword",
      To: PHONE_NO,
      From: "alignbank@gmail.com",
      Subject: "",
      'MIME-Version': '1.0rn',
      'Content-Type': "text/html; charset=ISO-8859-1rn",
      Body: textBody
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
    
  }
  

  let wxData = await axios.request(wxRequest)
  .then(response => response.data)
  .catch(error => error);


  console.log(wxData);

  if (wxData) {   // change this to check if there are alerts
    var textBody;
    
    // sendText();
  }

}

checkWX(); // set script to run every 15 min (on heroku?)