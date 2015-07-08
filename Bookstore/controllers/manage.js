'use strict';
var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function(router) {
  router.get('/books', function(req, res) {
    Book.find({}, function(err, books) {
      if (err) {
        console.log(err);
      }
      var model = {
        books: books
      };
      res.render('manage/books/index', model);
    });
  });

  router.get('/', function(req, res) {
    res.render('manage/index');
  });

  router.get('/categories', function(req, res) {
    Category.find({}, function(err, categories) {
      if (err) {
        console.log(err);
      }
      var model = {
        categories: categories
      };
      res.render('manage/categories/index', model);
    });
  });
}