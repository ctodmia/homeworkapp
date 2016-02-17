var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config.js');
var User = require('./models/UserSchema.js').user;
var Question = require('./models/QuestionSchema.js').question;
var Answer = require('./models/AnswerSchema.js').answer;
var auth = jwt({secret: config.JWT_TOKEN, userProperty: 'payload'});

module.exports = function(app) {
	app.use(function (error, req, res, next){
	    next();
	});

	app.all('/*', function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	  next();
	});

	app.post('/signup', function(req, res, next) {
		
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
					if(err) {
						return err;
					} 
					return res.json({token: user.generateJWT()});
				});
			}
		});

	});

	app.post('/login', function(req, res, next) {
		
		var authenticate;
		
		if(!req.body.username){
		  return res.status(400).json({message: 'Please fill out all fields'});
		}

		User.findOne({username: req.body.username}, function(err, founduser) {
			if(err) {
				return err;
			}
			if(!founduser) {
				console.log('this is the found login user', founduser);
				return res.status(400).json({message: 'they dont exist'});
			}
			authenticate = passport.authenticate('local');
			res.json({token: founduser.generateJWT()});
		});

	});

	app.get('/getAllUsers', function(req, res) {
		
		User.find({}, function(err, users) {
			if(err) {
				return err;
			};
			res.json(users);
		});

	});

	app.post('/newassignment', function(req, res, next) {
		
		question = new Question();
		question.user = req.body.username;
		question.title = req.body.title;
		question.topic = req.body.question;
		question.date = req.body.date;
		question.save(function(err, quest) {
			if(err) {
				return err;
			}
			res.json(quest);
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
			if (err) { 
				return next(err); 
			}
			if (!topic) { 
				return next(new Error('can\'t find post')); 
			}
			req.assignment = topic;
			return next();
		});

	});

	app.get('/individualwork/:assigned', function(req, res) {
		res.json(req.assignment);
	})

	app.post('/individualwork/:assigned/answer', function(req, res) {

		User.findOne({username: req.body.author}, function(err, foundUser) {
			if(err) {
				return err;
			}
			if(!foundUser) {
				console.log('this is the found login user', foundUser);
				return res.status(400).json({message: 'they dont exist'})
			}
			var answer = new Answer();
			answer._creator = foundUser._id;
			answer.response = req.body.body;
			answer.topic = req.assignment._id;
			answer.save(function(err, data) {
				if(err) {
					return err;
				}
				Question.findOne({_id: req.assignment._id}, function(err, topic) {
					if(err) {
						return err;
					}
					if(!topic) {
						return res.status(400).json({message: 'they dont exist'})
					}
					topic.responses.push(data);
					topic.save(function(err, savedtopic) {
						if(err) {
							return err;
						}
					});
				});
				res.json(data);
			})

			Answer.findById(answer._id).populate('_creator').exec(function(err, answer) {
				if(err) {
					return err;
				}
			});	
		});

	});

	app.param('student', function(req, res, next, id) {
	  
		var query = User.findById(id)

		query.exec(function (err, user){
			if (err) { 
				return next(err); 
			}
			if (!user) { 
				return next(new Error('can\'t find post')); 
			}
			req.user = user;
			return next();
		});

	});

	app.get('/individualstudent/:student', function(req, res) {
		
		Question.find({}, function(err, question) {
			if(err) {
				return err;
			}
			res.json({user : req.user, questions : question});
		});

	});

};