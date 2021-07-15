// run this file with `npm run babel-node app.js`

import axios from "axios";
import Email from './email';
import { WX_KEY, RYAN_NO, CHARIS_NO, DAD_MORSE_NO, MOM_MORSE_NO, EMAIL_PASSWORD } from "./config/keys";


async function checkWX(){

  const wxRequest = {
    method: 'GET',
    url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&contentType=json&unitGroup=us&locationMode=array&key=${WX_KEY}&locations=Enid,OK|Tyrone,GA|Alamogordo,NM|Cloudcroft,NM|WitchitaFalls,TX|Atlanta,GA|Valdosta,GA&alertLevel=detail`
  }

  function hasKeyword(alert, keyword) {
    return alert.headline.toLowerCase().includes(keyword);
  } 

  function isNewAlert(alert) {
    let currentTime = new Date();
    let alertStart = new Date(alert.onset);
    let ONE_HOUR = 60 * 60 * 1000;
    return ((currentTime - alertStart) < ONE_HOUR);
  }
  
  function sendText(recipient, body) {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "alignbank@gmail.com",
      Password: EMAIL_PASSWORD,
      To: recipient,
      From: "alignbank@gmail.com",
      Subject: "",
      'MIME-Version': '1.0rn',
      'Content-Type': "text/html; charset=ISO-8859-1rn",
      Body: body
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
  }
  

  let wxData = await axios.request(wxRequest)
  .then(response => response.data)
  .catch(error => error);

  let preferences = ['snow', 'hail', 'storm', 'tornado', 'hurricane', 'flood', 'winter', 'ice', 'severe'];


  wxData.locations.forEach(location => {
    location.alerts.forEach(alert => {
      preferences.forEach(keyword => {
        if (hasKeyword(alert, keyword) && isNewAlert(alert)){
          // sendText(RYAN_NO, alert.headline);
          sendText(CHARIS_NO, alert.headline);
          // sendText(DAD_MORSE_NO, alert.headline);
          // sendText(MOM_MORSE_NO, alert.headline);
        }
      })
    })
  })
  
}

checkWX();
