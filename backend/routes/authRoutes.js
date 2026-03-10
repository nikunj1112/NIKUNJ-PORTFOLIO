const express = require('express');
const router = express.Router();
const { login, getMe, createAdmin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/create-admin', createAdmin);

module.exports = router;

