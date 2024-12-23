// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to get the information from headers
app.get("/api/whoami", function (req, res) {
  // Get the client's IP address
  let ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

  // Get the client's language preference
  let language = req.headers['accept-language'].split(',')[0];  // take the first language

  // Get the client's software (User-Agent)
  let software = req.headers['user-agent'];

  // Respond with a JSON object containing the IP address, language, and software
  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
