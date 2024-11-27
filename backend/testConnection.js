const mysql = require('mysql2');
require('dotenv').config();



const db = mysql.createConnection({
  host: '127.0.0.1', // Use 127.0.0.1
  user: 'newuser',
  password: 'StrongPassword123!',
  database: 'MyProjectDBsql',
  connectTimeout: 10000 // Increase timeout to 10 seconds
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to the database.');
//   console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASS:", process.env.DB_PASS);
// console.log("DB_NAME:", process.env.DB_NAME);
console.log("Environment Variables:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_NAME:", process.env.DB_NAME);

  db.end(); // Close the connection
});
