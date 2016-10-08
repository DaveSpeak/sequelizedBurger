// main server file - entry point into the app
// require 'express', 'body-parser', and 'method-override' npm packages
var express = require('express');
var bodyParser = require('body-parser');
// var methodOverride = require('method-override');
// set var 'app' to express function

// Serve static content for the app from the "public" directory in the application directory.

var BurgerSqlze=require('./models')['BurgerSqlze'];
console.log(BurgerSqlze);
BurgerSqlze.sync();
var app = express();
var PORT = process.env.PORT || 3306;
app.use(express.static(process.cwd() + '/public'));

// use body parser to parse urlencoded objects only
// creates a new 'body' object with has key:value
// pair which can be either a string or array (extended: false sets this condition)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// static directory
app.use(express.static('app/public'));
// allow use of override to change methods:
// post allows ?_method=DELETE and ?_method=UPDATE
// app.use(methodOverride('_method'));
// require 'express-handlebars'
var exphbs = require('express-handlebars');
// defines default layout in /views/layouts/main.handlebars
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
// sets view engine to be 'handlebars'
app.set('view engine', 'handlebars');
// require controller functions in burgers_controller.js
var routes = require('./controllers/burgers_controller.js');
// require('./controllers/burgers_controller.js');
app.use('/', routes);
// set up the port and begin listening
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
});
