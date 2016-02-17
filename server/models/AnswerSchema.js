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

var answerSchema = new Schema({
	_creator: {type: Schema.ObjectId, ref: 'User'},
	response: String,
	topic: {type: Schema.ObjectId, ref: 'Question'}
});

var Answer = mongoose.model("Answer", answerSchema);

module.exports = {
  answer: Answer
};