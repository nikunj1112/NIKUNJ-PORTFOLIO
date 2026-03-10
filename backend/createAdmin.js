const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const adminExists = await User.findOne({ username: 'Nikunj' });
    
    if (adminExists) {
      console.log('Admin user already exists');
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Nikunj@2004', salt);
      
      const admin = await User.create({
        username: 'admin',
        password: hashedPassword,
        isAdmin: true
      });
      
      console.log('Admin user created successfully!');
      console.log('Username: admin');
      console.log('Password: admin123');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};


createAdmin();

