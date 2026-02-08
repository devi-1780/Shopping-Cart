const express = require("express");
const cors = require("cors");
const sequelize = require("./database");

// routes
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// register routes
app.use(userRoutes);
app.use(itemRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

// start server
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
