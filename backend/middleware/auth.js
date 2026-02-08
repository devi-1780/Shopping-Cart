const User = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token required" });
  }

  const user = await User.findOne({ where: { token } });
  if (!user) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.userId = user.id;
  next();
};
