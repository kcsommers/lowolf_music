'use strict';
module.exports = (sequelize, DataTypes) => {
  var subscriber = sequelize.define('subscriber', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  subscriber.associate = function(models) {
    // associations can be defined here
  };
  return subscriber;
};