const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const Users = (module.exports = mongoose.model("Users", UserSchema));

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByEmail = function (email, callback) {
  const query = { email: email };
  Users.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  const query = { _id: id };
  Users.findOne(query, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
    callback(null, isMatch);
  });
};
