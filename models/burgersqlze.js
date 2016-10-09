'use strict';
module.exports = function(sequelize, DataTypes) {
  var BurgerSqlze = sequelize.define('BurgerSqlze', {
    name: DataTypes.STRING,
    eaten: {type:DataTypes.BOOLEAN, defaultValue:false}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BurgerSqlze;
};