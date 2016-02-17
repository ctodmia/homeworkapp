var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config.js');
var User = require('./models/UserSchema.js').user;
var Question = require('./models/QuestionSchema.js').question;
var auth = jwt({secret: config.JWT_TOKEN, userProperty: 'payload'});

module.exports = function(app) {
	app.use(function (error, req, res, next){
	    //Catch json error
	    console.log('this is the err', req.body);
	    next();
	});

	app.all('/*', function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	  next();
	});

	app.post('/signup', function(req, res, next) {
		console.log('this signup req.body', req.body)
		User.findOne({username: req.body.username}, function(err, founduser) {
			if(err) {
				return err;
			}
			if(!founduser) {
				var user = new User();
				user.firstname = req.body.firstname;
				user.lastname = req.body.lastname;
				user.username = req.body.username;
				user.usertype = req.body.usertype;
				user.save(function(err, newuser) {
					if(err) {return err} 

					console.log('this is the new user', newuser);
					return res.json({token: user.generateJWT()})

				});
			}
		})

	});

	app.post('/login', function(req, res, next) {
		var authenticate;
		console.log('login req.body', req.body)
		if(!req.body.username){
		  return res.status(400).json({message: 'Please fill out all fields'});
		}

		User.findOne({username: req.body.username}, function(err, founduser) {
			if(err) {
				return err;
			}
			// if(!founduser) {
			// 	console.log('this is the found login user', founduser);
			// 	return res.status(400).json({message: 'they dont exist'})
			// }
			authenticate = passport.authenticate('local');
			console.log('this is authenticate', authenticate)
			res.json({token: founduser.generateJWT()})

		})


		passport.authenticate('local', function(err, user, info){
		  if(err){ 
		  	return next(err); 
		  }
		  console.log('this is local authenticated user', user)
		  if(user){
		    res.json({token: user.generateJWT()});
		  } 
		  // else {
		  //   return res.status(401).json(info);
		  // }
		})(req, res, next);



	});

	app.get('/getAllUsers', function(req, res) {
		User.find({}, function(err, users) {
			if(err) {
				return err
			};
			res.json(users);
		});
	});

	app.post('/newassignment', auth, function(req, res, next) {
		question = new Question();
		question.user = req.payload.username;
		question.title = req.body.title;
		question.topic = req.body.question;
		question.date = req.body.date;
		question.save(function(err, quest) {
			if(err) {return err}

			console.log('this is the question you saved', quest);
		});
	});

	app.get('/allhomework', function(req, res) {
		Question.find({}, function(err, data) {
			if(err) {
				return err;
			}

			res.json(data);
		});
	});

	app.param('assigned', function(req, res, next, id) {
	  var query = Question.findById(id);

	  query.exec(function (err, topic){
	    if (err) { return next(err); }
	    if (!topic) { return next(new Error('can\'t find post')); }

	    req.assignment = topic;
	    return next();
	  });
	});

	app.get('/individualwork/:assigned', function(req, res) {
		res.json(req.assignment)
	})



};