const express = require('express');
const router = express.Router();
const { saveAboutPage, getAboutPage } = require('../controllers/aboutController');

router.get('/', getAboutPage);
router.post('/', saveAboutPage);

module.exports = router;
