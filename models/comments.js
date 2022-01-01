const Sequelize = require("sequelize");
const sequelize = require("../db");
const comment = sequelize.define("comment", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = comment;
