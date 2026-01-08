import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  updatePassword,
  addMedicalHistory,
  updateMedicalInfo,
  deleteUserAccount
} from '../controllers/userController.js';
import { authenticate, authorize, checkUserStatus } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected and require user role
router.use(authenticate);
router.use(authorize('user'));
router.use(checkUserStatus);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.put('/update-password', updatePassword);
router.post('/medical-history', addMedicalHistory);
router.put('/medical-info', updateMedicalInfo);
router.delete('/account', deleteUserAccount);

export default router;
