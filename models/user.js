const { getDb } = require("../util/database");
const { ObjectId } = require("mongodb");
class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(
      (cp) => cp.productId.toString() === product._id.toString()
    );
    let newQuantity = 1;
    const updatedCartItem = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItem[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItem.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const db = getDb();
    const updatedCart = {
      items: updatedCartItem,
    };
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    const productId = this.cart.items.map((item) => item.productId);

    return db
      .collection("products")
      .find({ _id: { $in: productId } })
      .toArray()
      .then((products) =>
        products.map((p) => ({
          ...p,
          quantity: this.cart.items.find(
            (q) => q.productId.toString() === p._id.toString()
          ).quantity,
        }))
      );
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then((result) => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "user._id": new ObjectId(this._id) })
      .next();
  }

  deleteCartItem(id) {
    const db = getDb();
    const updatedItems = this.cart.items.filter(
      (item) => item.productId.toString() !== id.toString()
    );
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedItems } } }
      );
  }

  static findByPk(id) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new ObjectId(id) });
  }
}
module.exports = User;
