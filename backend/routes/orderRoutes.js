const express = require("express");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Order = require("../models/Order");
const auth = require("../middleware/auth");

const router = express.Router();

// Checkout
router.post("/orders", auth, async (req, res) => {
  const cart = await Cart.findOne({ where: { userId: req.userId } });
  if (!cart) {
    return res.status(400).json({ error: "No cart found" });
  }

  const order = await Order.create({
    userId: req.userId,
    cartId: cart.id,
  });

  await CartItem.destroy({ where: { cartId: cart.id } });
  await Cart.destroy({ where: { id: cart.id } });

  res.json({ order_id: order.id });
});

// Order history
router.get("/orders", auth, async (req, res) => {
  const orders = await Order.findAll({ where: { userId: req.userId } });
  res.json(orders);
});

module.exports = router;
