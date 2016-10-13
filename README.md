# burger
node.js Burger sequelized app
npm dependencies in package.json:
	body-parser
	express
	express-handlebars
	mysql
	string

entry point: server.js
Runs locally on port 8080, local mysql db:burger_db
Runs on Heroku using jawsdb: o8tyedykm3ewftjj
Heroku deployment: http://fierce-cove-28382.herokuapp.com/burgers

tables used:
BurgerSqlze - holds burger names
Customers - holds names of customers
CustomerBurgers - association table which holds all customer/burger data

These tables must exist for the app to run - can be created using the schema provided 
in the 'db' folder