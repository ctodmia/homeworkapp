var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
	_creator: {type: Schema.ObjectId, ref: 'User'},
	response: String,
	topic: {type: Schema.ObjectId, ref: 'Question'}
});

var Answer = mongoose.model("Answer", answerSchema);

module.exports = {
  answer: Answer
};