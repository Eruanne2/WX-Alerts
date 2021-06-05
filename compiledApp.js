"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

axios = require("axios"); // Email = require('https://smtpjs.com/v3/smtp.js');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var _require = require("./api_keys"),
    WX_KEY = _require.WX_KEY,
    SMS_KEY = _require.SMS_KEY,
    PHONE_NO = _require.PHONE_NO; // get weather


var wxRequest = {
  method: 'GET',
  url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?&aggregateHours=24&startDateTime=2019-06-13T00:00:00&endDateTime=2019-06-20T00:00:00&unitGroup=uk&contentType=json&dayStartTime=0:0:00&dayEndTime=0:0:00&location=Enid,OK,US&key=".concat(WX_KEY)
};

function getWX() {
  return _getWX.apply(this, arguments);
} // wxData = await getWX();
// console.log(wxData);
// sms

/* SmtpJS.com - v3.0.0 */


function _getWX() {
  _getWX = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            axios.request(wxRequest).then(function (response) {
              return response;
            })["catch"](function (error) {
              return error;
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getWX.apply(this, arguments);
}

var Email = {
  send: function send(a) {
    return new Promise(function (n, e) {
      a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send";
      var t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
        n(e);
      });
    });
  },
  ajaxPost: function ajaxPost(e, n, t) {
    var a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () {
      var e = a.responseText;
      null != t && t(e);
    }, a.send(n);
  },
  ajax: function ajax(e, n) {
    var t = Email.createCORSRequest("GET", e);
    t.onload = function () {
      var e = t.responseText;
      null != n && n(e);
    }, t.send();
  },
  createCORSRequest: function createCORSRequest(e, n) {
    var t = new XMLHttpRequest();
    return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest()).open(e, n) : t = null, t;
  }
}; // format: '7703318612@txt.att.net'
// Alltel @message.alltel.com 
// AT&T @txt.att.net 
// Nextel @messaging.nextel.com 
// Sprint @messaging.sprintpcs.com 
// SunCom @tms.suncom.com 
// T-mobile @tmomail.net 
// VoiceStream @voicestream.net 
// Verizon @vtext.com (text only) @vzwpix.com (pictures and videos)

function sendEmail() {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "alignbank@gmail.com",
    Password: "UnsafePassword",
    To: '7703318612@vtext.com',
    From: "alignbank@gmail.com",
    Subject: "",
    'MIME-Version': '1.0rn',
    'Content-Type': "text/html; charset=ISO-8859-1rn",
    Body: 'hello charis'
  }).then(function (response) {
    return console.log(response);
  })["catch"](function (error) {
    return console.log(error);
  });
} // sendEmail();
