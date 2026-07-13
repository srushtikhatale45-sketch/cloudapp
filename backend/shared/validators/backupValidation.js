const Joi = require('joi');

const startBackupSchema = Joi.object({
  folders: Joi.array().items(Joi.string()).min(1).required(),
});

const restoreBackupSchema = Joi.object({
  backupId: Joi.number().integer().positive().required(),
});

module.exports = { startBackupSchema, restoreBackupSchema };