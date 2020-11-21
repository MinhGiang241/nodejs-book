const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://minhgiang241:concoc221992@cluster0.wmmld.mongodb.net/book?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => console.log(err));
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error("No database found");
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("book-store", "root", "concoc221992", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;
