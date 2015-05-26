var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var userSchema = mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
    bcrypt: true
  },
  type: {                     // student or instructor
    type: String
  }
});

var User = module.exports = mongoose.model('User', userSchema);

// Fetch User by ID
module.exports.getUserById = function(id, callback) {
  User.findById(callback);
}

// Get User by Name
module.exports.getUserByUsername = function(username, callback) {
  var query = { username: username };
  User.findOne(query, callback);
}

// Save Student
module.exports.saveStudent = function(newUser, newStudent, callback) {
  bcrypt.hash(newUser.password, 10, function(err, hash){
    if (err) throw err;
    // Set hash
    newUser.password = hash;
    console.log('Student is being saved');
    // Updating both the user and student collection
    async.parallel([newUser.save, newStudent.save], callback);
  });
}

// Save Student
module.exports.saveInstructor = function(newUser, newInstructor, callback) {
  bcrypt.hash(newUser.password, 10, function(err, hash){
    if (err) throw err;
    // Set hash
    newUser.password = hash;
    console.log('Instructor is being saved');
    // Updating both the user and instructor collection
    async.parallel([newUser.save, newInstructor.save], callback);
  });
}