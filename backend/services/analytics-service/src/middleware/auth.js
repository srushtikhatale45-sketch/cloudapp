const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('🔑 [ANALYTICS] Auth header:', authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ Missing or malformed Authorization header');
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  console.log('🔑 [ANALYTICS] Token (first 20 chars):', token.substring(0, 20));
  console.log('🔑 [ANALYTICS] Secret used for verification:', process.env.JWT_SECRET || 'hardcode_me (if used)');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hardcode_me');
    console.log('✅ Token verified:', decoded);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log('❌ Verification error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};