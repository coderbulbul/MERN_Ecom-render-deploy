// Import dependencies
const express = require("express");

const {
  createOrder,
  capturePayment,
  getOrderByUser,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getOrderByUser);
router.get("/details/:id", getOrderDetails);

module.exports = router;
