const express = require('express');
const User = require('../models/userModel');
const { generateToken } = require('../utils/generateToken');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = generateToken({ username });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.get('/submissions', async (req, res) => {
  const submissions = await User.find({});
  res.json(submissions);
});

module.exports = router;
