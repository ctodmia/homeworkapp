var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

var userSchema = new Schema({
	firstname: String, 
	lastname: String,
	username: String,
	usertype: String,
	topics: [{type: Schema.ObjectId, ref: 'Question'}]
});

var User = mongoose.model("User", userSchema);

module.exports = {
  user: User
};