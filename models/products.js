const Cart = require("./cart");
const db = require("../util/database");
module.exports = class Product {
  constructor(id, title, imgUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, imgUrl, description) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.imgUrl, this.description]
    );
  }

  static delete(id) {}

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  // static getProducts(cb) {
  //   fs.readFile(p, (err, fileContent) => {
  //     const cart = JSON.parse(fileContent);
  //     if (err) {
  //       cb(null);
  //     } else {
  //       cb(cart);
  //     }
  //   });
  // }
};
