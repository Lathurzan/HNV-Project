const express = require('express');
const router = express.Router();
const {
  adminLogin,
  adminRegister,
  changeAdminPassword
} = require('../controllers/adminController');

router.post('/login', adminLogin);
router.post('/register', adminRegister);
router.post('/change-password', changeAdminPassword); // 👈 Add this line

module.exports = router;
