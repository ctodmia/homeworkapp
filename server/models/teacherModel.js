var mongoose = require('mongoose');
var mongodbUri = require('../config.js')
var Schema = mongoose.Schema;
mongoose.connect(mongodbUri.MONGO_URI)
var db = mongoose.connection;

db.on('error', function(err){
  console.log('connection error', err);
});

db.once('open', function(){
  console.log('connect to database');
});


var teacherSchema = new Schema({
 username: String,
 itemname: String,
 picture: String,
 description: String,
 price: Number,
 buylink: String,
 likes: Number 
});

var Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = {
  teacher: Teacher

};
