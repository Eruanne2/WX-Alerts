# WX-Alerts

Just a small script I'm testing for my husband. He loves to keep track of weather in the various places we've lived, so I want to set up an alert that will text him any time there is a major weather event in any of those places.

I'm using email to text him (the email address I created for my Align Bank project, lol), which is a pretty great way to avoid having to use an SMS api :)
```javascript
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
```

The weather api I'm using is 
