axios = require("axios");

const options = {
  method: 'POST',
  url: 'https://sms77io.p.rapidapi.com/sms',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'x-rapidapi-key': '9b1a11cba5msh3649975e0b88403p1d2db5jsnc3351d6c877e',
    'x-rapidapi-host': 'sms77io.p.rapidapi.com'
  },
  data: {
    to: '+7703318612',
    p: '9b1a11cba5msh3649975e0b88403p1d2db5jsnc3351d6c877e',
    text: 'Hello Charis :)'
  }
};


axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});


// weather

// P9XNPPBGVPQ8MNQDRMPN6PLUE

const wxRequest = {
  method: 'GET',
  url: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?&aggregateHours=24&startDateTime=2019-06-13T00:00:00&endDateTime=2019-06-20T00:00:00&unitGroup=uk&contentType=csv&dayStartTime=0:0:00&dayEndTime=0:0:00&location=Sterling,VA,US&key=P9XNPPBGVPQ8MNQDRMPN6PLUE',
}

axios.request(wxRequest).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
