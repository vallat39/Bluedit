const bcrypt = require('bcrypt');
const saltRounds = 10;
var passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')
const express = require('express')
const bodyParser = require('body-parser')
var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/Bluedit', {useNewUrlParser: true});
const app = express()
const port = 8080
var User = require('./models/userSchema.js')
const path = require('path')

app.use(session({secret: 'cats'}));
app.use(passport.initialize());
app.use(passport.session());

var ControllerPages = require('./controller/pages.js')
var ControllerPosts = require('./controller/posts.js')
var ControllerUsers = require('./controller/users.js')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'pug')
app.use(express.static('public'))

function isLoggedIn(req, res, next) {
  console.log('User is not logged in')
  next()
}

app.get('/', ControllerPages.home)
app.get('/login', ControllerPages.login)
app.get('/signup', ControllerPages.signup)
app.post('/signup', ControllerUsers.newUser)
app.get('/posts', isLoggedIn, ControllerPosts.posts)
app.post('/user-post', ControllerPosts.post);
app.listen(port, () => console.log(`Listening on port ${port}`))

app.get('/upvote-post/:id', isLoggedIn, ControllerPosts.upvote)
app.get('/downvote-post/:id', isLoggedIn, ControllerPosts.downvote)

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: false })
);

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('Running LocalStrategy')
    User.findOne({ username: username }, function(err, user) {
      console.log("Inside mongo query callback")
      if (err) {
        console.log(err)
        return done(err);
      }
      if (user === null) {
        console.log("User is null")
        return done(null, false);
      }
      console.log('Mongo query successfully executed')
      console.log(user)
      bcrypt.compare(password, user.password, function(err, result) {
        if (result === false) {
          return done(null, false);
        }
        return done(null, user);
      })
    });
  }
));
