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
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    return BurgerSqlze.destroy({where:{name: [
        "Cheesburger",
        "Double Cheesburger",
        "Triple Cheesburger",
        "Quadruple Cheesburger",
        "Quintuple Cheesburger"
        ]}})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
