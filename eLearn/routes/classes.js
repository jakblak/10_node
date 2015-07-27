var express = require('express');
var router = express.Router();

Class = require('../models/class');

router.get('/', function(req, res, next) {
  Class.getClasses(function(err, classes){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.render('classes/index', { "classes": classes });
    }
  }, 3);
});

router.get('/:id/details', function(req, res, next) {
  Class.getClassesById([req.params.id],function(err, classname){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.render('classes/details', { "class": classname });
    }
  });
});

router.get('/:id/lessons', function(req, res, next) {
  Class.getClassesById([req.params.id],function(err, classname){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.render('classes/;esspms', { "class": classname });
    }
  });
});

router.get('/:id/lessons/:lesson_id', ensureAuthenticated, function(req, res, next) {
  Class.getClassesById([req.params.id],function(err, classname) {
    if(err){
      var lesson;
      res.send(err);
    } else {
        // loop through lessons to see if they equal :lesson_id
        for (i = 0; i < classname.lessons.length; i++) {
          if (classname.lessons[i].lesson_number == req.params.lesson_id) {
            lesson = classname.lessons[i];
          }
        }
        res.render('classes/lesson', {
          'class' : classname,
          'lesson' : lesson
        });
    }
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
}

module.exports = router;
