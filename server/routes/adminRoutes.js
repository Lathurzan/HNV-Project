const express = require('express');
const router = express.Router();
const {
  adminLogin,
  adminRegister,
  changeAdminPassword
} = require('../controllers/adminController');
const googleLogin = require('../controllers/googleLogin');

router.post('/login', adminLogin);
router.post('/register', adminRegister);
router.post('/change-password', changeAdminPassword);
router.post('/google-login', googleLogin);

module.exports = router;
