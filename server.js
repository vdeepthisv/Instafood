var express = require('express');

var bodyParser = require('body-parser'); 

var multer = require('multer');

var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var googleStrategy = require('passport-google-oauth').OAuth2Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multipart = require('connect-multiparty');
var nodemailer = require('nodemailer');
 

var app = express();
app.use(multipart({
    uploadDir: "./public/project/uploads"
}));
var secretSession = session({
    saveUninitialized: true,
    resave: true,
    secret: 'Instafoodsecretkey'
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(express.json());
app.use(multer());
 
app.use(cookieParser());
app.use(secretSession);

app.use(passport.initialize()); 
app.use(passport.session());

app.use(express.static(__dirname + '/public')); 

var mongoconnection =  'mongodb://localhost:27017/Instafood';
 
mongoose.connect(mongoconnection);

var db = mongoose.connection; 

var userSchema = require("./public/project/server/models/user_data.js")(mongoose);
var userModel = mongoose.model("NUser", userSchema);

passport.use(new localStrategy(
  function (username, password, done) {
    var credential = {
      username: username,
      password: password
    }
    userModel.findOne(credential, function (err, user) {
      if(err) done(err);
      else if(user)   done(null, user);
      else    done(null, false);
    })
  })
);

var ipaddress =  'weblab.cs.uml.edu'|'127.0.0.1';
var port      =  9020;
app.listen(port, ipaddress);

passport.serializeUser(function(user, done){
  done(null, user)
})

passport.deserializeUser(function(user, done){
    userModel.findById(user._id, function(err, user){
        done(err, user);
    })
})

app.post('/api/project/user/login', passport.authenticate('local'), function(req, res){
    var user = req.user;
    res.json(user);
})

app.get('/api/project/user/loggedin', function(req, res){
    res.send(req.isAuthenticated()? req.user : '0');
})

app.get("/api/project/user/logout",  function (req, res) {
    req.logout();
    res.send(200);

});

app.post("/api/project/user/register", function(req, res){
    var newUser = req.body;
    var credential = {
        username: newUser.username,
        password: newUser.password
    }
    userModel.findOne(credential, function(err, user){
      if(err) { return next(err); }
      else if(user){
          res.json(null);
          return;
      }
      else{
          userModel.create(newUser, function(err, user){
              req.login(user, function(err){
                  if(err){
                      res.send(err)
                  }
                  res.json(user);
              })
          })
      }
    })
})

var auth = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    }
    else {
        next();
    }
};

require("./public/project/server/app.js")(app, auth, mongoose, nodemailer, passport, localStrategy, multipart, googleStrategy);

