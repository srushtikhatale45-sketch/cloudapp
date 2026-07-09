// Global error handler for uncaught exceptions and DB errors
module.exports = (err, req, res, next) => {
  console.error('❌ Error:', err.stack);

  // If headers already sent, delegate to default handler
  if (res.headersSent) {
    return next(err);
  }

  // Handle known error types
  if (err.code === '23505') { // PostgreSQL unique violation
    return res.status(409).json({ error: 'Duplicate entry' });
  }

  // Default internal server error
  res.status(500).json({ error: 'Something went wrong' });
};