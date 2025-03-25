const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-email', authController.verifyEmail);
router.post('/verify-2fa', authController.verify2FA);

// Protected routes (require authentication)
router.post('/setup-2fa-authenticator', protect, authController.setup2FAAuthenticator);
router.post('/verify-2fa-authenticator', protect, authController.verify2FAAuthenticator);

module.exports = router;
