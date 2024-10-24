const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { protectAdmin } = require('./middleware/authMiddleware');
const path = require('path');
const cors=require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
     origin:'http://localhost:3000',
     methods:['GET','POST','DELETE','PUT'],
     credentials:true,

}))

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// console.log(process.env.MONGO_URI)

app.use('/api/users', userRoutes);
app.use('/api/admin', protectAdmin, adminRoutes);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
