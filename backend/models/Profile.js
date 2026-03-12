const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Nikunj Rana',
  },
  title: {
    type: String,
    default: 'Full Stack MERN Developer',
  },
  about: {
    type: String,
    default: 'Passionate MERN stack developer with expertise in building modern web applications.',
  },
  profileImage: {
    type: String,
    default: '',
  },
  resume: {
    type: String,
    default: '',
  },
  github: {
    type: String,
    default: 'https://github.com/nikunj1112',
  },
  linkedin: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  stats: {
    type: [
      {
        label: { type: String, default: '' },
        value: { type: String, default: '' },
      },
    ],
    default: [
      { label: 'Projects Completed', value: '0' },
      { label: 'Skills', value: '0' },
      { label: 'Years Experience', value: '0' },
      { label: 'Happy Clients', value: '0' },
    ],
  },
});

module.exports = mongoose.model('Profile', profileSchema);

