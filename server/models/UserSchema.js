var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var jwt = require('jsonwebtoken');
var config = require('../config.js');

var userSchema = new Schema({
	firstname: String, 
	lastname: String,
	username: String,
	usertype: String,
	topics: [{type: Schema.ObjectId, ref: 'Question'}]
});

userSchema.methods.generateJWT = function() {

  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
  	{
	    _id: this._id,
	    username: this.username,
	    exp: parseInt(exp.getTime() / 1000),
  	}, 
  	config.JWT_TOKEN);
};

var User = mongoose.model("User", userSchema);

module.exports = {
  user: User
};