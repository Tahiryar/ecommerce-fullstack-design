const express = require("express");
const router = express.Router();
const {
  orders,
  createOrder,
  updateOrder,
  orderView,
  updatePics,
} = require("../controllers/order.controller.js");

router.get("/orders", orders);
router.post("/createOrder", createOrder);
router.put("/updateOrder/:orderId", updateOrder);
router.get("/vieworder/:orderId", orderView);
router.put("/updatepics/:Id", updatePics);

module.exports = router;
