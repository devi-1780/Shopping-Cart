const express = require("express");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Create user
router.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Get users
router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Login
router.post("/users/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  user.token = uuid(); // single active session
  await user.save();

  res.json({ token: user.token });
});

module.exports = router;
