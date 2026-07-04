const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Connected (Neon)");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };