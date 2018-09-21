'use strict';
module.exports = (sequelize, DataTypes) => {
  var itemsTransactions = sequelize.define('itemsTransactions', {
    itemId: DataTypes.INTEGER,
    transactionId: DataTypes.INTEGER
  }, {});
  itemsTransactions.associate = function(models) {
    // associations can be defined here
  };
  return itemsTransactions;
};