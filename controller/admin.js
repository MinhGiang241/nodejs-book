const Product = require("../models/products");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imgUrl, price, description } = req.body;
  const product = new Product(null, title, imgUrl, price, description);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.id;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      product,
      pageTitle: "Edit product",
      path: "/admin/edit-product",
      editing: editMode,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const { id, title, imgUrl, price, description } = req.body;
  const updatedProduct = new Product(id, title, imgUrl, price, description);
  updatedProduct.save();
  res.redirect("/admin/product-list");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/product-list", {
      prods: products,
      pageTitle: "Admin product",
      path: "/admin/product-list",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product.delete(id);
  res.redirect("/admin/product-list");
};
