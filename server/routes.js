var Question = require('./models/QuestionSchema.js').question;
var StudentSchema = require('./models/StudentSchema.js').student;

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

	app.post('/newassignment', function(req, res, next) {
		question = new Question();
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