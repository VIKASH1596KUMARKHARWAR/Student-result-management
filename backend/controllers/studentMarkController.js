const dbConfig = require('../config/db.config');
const mysql = require('mysql2/promise');

// Set up the MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Endpoint to add multiple subject marks and calculate CGPA
exports.addSubjectMarks = async (req, res) => {
    const subjectMarks = req.body.subjectMarks; // Expecting an array of subject marks
    console.log('Received subject marks:', subjectMarks);

    try {
        // Insert subject marks
        const promises = subjectMarks.map(async ({ student_id, semester, subject_name, marks }) => {
            const [result] = await pool.query(
                'INSERT INTO subject_marks (student_id, semester, subject_name, marks) VALUES (?, ?, ?, ?)',
                [student_id, semester, subject_name, marks]
            );
            console.log('Inserted:', { id: result.insertId, subject_name, marks });
            return { id: result.insertId, subject_name, marks };
        });

        // Execute all promises
        await Promise.all(promises);

        // Calculate CGPA after adding marks
        const { student_id, semester } = subjectMarks[0]; // Use the student_id and semester from the first subject mark
        const cgpa = await calculateAndUpdateCGPA(student_id, semester);

        res.status(201).json({ message: 'Subject marks added successfully and CGPA calculated.', cgpa });
    } catch (error) {
        console.error('Error adding subject marks or calculating CGPA:', error.message);
        res.status(500).json({ message: 'Failed to add subject marks or calculate CGPA.' });
    }
};


const calculateAndUpdateCGPA = async (student_id, semester) => {
    try {
        // Get all marks for the student in the specified semester
        const [marks] = await pool.query(
            'SELECT marks FROM subject_marks WHERE student_id = ? AND semester = ?',
            [student_id, semester]
        );

        if (marks.length === 0) {
            throw new Error('No marks found for this student in the specified semester.');
        }

        console.log('Marks fetched for CGPA calculation:', marks);

        // Calculate CGPA
        const totalMarks = marks.reduce((sum, mark) => sum + mark.marks, 0);
        const cgpa = ((totalMarks / marks.length) / 10).toFixed(2); // Rounds to 2 decimal places

        console.log('Calculated CGPA:', cgpa);

        // Directly insert into the results table
        await pool.query(
            'INSERT INTO result (id, semester, cgpa) VALUES (?, ?, ?)',
            [student_id, semester, cgpa]
        );
        console.log('Inserted new result record for student_id:', student_id, 'and semester:', semester);

        return cgpa; // Return CGPA to use in the response
    } catch (error) {
        console.error('Error calculating CGPA:', error);
        throw error; // Rethrow the error for higher-level handling
    }
};


// Endpoint to trigger CGPA calculation after adding marks (optional, can be removed if integrated in addSubjectMarks)
exports.calculateCGPAAfterAddingMarks = async (req, res) => {
    const { student_id, semester } = req.body;

    try {
        const cgpa = await calculateAndUpdateCGPA(student_id, semester); // Directly call the function
        res.status(200).json({ message: 'CGPA calculated and updated successfully.', cgpa });
    } catch (error) {
        res.status(500).json({ message: 'Failed to calculate CGPA.', error: error.message });
    }
};
