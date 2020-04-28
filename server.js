// Require Libraries
const express = require('express');

// App Setup
const app = express();

// Middleware
const dotenv = require('dotenv').config();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
      console.log("Cookie nToken undefined")
      req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    console.log("Cookie nToken IS defined: " + decodedToken.payload)
    req.user = decodedToken.payload;
  }

  next();
};
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(checkAuth);


// Add controllers
require('./controllers/auth.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/posts.js')(app);
require('./data/reddit-db');




// Start Server
app.listen(3000, () => {
    console.log('Reddit listening on port localhost:3000!');
});

module.exports = app;
