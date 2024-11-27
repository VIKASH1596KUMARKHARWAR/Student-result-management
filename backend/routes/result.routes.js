// routes/resultsRoutes.js

const express = require('express');
const router = express.Router();
const resultsController = require('../controllers/result.controller');


router.get('/', resultsController.getAllResults);
// Get results for a specific student by ID

router.get('/:id', resultsController.getResultsByStudentId);


router.post('/', resultsController.addResult);

router.put('/:id/:semester', resultsController.updateResult);

router.delete('/:id/:semester', resultsController.deleteResult);

module.exports = router;
