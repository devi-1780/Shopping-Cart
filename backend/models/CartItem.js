const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const CartItem = sequelize.define("CartItem", {
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = CartItem;
