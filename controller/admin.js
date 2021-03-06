const Product = require("../models/products");
const { ObjectId } = require("mongodb");
const { validationResult } = require("express-validator/check");
const fileHelper = require("../util/file");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, price, description } = req.body;
  const image = req.file;
  const errors = validationResult(req);
  const imageUrl = image.path;
  const product = new Product({
    title,
    price,
    description,
    userId: req.user,
    imageUrl,
  });

  if (!image) {
    return res.status(422).render("admin/edit-product", {
      product,
      pageTitle: "Add product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      errorMessage: "Attached file is an image",
      validationErrors: errors.array(),
    });
  }

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      product,
      pageTitle: "Add product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      errorMessage: errors.array()[0].msg,
      validationErrors: [],
    });
  }
  product
    .save()
    .then((result) => {
      console.log("Create Product");
      res.redirect("/");
    })
    .catch((err) => {
      // return res.status(500).render("admin/edit-product", {
      //   product,
      //   pageTitle: "Add product",
      //   path: "/admin/add-product",
      //   editing: false,
      //   hasError: true,
      //   errorMessage: "Database operation failed , please try again.",
      //   validationErrors: [],
      // });
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.id;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        product,
        pageTitle: "Edit product",
        path: "/admin/edit-product",
        editing: editMode,
        hasError: false,
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const { id, title, imageUrl, price, description } = req.body;
  const image = req.file;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      hasError: true,
      product: {
        title,
        price,
        description,
        _id: id,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  Product.findById(id)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }
      product.price = price;
      product.title = title;
      if (image) {
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl = "/" + image.path;
      }
      product.description = description;
      return product.save();
    })
    .then((result) => {
      console.log("Update product");
      res.redirect("/admin/product-list");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    // .select("title price -_id")
    // .populate("userId", "name")
    .then((products) => {
      res.render("admin/product-list", {
        prods: products,
        pageTitle: "Admin product",
        path: "/admin/product-list",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .then((product) => {
      if (!product) {
        return next(new Error("product not found"));
      }
      fileHelper.deleteFile(product.imageUrl);
      return Product.deleteOne({ _id: id, userId: req.user._id });
    })
    .then((result) => {
      console.log("Destroyed product");
      res.status(200).json({ message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Deleting product failed" });
    });
};
