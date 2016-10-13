// require express and string npm packages,
// BurgerSqlze and Customer models
var express = require('express');
var router = express.Router();
var BurgerSqlze=require('../models')['BurgerSqlze'];
var Customer=require('../models')['Customer'];
var string = require('string');
// Global variables: counter - to step thru burger array,
// assocArray - to hold burger/customer associations
var counter=0;
var assocArray=[];

// redirects host '/' entry to '/burgers'
router.get('/', function (req, res) {
	res.redirect('/burgers');
});

// on host '/burgers' load, accesses BurgerSqlze 'findAll'
// to return object with all burgers in the BurgerSqlze table
router.get('/burgers', function (req, res) {
	// object to hold burgers and associated customers
	var renderObj =[];
	// sequelize function to return object with all burgers
	return BurgerSqlze.findAll({
		where:{}
	// process results
	}).then(function(result){
		// reset counter and associativity arrray
		counter=0;
		assocArray=[];
		// if the returned array is empty pass in a dummy object and return
		if (result.length <=0){
			var passObj='';
			return false;
		// if there is data in the array, begin recursion to access all associativity data
		} else {
			// call function 'findAssoc' which executes recursion
			return findAssoc(result)
				// on return truncate date data and push onto array 'renderObj' for rendering
				.then(function (assoc){
						for (var i=0;i<result.length;i++){
							var RowDataPacket=result[i].dataValues;
							var lastEat=RowDataPacket.updatedAt;
							var firstEat=RowDataPacket.createdAt;
							RowDataPacket.updatedAt=string(lastEat).left(16).s;
							RowDataPacket.createdAt=string(firstEat).left(16).s;
							RowDataPacket.lastEatenBy=assoc[i];
							renderObj.push(RowDataPacket);
						}
				});
				return true;
			}
		// pass data object to handlebars index to render the webpage
		}).then (function(){
			var passObj={burgers:renderObj};
			res.render('index', passObj);
		});
	});
// Recursive function to step thru burger array, find associations and return an array
// of customers associated with the id of the burger. This will render the name of the
// last customer to eat the burger when the burger appears in the 'Burgers eaten' 
// section of the website.
function findAssoc(array){
	// if all burgers have been processed, exit recursion
	if (counter<array.length){
		// find burger with the id of 'counter' in the table
		return BurgerSqlze.findOne({where: {id:array[counter].id}})
			.then (function(search){
				// get associated customers (sequelize created command)
				return search.getCustomers()
					.then(function(customers){
						// increment counter, push customer's name to associativity array
						// if the customer name string is empty (user has hit the 'Devour It!'
						// button without entering a name), add "No One" as the last eater
						counter+=1;
						if (customers!=''){
							if (customers[(customers.length-1)].name==''){
								assocArray.push('"No One"');
							} else {
								assocArray.push(customers[(customers.length-1)].name);
							}
						}
						// recursively call the array with the burgers array passed in on
						// initial call
						return findAssoc(array);
					});
			});
	} else {
		// processing done - return the associativity array
		return assocArray;
		
	}
}

// create new burgers row in the BurgerSqlze table 
router.post('/burgers/create', function (req, res) {
	// set the name and the burger as not-eaten
	var postburg=req.body;
	postburg.eaten=false;
			// check if there is already a burger with that name
			return BurgerSqlze.findOne({
				where: {
					name:postburg.name
				}
			// if the burger doesn't exist, create it
			}).then (function(exists){
				if (exists==undefined){
					return BurgerSqlze.create(postburg).then(function(){res.redirect('/burgers')});
				}else {
					// if the bureger does exist - re-render the page.
					res.redirect('/burgers');
				}
			});
});


// change the burger status from 'eaten' to 'not eaten' and vice-versa
router.post('/burgers/update/:id', function (req, res) {
	// find the burger using sequelize
	return BurgerSqlze.findOne({
		where: {
			id:req.params.id
		}
	}).then(function(result){
		// update it with the values passed from the webpage.
		return result.updateAttributes({
		 eaten:req.body.eaten
		}).then(function(){
			// Check if the customer name has already been used
			return Customer.findOne({
				where: {
					name:req.body.customer
				}
			})
		}).then(function(cname){
					// if customer name doesn't exist, create it
					if (cname==undefined){
						return Customer.create({name:req.body.customer})
						.then (function(customer){
							// associate new customer and burger on the 'customerburgers' table:
							return customer.addBurgerSqlze(req.params.id).then(res.redirect('/burgers'));
						}) 
					// associate old customer name with burger on the 'customerburgers' table:
					} else {return cname.addBurgerSqlze(req.params.id).then(res.redirect('/burgers'));}
		});
	});
});
// return burger to the 'Burgers to eat:' side of the webpage
router.post('/burgers/reup/:id', function (req, res) {
	// Find the burger
	return BurgerSqlze.findOne({
		where: {
			id:req.params.id
		}
	}).then(function(result){
		// update the state of the burger from 'eaten' to 'not eaten' - passed from webpage
		return result.updateAttributes({
		eaten:req.body.eaten
		// return the customer object and render the 'index' page
		}).then(function(result){
			 return Customer.findOne({
				where: {
					name:req.body.customer
				}
			})
			}).then(res.redirect('/burgers'));
	});
});

// // clear all entries in the 'BurgerSqlze' table
router.post('/burgers/delete/', function (req, res) {
	// 'destroy' all entries, truncate the dataset and render the page
	BurgerSqlze.destroy({
		truncate:true
	}).then(function(result){
		res.redirect('/burgers');
	});
});


module.exports = router;
