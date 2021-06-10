// run this file with `npm run babel-node app.js`

import axios from "axios";
import Email from './email';
import { WX_KEY, RYAN_NO, CHARIS_NO, EMAIL_PASSWORD } from "./secrets";


async function checkWX(){

  const wxRequest = {
    method: 'GET',
    url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&contentType=json&unitGroup=us&locationMode=array&key=${WX_KEY}&locations=Enid,OK|Tyrone,GA|Alamogordo,NM|Cloudcroft,NM|WitchitaFalls,TX|Atlanta,GA&alertLevel=detail`
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

  console.log(wxData);
  let alerts = {};
  wxData.locations.forEach(location => alerts[location.name] = location.alerts)
  console.log(alerts)

  Object.keys(alerts).forEach(location => {
    alerts[location].forEach(alert => {
      if (alert.headline )
      // sendText(RYAN_NO, alert.headline);
      sendText(CHARIS_NO, alert.headline);
    })
  })
  
}

checkWX(); // set script to run every 15 min (on heroku?)
