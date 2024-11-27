const express = require('express');
const router = express.Router();
const dbConfig = require('../config/db.config.js');
const studentController = require('../controllers/student.controller');


// Define routes for students
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentController.addStudent);
router.put('/:id', studentController.updateStudent); 
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
