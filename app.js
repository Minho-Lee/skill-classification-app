'use strict';

let fs = require('fs');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var cfenv = require('cfenv');

var mongoose = require('mongoose');

var models = require('./models/models.js');
var IndividualEmployee = models.individualEmployeeModel;
var AggEmployee = models.aggEmployeeModel;
var totalEmployees = 0;

mongoose.connect('mongodb://sssaini1:sssaini1@ds239439.mlab.com:39439/skill-classification');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
	res.render('index.ejs');
});

app.get('/depth1', function(req, res) {
	var query = IndividualEmployee.find({

	}, function(err, doc) {});

	var query2 = AggEmployee.find({
		"id": "0"
	}, {}, function(err, doc2) {});

	query.then(function(doc) {
		query2.then(function(doc2) {
			if (doc == null || !doc) {
				res.send("Records do not exist.")
			} else {
				res.render('visualize1.ejs', { "employeeData": doc, "totalEmployees": doc2[0].totalEmployees });
			}
		});
	});
});

app.get('/depth2', function(req, res) {
	var query = IndividualEmployee.find({

	}, function(err, doc) {});

	var query2 = AggEmployee.find({
		"id": "0"
	}, {}, function(err, doc2) {});

	query.then(function(doc) {
		query2.then(function(doc2) {
			if (doc == null || !doc) {
				res.send("Records do not exist.")
			} else {
				res.render('visualize4.ejs', { "employeeData": doc, "totalEmployees": doc2[0].totalEmployees });
			}
		});
	});
});

app.get('/depth4', function(req, res) {
	var query = IndividualEmployee.find({

	}, function(err, doc) {});

	var query2 = AggEmployee.find({
		"id": "0"
	}, {}, function(err, doc2) {});

	query.then(function(doc) {
		query2.then(function(doc2) {
			if (doc == null || !doc) {
				res.send("Records do not exist.")
			} else {
				res.render('visualize5.ejs', { "employeeData": doc, "totalEmployees": doc2[0].totalEmployees });
			}
		});
	});
});

app.post('/submitskills', function(req, res) {
	console.log(req.body);
	var i1 = new IndividualEmployee({ id: '0', 'values': req.body });
	i1.save(function(err) {
		if (err) throw err;
		console.log('User saved successfully!');
	});



	var query = AggEmployee.findOne({
		"id": "0"
	}, {}, function(err, doc) {});

	query.then(function(doc) {
		console.log("doc " + doc);
		if (doc == null || !doc) {
			var a1 = new AggEmployee({ id: '0', 'totalEmployees': "1", 'values': req.body });
			a1.save(function(err) {
				if (err) throw err;
				console.log('agg saved successfully!');
			});

		} else {
			doc.totalEmployees = parseInt(doc.totalEmployees) + 1;
			for (var i = 0; i < doc.values.length; i++) {

				var finalResult = [];
				for (var i = 0; i < doc.values.length; i++) {

					// console.log("1: " + doc.values[i].skill_name);
					var a = doc.values[i].skill_name;
					// console.log("2: " + doc.values[i].skill_level);
					var b = doc.values[i].skill_level;

					// console.log("3: " + req.body[i].skill_name);
					var c = req.body[i].skill_level;
					// console.log("4: " + req.body[i].skill_level);

					var d = [];
					finalResult.push({ "skill_name": doc.values[i].skill_name, "skill_level": parseInt(b) + parseInt(c) });
				}

			}
			totalEmployees = doc.totalEmployees;
			doc.values = finalResult;


			doc.save(function(err) {
				if (err)
					console.log('error')
				else
					console.log('success')
			});
		}
	});

	res.send('index.ejs');
});


var appEnv = cfenv.getAppEnv();
// console.log(appEnv);
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
	console.log("server starting on " + appEnv.url);
});