const express = require('express');
const router = express.Router();
const authController = require('../app/api/controllers/auth.controller');

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authController.me);
router.patch('/password/email', authController.getResetToken);
router.patch('/password/reset', authController.resetPassword);

module.exports = router;
