require('dotenv').config();
console.log('🔑 [AUTH] JWT_SECRET (first 10):', process.env.JWT_SECRET?.substring(0, 10));
const app = require('./app');

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
  console.log(`📊 Analytics service running on port ${PORT}`);
});