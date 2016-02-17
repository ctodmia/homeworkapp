var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('./server/models/UserSchema.js').user;
var configPass = require('./server/passport.js');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var activateRoutes = require('./server/routes.js');
var config = require('./server/config.js');

require('./server/models/UserSchema.js');
require('./server/models/QuestionSchema.js')
require('./server/passport.js')
var port = process.env.PORT || 8080;
var uri = config.MONGO_URI;

mongoose.connect(uri);
// var db = mongoose.createConnection('mongodb://test:test@ds011288.mongolab.com:11288/quickhomework')
var db = mongoose.connection;

db.on('error', function(err){
  console.log('connection error', err);
});
db.once('open', function(){
  console.log('Your connecting to your database');
});

app.use(bodyParser.json());
app.use (function (error, req, res, next){
    console.log('this is the err', req.body);
    next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/client/bower_components'));
app.use(passport.initialize());
app.listen(port);
console.log('Meet me at the port...its going down' + port);
activateRoutes(app);
module.exports = app;