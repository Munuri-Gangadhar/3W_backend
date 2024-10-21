const express = require('express');
const { handleSubmission, saveSubmission } = require('../controllers/userController');

const router = express.Router();

router.post('/submit', handleSubmission, saveSubmission);

module.exports = router;
