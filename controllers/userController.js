const multer = require('multer');
const path = require('path');
const User = require('../models/userModel');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/images');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Images only!');
    }
  }
});

const handleSubmission = upload.array('images', 5);
const saveSubmission = async (req, res) => {
  try {
    const { name, socialHandle } = req.body;
    const images = req.files.map(file => `/uploads/images/${file.filename}`);
    const user = new User({ name, socialHandle, images });
    await user.save();
    res.status(201).json({ message: 'Submission successful', user });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { handleSubmission, saveSubmission };
