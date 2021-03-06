'use strict';
module.exports = function(sequelize, DataTypes) {
  var BurgerSqlze = sequelize.define('BurgerSqlze', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type:DataTypes.STRING
    },
    eaten: {
      type:DataTypes.BOOLEAN,
       defaultValue:false
     }
  }, {
    classMethods: {
      associate: function(models) {
        BurgerSqlze.belongsToMany(models.Customer,{through: models.CustomerBurgers});
        // associations can be defined here
      }
    }
  });
  return BurgerSqlze;
};