// This code was taken from the cats app and modified
// require express and string npm packages
// and burger.js links to the orm
var express = require('express');
var router = express.Router();
// var burger = require('../models/burger.js');
var BurgerSqlze=require('../models')['BurgerSqlze'];
var string = require('string');

// redirects host '/' entry to '/burgers'
router.get('/', function (req, res) {
	res.redirect('/burgers');
});

// on host '/burgers' load, accesses burger.all function
// which returns all rows of the 'burgers' table
router.get('/burgers', function (req, res) {
	var renderObj =[];
	BurgerSqlze.findAll({
		where:{}
	}).then(function(result){
		for (var i=0;i<result.length;i++){
			var RowDataPacket=result[i].dataValues;
			var lastEat=RowDataPacket.updatedAt;
			var firstEat=RowDataPacket.createdAt;
			RowDataPacket.updatedAt=string(lastEat).left(16).s;
			RowDataPacket.createdAt=string(firstEat).left(16).s;
			renderObj.push(RowDataPacket);
		}
		var passObj={burgers:renderObj};
		res.render('index', passObj);
	});
	// burger.all(function (data) {
	// 	// hbsObject holds burgers data for rendering
	// 	var hbsObject = { burgers: data };
	// 	// loop thru object and truncate first entry timestamp
	// 	// and 'last eaten' timestamp
	// 	for (var i=0;i<data.length;i++){
	// 		var lastEat=hbsObject.burgers[i].tslast;
	// 		var firstEat=hbsObject.burgers[i].tsinit;
	// 		hbsObject.burgers[i].tslast=string(lastEat).left(16).s;
	// 		hbsObject.burgers[i].tsinit=string(firstEat).left(16).s;
	// 	}
	// 	// render hbsObject to the host using the 'index.handlebars' template
	// 	res.render('index', hbsObject);
	// });
});

// post new row to 'burgers' table 
router.post('/burgers/create', function (req, res) {
	// var newburg=req.body;
	var postburg=req.body;
	postburg.eaten=false;
	BurgerSqlze.create(postburg).then(function(){res.redirect('/burgers')});
	// use 'burger' connection to orm to access database to create a new entry
	// give the name (req.body.name), and set it's value to 'false'- which means not eaten
	// burger.create(['name', 'eaten'], [req.body.name, false], function () {
	// 	//redirect to the main display page
	// 	res.redirect('/burgers');
	// });
});

// update information in a row in the 'burgers' table
router.post('/burgers/update/:id', function (req, res) {
	BurgerSqlze.findOne({
		where: {
			id:req.params.id
		}
	}).then(function(result){
		result.updateAttributes({
		eaten:req.body.eaten
		}).then(res.redirect('/burgers'));
	});

// 	// set up the identifier for the row
// 	var identifier = 'id = ' + req.params.id;
// 	// update the entry using the 'burger' connection to the orm
// 	burger.update({ eaten: req.body.eaten }, identifier, function () {
// 		// redirect to the main display page
// 		res.redirect('/burgers');
// 	});
});

// // clear all entries in the 'burgers' table
router.post('/burgers/delete/', function (req, res) {
	// access the orm thru the 'burger' object
	BurgerSqlze.destroy({
		truncate:true
	}).then(function(result){
		res.redirect('/burgers');
	});
	// 	console.log("AFter the delete is done "+result);
	// 	BurgerSqlze.updateAttributes({
	// 		autoIncrementID:1
	// 	}).then(res.redirect('/burgers'));
	// });
});


module.exports = router;
