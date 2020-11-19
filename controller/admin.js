const Product = require("../models/products");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  req.user
    .createProduct({ title, imageUrl, price, description })
    .then((result) => {
      console.log("Create Product");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.id;
  req.user.getProducts({ where: { id: prodId } }).then((products) => {
    const product = products[0];
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
  const { id, title, imageUrl, price, description } = req.body;
  Product.findByPk(id)
    .then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then((result) => {
      console.log("Update product");
      res.redirect("/admin/product-list");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/product-list", {
        prods: products,
        pageTitle: "Admin product",
        path: "/admin/product-list",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.id;
  req.user
    .getProducts({ where: { id } })
    .then((product) => {
      return product[0].destroy();
    })
    .then((result) => {
      console.log("Destroyed product");
      res.redirect("/admin/product-list");
    })
    .catch((err) => console.log(err));
};
