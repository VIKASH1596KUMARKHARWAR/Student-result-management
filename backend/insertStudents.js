const db = require('./config/db.config.js');
const students = [ /* your student data here */];

students.forEach(student => {
    db.query('SELECT * FROM student WHERE id = ?', [student.id], (err, results) => {
        if (err) {
            console.error(`Error checking student ${student.name}:`, err.message);
            return;
        }
        if (results.length === 0) {
            db.query('INSERT INTO student (id, name, batch, gender, department, phone, email, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [student.id, student.name, student.batch, student.gender, student.department, student.phone, student.email, student.status],
                (err, result) => {
                    if (err) {
                        console.error(`Error inserting student ${student.name}:`, err.message);
                    } else {
                        console.log(`Inserted student ${student.name} with ID ${result.insertId}`);
                    }
                });
        } else {
            console.log(`Student with ID ${student.id} already exists. Skipping.`);
        }
    });
});
