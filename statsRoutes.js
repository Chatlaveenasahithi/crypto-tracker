const express = require('express');
const { getLatestStats } = require('../controllers/statsController');
const router = express.Router();

router.get('/stats', getLatestStats);

module.exports = router;
