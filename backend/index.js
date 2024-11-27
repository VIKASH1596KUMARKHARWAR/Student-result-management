// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Optional: for parsing JSON bodies
const studentRoutes = require('./routes/student.routes');
const resultsRoutes = require('./routes/result.routes');
const studentMarkRoutes = require('./routes/studentMark.routes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config({ path: './.env' });
const mysql = require('mysql2/promise'); // Use mysql2 with promises

// Create an Express application
const app = express();

app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

pool.getConnection()
    .then(connection => {
        console.log('Connected to the database.');
        connection.release(); 
    })
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1); 
    });

app.use('/api/students', studentRoutes);
app.use('/api/results', resultsRoutes);
app.use('/api/subject', studentMarkRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
