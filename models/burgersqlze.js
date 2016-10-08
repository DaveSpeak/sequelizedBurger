'use strict';
module.exports = function(sequelize, DataTypes) {
  var BurgerSqlze = sequelize.define('BurgerSqlze', {
    name: DataTypes.STRING,
    eaten: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BurgerSqlze;
};