const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Cart = sequelize.define("Cart", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
  },
});

module.exports = Cart;
