'use strict';
var BurgerSqlze=require('../models')['BurgerSqlze'];

module.exports = {
  up: function (queryInterface, Sequelize) {
    return BurgerSqlze.bulkCreate([
      {name:'Cheesburger'},
      {name:'Double Cheesburger'},
      {name:'Triple Cheesburger'},
      {name:'Quadruple Cheesburger'},
      {name:'Quintuple Cheesburger'}
    ])
  },

  down: function (queryInterface, Sequelize) {
    return BurgerSqlze.destroy({where:{name: [
        "Cheesburger",
        "Double Cheesburger",
        "Triple Cheesburger",
        "Quadruple Cheesburger",
        "Quintuple Cheesburger"
        ]}})
  }
};
