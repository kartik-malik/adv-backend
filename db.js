const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  `${process.env.database}`,
  `${process.env.username}`,
  `${process.env.password}`,
  {
    dialect: "mysql",
    host: `${process.env.host}`,
    port: 3306,
  }
);
module.exports = sequelize;
