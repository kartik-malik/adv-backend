const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node1", "sammy", "password", {
  dialect: "mysql",
});
module.exports = sequelize;
