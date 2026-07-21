require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./config/database");

const PORT = process.env.PORT || 3007;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Analytics Service running on port ${PORT}`);
  });
};

start();
