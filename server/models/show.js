'use strict';
module.exports = (sequelize, DataTypes) => {
  var show = sequelize.define('show', {
    date: DataTypes.STRING,
    venue: DataTypes.STRING,
    city: DataTypes.STRING,
    link: DataTypes.STRING
  }, {});
  show.associate = function(models) {
    // associations can be defined here
  };
  return show;
};