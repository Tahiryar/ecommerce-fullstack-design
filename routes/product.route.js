const express = require("express");
const router = express.Router();
const {
  createProduct,
  products,
  deleteProduct,
  updateProductStatus,
  productView,
  updateProduct,
  updatePics,
} = require("../controllers/product.controller.js");

router.get("/productdetails", products);
router.post("/store_product", createProduct);
router.put("/updateProduct/:id", updateProduct);
router.get("/viewProduct/:id", productView);
router.delete("/deleteProduct/:productId", deleteProduct);
router.put("/updateProductStatus", updateProductStatus);
router.put("/updateProductpics/:Id", updatePics);

module.exports = router;
