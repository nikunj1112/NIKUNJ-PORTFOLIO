const express = require('express');
const {
  getStats,
  getStat,
  createStat,
  updateStat,
  deleteStat
} = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(getStats)
  .post(protect, createStat);

router
  .route('/:id')
  .get(protect, getStat)
  .put(protect, updateStat)
  .delete(protect, deleteStat);

module.exports = router;

