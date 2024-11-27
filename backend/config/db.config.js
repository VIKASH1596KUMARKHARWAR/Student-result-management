const mysql = require('mysql2/promise');
require('dotenv').config();

async function db() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });
    console.log('Connected to the database.');
    return connection;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;  // Re-throw the error to handle it outside
  }
}

module.exports = db;
