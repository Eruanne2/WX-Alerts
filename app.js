axios = require("axios");
const { WX_KEY, SMS_KEY, PHONE_NO } = require("./api_keys");

// weather

const wxRequest = {
  method: 'GET',
  url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?&aggregateHours=24&startDateTime=2019-06-13T00:00:00&endDateTime=2019-06-20T00:00:00&unitGroup=uk&contentType=json&dayStartTime=0:0:00&dayEndTime=0:0:00&location=Enid,OK,US&key=${WX_KEY}`,
}

axios.request(wxRequest)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));


// sms

const options = {
  method: 'POST',
  url: 'https://sms77io.p.rapidapi.com/sms',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'x-rapidapi-key': SMS_KEY,
    'x-rapidapi-host': 'sms77io.p.rapidapi.com'
  },
  data: {
    to: PHONE_NO,
    p: SMS_KEY,
    text: 'Hello Charis :)'
  }
};

axios.request(options)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
