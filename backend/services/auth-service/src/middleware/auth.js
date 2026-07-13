const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  console.log('🔑 Verifying token with secret:', process.env.JWT_SECRET);   // ✅ Log the secret

  try {
    console.log('🔑 [MIDDLEWARE] JWT_SECRET used for verification:', process.env.JWT_SECRET);
console.log('🔑 [MIDDLEWARE] Received token:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log('❌ Verification error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};