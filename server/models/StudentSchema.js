var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

db.on('error', function(err){
  console.log('connection error', err);
});

db.once('open', function(){
  console.log('connect');
});

var studentSchema = new Schema({
	username: String,
	topics: [{type: Schema.ObjectId, ref: 'Question'}]
});

var Student = mongoose.model("Student", studentSchema);

module.exports = {
  student: Student
};