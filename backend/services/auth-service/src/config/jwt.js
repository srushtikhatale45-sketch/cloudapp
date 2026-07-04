require("dotenv").config();

module.exports = {
  secret: process.env.JWT_SECRET || "default_secret_key",
  expiresIn: "7d",

  // optional helper for token options
  options: {
    expiresIn: "7d"
  }
};