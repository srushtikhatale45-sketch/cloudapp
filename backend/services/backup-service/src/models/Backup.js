const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Backup = sequelize.define("Backup", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  originalName: { type: DataTypes.STRING, allowNull: false },
  storageKey: { type: DataTypes.STRING, allowNull: false },
  bucket: { type: DataTypes.STRING, allowNull: false },
  sizeBytes: { type: DataTypes.BIGINT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "completed" },
  isRecurring: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: "backups", timestamps: true });

module.exports = Backup;
