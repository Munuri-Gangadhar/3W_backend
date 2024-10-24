const express = require('express');
const { adminLogin, verifyAdmin } = require('../controllers/adminController');
const { getUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/login', adminLogin);

router.get('/dashboard', verifyAdmin, getUsers);

module.exports = router;
