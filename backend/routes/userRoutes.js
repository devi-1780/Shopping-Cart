// const express = require("express");
// const { v4: uuid } = require("uuid");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// const router = express.Router();

// // Create user
// router.post("/users", async (req, res) => {
//   const user = await User.create(req.body);
//   res.json(user);
// });

// // Get users
// router.get("/users", async (req, res) => {
//   const users = await User.findAll();
//   res.json(users);
// });

// // Login
// router.post("/users", async (req, res) => {
//   const { username, password } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     username,
//     password: hashedPassword,
//   });

//   res.json(user);
// });

// module.exports = router;
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Register
router.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPassword,
  });

  res.json({ message: "User created", userId: user._id });
});

// Login
router.post("/users/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send("Invalid username/password");

  if (user.token)
    return res.status(403).send("Already logged in on another device");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).send("Invalid username/password");

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  user.token = token;
  await user.save();

  res.json({ token });
});

// Logout
router.post("/users/logout", auth, async (req, res) => {
  req.user.token = null;
  await req.user.save();
  res.send("Logged out");
});

// Get all users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
