const Sequelize = require("sequelize");

const sequelize = new Sequelize("book-store", "root", "concoc221992", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
