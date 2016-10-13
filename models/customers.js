'use strict';
module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
    name: {
      type:DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Customer.belongsToMany(models.BurgerSqlze,{through: models.CustomerBurgers});
        // associations can be defined here
      }
    }
  });
  return Customer;
};