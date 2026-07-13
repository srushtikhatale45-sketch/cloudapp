const jwt = require('jsonwebtoken');
const { ERROR_MESSAGES, HTTP_STATUS } = require('../constants');

module.exports = (req, res, next) => {
  console.log('🔥 Auth middleware called for:', req.method, req.url);   // ✅ ADD THIS

  const authHeader = req.headers.authorization;
  console.log('🔑 Authorization header:', authHeader);                 // ✅ ADD THIS

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ Missing or malformed Authorization header');
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: ERROR_MESSAGES.MISSING_TOKEN });
  }

  const token = authHeader.split(' ')[1];
  console.log('🔑 Token (first 20 chars):', token.substring(0, 20));
  console.log('🔑 JWT_SECRET used for verification:', process.env.JWT_SECRET || 'NOT SET');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token verified for user ID:', decoded.userId);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log('❌ Verification error:', err.message);              // ✅ ADD THIS
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: ERROR_MESSAGES.INVALID_TOKEN });
  }
};