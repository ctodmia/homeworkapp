var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

var questionSchema = new Schema({
	user: String,
	title: String, 
	topic: String,
	date: String,
	answers: [{type: Schema.ObjectId, ref: 'Answer'}]
});

var Question = mongoose.model("Question", questionSchema);

module.exports = {
  question: Question

};