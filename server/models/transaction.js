'use strict';
module.exports = (sequelize, DataTypes) => {
  var transaction = sequelize.define('transaction', {
    buyer: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    fulfilled: DataTypes.BOOLEAN
  }, {});
  transaction.associate = function(models) {
    // associations can be defined here
    models.transaction.belongsToMany(models.item, {through: 'itemsTransactions'})
  };
  return transaction;
};