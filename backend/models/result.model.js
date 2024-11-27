const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

// Create a MySQL connection using the config from db.config.js
const db = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// example Define the Result model 
const Result = {
  // Function to get all results
  getAll: (callback) => {
    db.query('SELECT * FROM result', (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  },

};

module.exports = Result;
