
var express = require('express');
var app = express();

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var serveStatic = require('serve-static')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(accessToken)
      console.log(refreshToken)
      console.log(profile)
      return done(null, {username: 'username'})
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(serveStatic('public'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/login',
  passport.authenticate('google', { scope: ['https://mail.google.com/','https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.listen(80, function () {
    console.log('Example app listening!');
});
