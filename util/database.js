const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "book-store",
  password: "concoc221992",
});

module.exports = pool.promise();
