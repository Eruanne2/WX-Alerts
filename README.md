# WX-Alerts

Just a small script I'm testing for my husband. He loves to keep track of weather in the various places we've lived, so I want to set up an alert that will text him any time there is a major weather event in any of those places.

I'm [using email to text him](https://www.techrepublic.com/blog/microsoft-office/use-outlook-to-send-e-mail-to-a-cell-phone/) (from the email address I created for my Align Bank project lol), which is a pretty great way to avoid having to use an SMS api. :)
```javascript
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
```

The weather api I'm using is [Visual Crossing Weather](https://www.visualcrossing.com/resources/documentation/weather-api/weather-api-documentation/). It returns an option not only for current weather conditions, but also for active alerts.
```javascript
   { //...
     address: 'Enid, OK, United States',
     name: 'Enid,OK',
     index: 0,
     latitude: 36.3976,
     longitude: -97.8783,
     distance: 0,
     time: 0,
     tz: 'America/Chicago',
     currentConditions:
      { wdir: 135,
        temp: 85.9,
        sunrise: '2021-06-08T06:13:26-05:00',
        visibility: 9.9,
        wspd: 10.4,
        icon: 'clear-day',
        stations: '',
        heatindex: 90.9,
        cloudcover: 23.2,
        datetime: '2021-06-08T18:30:33-05:00',
        precip: 0,
        moonphase: 0.99,
        snowdepth: null,
        sealevelpressure: 1011.9,
        dew: 70.4,
        sunset: '2021-06-08T20:48:10-05:00',
        humidity: 60,
        wgust: 11,
        windchill: null 
      },
     alerts: [] 
   }
```

I plan to include each of the cities he wants in the request, then check the alert arrays to see if they have anything in them. If so, the alerts will be formatted into a text body and sent to his number. 
```javascript
  let wxData = await axios.request(wxRequest)
  .then(response => response.data)
  .catch(error => error);

  let preferences = ['snow', 'hail', 'storm', 'tornado', 'hurricane', 'flood', 'winter', 'ice'];

  wxData.locations.forEach(location => {
    location.alerts.forEach(alert => {
      preferences.forEach(keyword => {
        if (alert.headline.toLowerCase().includes(keyword)){
          sendText(RYAN_NO, alert.headline);
          sendText(CHARIS_NO, alert.headline);
        }
      })
    })
  })
  ```
As you can see, I have filtered the alerts to only include severe weather events. This will avoid hourly texts for frequent occurences such as a heat advisory. 
This script is set up to run on Heroku Scheduler once per hour. 
