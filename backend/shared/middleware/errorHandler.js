const logger = require('../logger/winston');

module.exports = (err, req, res, next) => {
  logger.error(err.stack);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'Something went wrong' });
};