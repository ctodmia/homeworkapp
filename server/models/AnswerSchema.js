var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

var answerSchema = new Schema({
	_creator: {type: Schema.ObjectId, ref: 'User'},
	response: String
});

var Answer = mongoose.model("Answer", answerSchema);

module.exports = {
  answer: Answer

};