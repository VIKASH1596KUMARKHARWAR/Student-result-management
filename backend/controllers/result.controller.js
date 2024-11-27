// controllers/resultsController.js

const dbConfig = require('../config/db.config'); // Adjust the path as necessary
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});


exports.getAllResults = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM result');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).send('Server error');
  }
};
// In your controller function
const getStudentResults = (req, res) => {
  const studentId = req.params.id; // Get student ID from request parameters
  Result.getResultsByStudentId(studentId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching results.' });
    }
    res.json(results); // Return the results in the response
  });
};


exports.addResult = async (req, res) => {
  const { id, semester,cgpa } = req.body; // Adjust fields as necessary

  try {
    const query = `
      INSERT INTO result (id, semester,cgpa )
      VALUES (?, ?, ?)
    `;
    const values = [id, semester,cgpa];

    const [result] = await pool.query(query, values);
    res.status(201).json({ message: 'Result added successfully', resultId: result.insertId });
  } catch (error) {
    console.error('Error adding result:', error);
    res.status(500).json({ message: 'Error adding result', error: error.message });
  }
};
exports.updateResult = async (req, res) => {
  const { id,semester } = req.params; // Get semester and ID from the URL parameters
  const { cgpa } = req.body; // Destructure cgpa from the request body

  try {
    // Update the CGPA for the specific semester and student result ID
    const [result] = await pool.query(
      `UPDATE result
       SET cgpa = ?
       WHERE id = ? AND semester = ?`,
      [cgpa, id, semester] // Correct order of parameters
    );

    if (result.affectedRows > 0) {
      res.send('CGPA updated successfully');
    } else {
      res.status(404).send('Result not found or semester mismatch');
    }
  } catch (error) {
    console.error('Error updating CGPA:', error);
    res.status(500).send('Server error');
  }
};


exports.deleteResult = async (req, res) => {
  const { id,semester } = req.params; // Get semester and ID from the URL parameters
 
  try {
    // Perform the delete operation
    const [result] = await pool.query('DELETE FROM result WHERE id = ? AND semester = ?', [id, semester]);

    // Check if the result was found and deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.status(200).json({ message: 'Result deleted successfully' });
  } catch (error) {
    console.error('Error deleting result:', error);
    res.status(500).json({ message: 'Failed to delete result', error: error.message });
  }
};

// Get results for a specific student by ID
exports.getResultsByStudentId = async (req, res) => {
  const studentId = req.params.id; // Get student ID from request parameters

  try {
    const [results] = await pool.query(
      `SELECT semester, cgpa 
       FROM result 
       WHERE id = ?`, 
      [studentId]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: 'No results found for this student.' });
    }

    res.json(results); // Send the results as a JSON response
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};