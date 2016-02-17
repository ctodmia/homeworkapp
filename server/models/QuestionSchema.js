var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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