const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex(
    (item) => item.productId.toString() === product._id.toString()
  );

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  // check product in cart items exited or not
  if (cartProductIndex >= 0) {
    // update quantity
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    // push new product in cart item
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  // update cart
  this.cart = { items: updatedCartItems };

  return this.save();
};

userSchema.methods.getCart = function () {
  this.cart.items.map((item) => item.productId);
};

userSchema.methods.deleteCartItem = function (id) {
  const updatedCartItems = this.cart.items.filter(
    (item) => item.productId.toString() !== id.toString()
  );
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = model("User", userSchema);
