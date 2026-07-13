const { Pool } = require('pg');
const logger = require('../logger/winston');

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in environment variables.');
  console.error('   Please set it in your .env file.');
  // process.exit(1); // or keep running but will fail on queries
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});

pool.on('error', (err) => {
  console.error('❌ Pool error:', err.message);
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Database connection failed:');
    console.error('  - Message:', err.message);
    console.error('  - Code:', err.code);
    console.error('  - Detail:', err.detail);
    console.error('  - Hint:', err.hint);
    // Do not crash the app – just log
  } else {
    console.log('✅ Database connected successfully');
    release();
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};