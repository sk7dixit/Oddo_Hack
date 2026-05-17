const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/google', authController.googleLogin);
router.get('/profile', authController.getProfile);

module.exports = router;
