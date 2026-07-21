const { getSummary } = require("../services/statsService");
const { getDailyTrend } = require("../services/trendService");

const getStats = async (req, res) => {
  try {
    const summary = await getSummary();
    return res.status(200).json(summary);
  } catch (err) {
    console.error("Analytics stats error:", err.message);
    return res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
};

const getTrends = async (req, res) => {
  try {
    const trend = await getDailyTrend();
    return res.status(200).json(trend);
  } catch (err) {
    console.error("Analytics trend error:", err.message);
    return res.status(500).json({ message: "Failed to fetch trends", error: err.message });
  }
};

module.exports = { getStats, getTrends };
