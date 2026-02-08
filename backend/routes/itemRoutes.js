const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

// Create item
router.post("/items", async (req, res) => {
  const item = await Item.create(req.body);
  res.json(item);
});

// Get items
router.get("/items", async (req, res) => {
  const items = await Item.findAll();
  res.json(items);
});

module.exports = router;
