const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  sequelize.define("genre", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
