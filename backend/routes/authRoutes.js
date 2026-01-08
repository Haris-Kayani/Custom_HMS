import express from 'express';
import {
  registerUser,
  login,
  getMe,
  logout,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validateUserRegistration, validateLogin, validate } from '../middleware/validation.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public routes
router.post('/register', authRateLimiter, validateUserRegistration, validate, registerUser);
router.post('/login', authRateLimiter, validateLogin, validate, login);
router.post('/forgot-password', authRateLimiter, forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);

// Protected routes
router.get('/me', authenticate, getMe);
router.post('/logout', authenticate, logout);

export default router;
