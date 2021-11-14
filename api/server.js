require('dotenv').config();

const express = require('express'),
 app = express(),
 path = require('path'),
 cors = require('cors'),
 bodyParser = require('body-parser'),
 nconf = require('./config'),
 methodOverride = require('method-override'),
 writeError = require('./helpers/response').writeError;

// Set port
app.set('port', nconf.get('PORT'))

// Enable Cors
app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,OPTIONS,POST,PUT,DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

//dummy request
app.get('/dummy', (req, res) => res.send('Response from server.js'))

// error handler
app.use(function (err, req, res, next) {
    if (err && err.status) {
      writeError(res, err);
    } else next(err);
  });

app.listen(app.get('port'), () => {
    console.log('Listening on Port ' + app.get('port'));
});