const Sequelize = require("sequelize");
const sequelize = require("../db");
const user = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: "email",
  },
  password: {
    type: Sequelize.STRING(2000),
    allowNull: false,
  },
});
module.exports = user;
