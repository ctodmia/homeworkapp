var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var jwt = require('jsonwebtoken');
var config = require('../config.js');
var mongodbUri = 'mongodb://test:test@ds011288.mongolab.com:11288/quickhomework'
mongoose.connect(mongodbUri)

db.on('error', function(err){
  console.log('connection error', err);
});

db.once('open', function(){
  console.log('connect to database');
});

var userSchema = new Schema({
	firstname: String, 
	lastname: String,
	username: String,
	usertype: String,
});

userSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  return jwt.sign(
  	{
	    _id: this._id,
	    username: this.username,
	    exp: parseInt(exp.getTime() / 1000),
  	}, config.JWT_TOKEN);
};

var User = mongoose.model("User", userSchema);

module.exports = {
  user: User
};