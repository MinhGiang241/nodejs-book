const express = require("express");
const adminController = require("../controller/admin");
const isAuth = require("../middleware/is-auth");
const { body } = require("express-validator/check");

const router = express.Router();

router.get("/add-product", isAuth, adminController.getAddProduct);

router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    // body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description")
      .isLength({ min: 6, max: 400 })
      .trim()
      .withMessage("description"),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/product-list", isAuth, adminController.getProducts);

router.get("/edit-product/:id", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product/",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 6, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postEditProduct
);
router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
