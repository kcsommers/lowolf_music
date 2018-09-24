'use strict';
module.exports = (sequelize, DataTypes) => {
  var item = sequelize.define('item', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    imgUrl: DataTypes.STRING
  }, {});
  item.associate = function(models) {
    // associations can be defined here
    models.item.belongsToMany(models.transaction, {through: 'itemsTransactions'})
  };
  return item;
};