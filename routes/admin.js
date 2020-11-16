const express = require("express");
const adminController = require("../controller/admin");
const { route } = require("./shop");

const router = express.Router();

router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

router.get("/product-list", adminController.getProducts);

router.get("/edit-product/:id", adminController.getEditProduct);

router.post("/edit-product/", adminController.postEditProduct);

router.post("/delete-product/", adminController.postDeleteProduct);

module.exports = router;
