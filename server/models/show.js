'use strict';
module.exports = (sequelize, DataTypes) => {
  var show = sequelize.define('show', {
    date: DataTypes.STRING,
    venue: DataTypes.STRING,
    city: DataTypes.STRING,
    link: DataTypes.STRING,
    rsvp: DataTypes.INTEGER
  }, {});
  show.associate = function(models) {
    // associations can be defined here
  };
  return show;
};