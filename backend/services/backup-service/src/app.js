const express = require("express");
const cors = require("cors");
const backupRoutes = require("./routes/backupRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/backup", backupRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server Error", error: err.message });
});

module.exports = app;
