const jwt = require('jsonwebtoken');

/**
 * Authentication middleware – verifies JWT token from Authorization header.
 * Attaches userId to req.userId on success.
 */
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // attach user ID
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};