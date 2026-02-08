const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

// Create item
router.post("/items", async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }
    const item = await Item.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get items
router.get("/items", async (req, res) => {
  const items = await Item.findAll();
  res.json(items);
});

module.exports = router;
