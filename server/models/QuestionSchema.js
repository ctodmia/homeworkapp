var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

var questionSchema = new Schema({
	_pupil: {type: Schema.ObjectId, ref: 'User'},
	title: String, 
	topic: String,
	date: String,
	answer: []
});

var Question = mongoose.model("Question", questionSchema);

module.exports = {
  question: Question

};