var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var mongodbUri = 'mongodb://test:test@ds011288.mongolab.com:11288/quickhomework'
mongoose.connect(mongodbUri)

db.on('error', function(err){
  console.log('connection error', err);
});

db.once('open', function(){
  console.log('connect to database');
});

var questionSchema = new Schema({
	user: String,
	title: String, 
	topic: String,
	date: String,
	responses: []
});

var Question = mongoose.model("Question", questionSchema);

module.exports = {
  question: Question
};