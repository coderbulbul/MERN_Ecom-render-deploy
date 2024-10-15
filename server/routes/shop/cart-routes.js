// import dependencies
const express = require("express");
const {
  addToCart,
  fetchCartItems,
  updateCartItemQuantity,
  deleteCartItem,
} = require("../../controllers/shop/cart-controlller");

// create route
const router = express.Router();

// cart routes
router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQuantity);
router.delete("/:userId/:productId", deleteCartItem);

// export routes
module.exports = router;
