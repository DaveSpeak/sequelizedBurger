'use strict';
module.exports = function(sequelize, DataTypes) {
  var CustomerBurgers = sequelize.define('CustomerBurgers', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    BurgerSqlzeId: {
      type:DataTypes.INTEGER
    },
    CustomerId: {
      type:DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CustomerBurgers;
};