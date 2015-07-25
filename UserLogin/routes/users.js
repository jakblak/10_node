var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var upload = multer({
  dest: '../uploads/'
});
var User = require('../models/User.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', {
    'title': 'Register'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    'title': 'Login'
  });
});

router.post('/register', upload.single('profileimage'), function(req, res, next) {
  // Get Form Values
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  // Check for Image Field
  if (req.body.profileimage) {
    console.log('Uploading File...');

    // File Info
    var profileImageOriginalName = req.file.profileimage.originalname;
    var profileImageName = req.file.profileimage.fieldname;
    var profileImageMime = req.file.profileimage.mimetype;
    var profileImagePath = req.file.profileimage.path;
    var profileImageExt = req.file.profileimage.encoding;
    var profileImageSize = req.file.profileimage.size;
  } else {
    // Set a Default Image
    var profileImageName = 'noimage.png';
  }

  // Form Validation
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Email not valid').isEmail();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  // Check for errors
  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors,
      name: name,
      email: email,
      username: username,
      password: password,
      password2: password2
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileImageName
    });
  }

  // Create User
  User.createUser(newUser, function(err, user) {
    if (err) throw err;
    console.log(user);
  });

  // Success Message
  req.flash('success', 'You are now registered and may log in');

  res.location('/');
  res.redirect('/');
});

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new LocalStrategy(
  function(username, password, done){
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user) {
        console.log('Unknown User');
        return done(null, false, {message: 'Unknown User'});
      }
      User.comparePassword(password, user.password, function(err, isMatch) {
        if(err) throw err;
        if(isMatch) {
          return done(null, user);
        } else {
          console.log('Invalid Password');
          return done(null, false, {message: 'Invalid Password'});
        }
      });
    });
  }));

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: 'Invalid Username or Password'
  }),
  // If user authenticates
  function(req, res) {
    console.log('Authentication successful');
    req.flash('success', 'You are logged in');
    res.redirect('/');
  });

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/users/login');
});

module.exports = router;