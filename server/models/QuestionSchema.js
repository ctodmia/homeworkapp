var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

db.on('error', function(err){
  console.log('connection error', err);
});

db.once('open', function(){
  console.log('connect');
});

var questionSchema = new Schema({
	_pupil: {type: Schema.ObjectId, ref: 'Student'},
	title: String, 
	topic: String,
	date: String,
	answer: []
});

var Question = mongoose.model("Question", questionSchema);

module.exports = {
  question: Question

};