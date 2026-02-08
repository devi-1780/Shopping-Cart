const express = require("express");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const auth = require("../middleware/auth");

const router = express.Router();

// Add item to cart
router.post("/carts", auth, async (req, res) => {
  let cart = await Cart.findOne({ where: { userId: req.userId } });

  if (!cart) {
    cart = await Cart.create({ userId: req.userId, status: "active" });
  }

  const { item_id } = req.body;

  const cartItem = await CartItem.create({
    cartId: cart.id,
    itemId: item_id,
  });

  res.json(cartItem);
});

// Get cart items
router.get("/carts", auth, async (req, res) => {
  const cart = await Cart.findOne({ where: { userId: req.userId } });
  if (!cart) return res.json([]);

  const items = await CartItem.findAll({ where: { cartId: cart.id } });
  res.json(items);
});

module.exports = router;
