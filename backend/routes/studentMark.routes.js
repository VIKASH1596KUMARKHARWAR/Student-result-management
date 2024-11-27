const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/studentMarkController'); // Adjust the path as needed

// Endpoint to add multiple subject marks
router.post('/add-subject-marks', subjectController.addSubjectMarks);

// Endpoint to calculate CGPA after adding marks
router.post('/calculate-cgpa', subjectController.calculateCGPAAfterAddingMarks);

module.exports = router;
