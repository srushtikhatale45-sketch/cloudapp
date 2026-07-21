const { sequelize } = require("../config/database");
const { QueryTypes } = require("sequelize");

const getDailyTrend = async () => {
  const results = await sequelize.query(
    `SELECT DATE("createdAt") as day, COUNT(*) as count, SUM("sizeBytes") as bytes
     FROM backups
     GROUP BY DATE("createdAt")
     ORDER BY day DESC
     LIMIT 30`,
    { type: QueryTypes.SELECT }
  );
  return results;
};

module.exports = { getDailyTrend };
