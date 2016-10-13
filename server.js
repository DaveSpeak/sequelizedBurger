// main server file - entry point into the app
// require 'express', 'body-parser' npm packages
var express = require('express');
var bodyParser = require('body-parser');

// require the BurgerSqlze model which contains all info on the burgers
var BurgerSqlze=require('./models')['BurgerSqlze'];
// sync with the database
BurgerSqlze.sync();
// set var 'app' to express function
var app = express();
var PORT = process.env.PORT || 8080;
app.use(express.static(process.cwd() + '/public'));

// use body parser to parse urlencoded objects only
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// static directory
app.use(express.static('app/public'));
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
