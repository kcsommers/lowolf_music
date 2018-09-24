'use strict';
module.exports = (sequelize, DataTypes) => {
  var subscriber = sequelize.define('subscriber', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    new: DataTypes.BOOLEAN
  }, {});
  subscriber.associate = function(models) {
    // associations can be defined here
    models.transaction.belongsToMany(models.item, {through: 'itemsTransactions'})
  };
  return subscriber;
};