
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash('Nikunj@2004', 10);
  console.log('New hash:', hashedPassword);
  try {
await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nikunj-portfolio');
    console.log('Connected to MongoDB');

    // Use email from environment variable
    const adminEmail = process.env.EMAIL_USER || 'admin@example.com';

    // Check for existing admin by username or email
    const adminExists = await User.findOne({
      $or: [
        { username: 'Nikunj rana' },
        { email: adminEmail }
      ]
    });
    
    const newHash = hashedPassword;
    if (adminExists) {
      console.log('Admin user already exists, updating password');
      adminExists.password = newHash;
      await adminExists.save();
    } else {
      const admin = await User.create({
        username: 'Nikunj rana',
        email: adminEmail,
        password: newHash,
      });
      console.log('Admin created successfully');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};


createAdmin();

