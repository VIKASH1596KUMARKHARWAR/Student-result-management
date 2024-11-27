const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

// Create a MySQL connection using the config from db.config.js
const db = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// Example query function
const Student = {
  getAll: (callback) => {
    db.query('SELECT * FROM students', (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  },
  // Add more database functions here...
};

module.exports = Student;
