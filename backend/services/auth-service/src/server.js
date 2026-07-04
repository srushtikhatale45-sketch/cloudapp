require("dotenv").config();

const app = require("./app");
const { connectDB, sequelize } = require("./config/database");
const User = require("./models/User");

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();

  // create tables in dev
  await sequelize.sync({ alter: true });

  app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
  });
};

start();