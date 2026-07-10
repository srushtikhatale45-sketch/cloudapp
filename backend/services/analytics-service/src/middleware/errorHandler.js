module.exports = (err, req, res, next) => {
  console.error('❌ Error:', err.stack);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ error: 'Something went wrong' });
};