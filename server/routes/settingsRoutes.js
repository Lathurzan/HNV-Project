const express = require('express');
const { saveSettings, getSettings } = require('../controllers/settingsController');

const router = express.Router();

// GET settings
router.get('/', getSettings);

// POST or PUT settings
router.post('/', saveSettings);

module.exports = router;
