var express = require('express');
var appRouter = require('./api/route/index');
var app = express();
// var bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({'extended':false}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT,GET,DELETE,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept, Authorization,' +
      ' Access-Control-Allow-Credential');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
});
app.use('/', appRouter);
// app.use('/',function(req, res, next) {
//     res.send('Express RESTful API');
//   });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;