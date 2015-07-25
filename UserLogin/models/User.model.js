var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String,
    bcrypt: true,
    required: true
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  profileimage: {
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema);

exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) return callback(err);
    callback(null, isMatch);
  });
}

exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

exports.getUserByUsername = function(username, callback) {
  var query = {username: username}
  User.findOne(query, callback);
}

module.exports.createUser = function(newUser, cb) {
  bcrypt.hash(newUser.password, 10, function(err, hash) {
    if (err) throw err;
    // Set hashed pw
    newUser.password = hash;

    console.log('User is being saved');
    // Save user to db
    newUser.save(cb);
  });
}