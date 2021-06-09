// run this file with `npm run babel-node app.js`

import axios from "axios";
import Email from './email';
import { WX_KEY, PHONE_NO, EMAIL_PASSWORD } from "./secrets";


async function checkWX(){

  const wxRequest = {
    method: 'GET',
    url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&contentType=json&unitGroup=us&locationMode=single&key=${WX_KEY}&locations=Enid,OK&alertLevel=detail`
  }
  
  function sendText(body) {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "alignbank@gmail.com",
      Password: EMAIL_PASSWORD,
      To: PHONE_NO,
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
  let alerts = wxData.location.alerts

  if (alerts.length > 0) {
    var textBody = alerts; // create text body
    sendText(textBody);
  }

}

checkWX(); // set script to run every 15 min (on heroku?)