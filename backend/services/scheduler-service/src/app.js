const express = require("express");
const cors = require("cors");
const schedulerRoutes = require("./routes/schedulerRoutes");

const app = express();
app.use(cors());
app.use("/api/scheduler", schedulerRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server Error", error: err.message });
});

module.exports = app;
