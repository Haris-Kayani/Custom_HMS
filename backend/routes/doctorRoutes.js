import express from 'express';
import {
  getAllDoctors,
  getDoctor,
  getDoctorProfile,
  updateDoctorProfile,
  getDoctorsBySpecialization,
  getRelatedDoctors,
  updateAvailability,
  addEducation,
  addAward
} from '../controllers/doctorController.js';
import { authenticate, authorize, checkUserStatus } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllDoctors);
router.get('/:id', getDoctor);
router.get('/speciality/:speciality', getDoctorsBySpecialization);
router.get('/:id/related', getRelatedDoctors);

// Protected routes (Doctor only)
router.get('/profile/me', authenticate, authorize('doctor'), checkUserStatus, getDoctorProfile);
router.put('/profile', authenticate, authorize('doctor'), checkUserStatus, updateDoctorProfile);
router.put('/availability', authenticate, authorize('doctor'), checkUserStatus, updateAvailability);
router.post('/education', authenticate, authorize('doctor'), checkUserStatus, addEducation);
router.post('/awards', authenticate, authorize('doctor'), checkUserStatus, addAward);

export default router;
