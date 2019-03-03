var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
const bodyParser = require("body-parser");
app.use(bodyParser.json());

router.get('/', function(req, res, next) {
  res.send('Express RESTful API');
});

var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hiteshi_db'
});

router.post('/signup', bodyParser.json(),function(req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var sql = "INSERT INTO users (username,email,password)"+
  `VALUES ('${username}','${email}','${password}')`;
  
  conn.query(sql, function (err, result) {
    if (err){
      res.send({'status':false,'err':err});
    }else{
     res.send({'status':true});
    }
  });
});

router.get('/allusers',function(req, res, next) {
  var sql = "select * from users";  
  conn.query(sql, function (err, result) {
    if (err){
      res.send({'status':false,'err':err,'msg':'error in query'});
    }else{
      if (result.length>0){
      res.send({'status':true,'data':result,'msg':'success'});
      }
    }
  });
});

router.post('/login', bodyParser.json(),function(req, res, next) {
  var email = req.body.email;
  var pass = req.body.pass;
  var sql = "select id from users where email='"+email+"' and password = '"+pass+"'";  
  conn.query(sql, function (err, result) {
    if (err){
      res.send({'status':false,'err':err,'msg':'error in query'});
    }else{
      if (result.length>0){
        res.send({'status':true,'msg':'Login Successfully','statusCode':200,'result':result});
      }else{
        res.send({'status':true,'msg':'Username and password not match..','statusCode':201});
      }
      
    }
  });
});



module.exports = router;