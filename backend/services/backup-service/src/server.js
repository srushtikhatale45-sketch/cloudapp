require("dotenv").config();
const app = require("./app");
const { connectDB, sequelize } = require("./config/database");

const PORT = process.env.PORT || 3002;

const start = async () => {
  await connectDB();
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => {
    console.log(`Backup Service running on port ${PORT}`);
  });
};

start();
