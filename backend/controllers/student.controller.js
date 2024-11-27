const dbConfig = require('../config/db.config');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
// Establish a connection to the database
// const pool = mysql.createPool(dbConfig);

exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM student');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getStudentById = async (req, res) => {
  const studentId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM student WHERE id = ?', [studentId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: error.message });
  }
};


exports.addStudent = async (req, res) => {
  const { id, name, batch, gender, department, phone, email } = req.body;

  try {
    const query = `
          INSERT INTO student (id, name, batch, gender, department, phone, email)
          VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
    const values = [id, name, batch, gender, department, phone, email];

    const [result] = await pool.query(query, values);
    res.status(201).json({ message: 'Student added successfully', studentId: result.insertId });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Error adding student', error: error.message });
  }
};


exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, batch, gender, department, phone, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE student SET name = ?, batch = ?, gender = ?, department = ?, phone = ?, email = ? WHERE id = ?',
      [name, batch, gender, department, phone, email, id]
    );
    if (result[0].affectedRows > 0) {
      res.send('Student updated successfully');
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    // Perform the delete operation
    const [result] = await pool.query('DELETE FROM student WHERE id = ?', [id]);

    // Check if the student was found and deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Failed to delete student', error: error.message });
  }
};
