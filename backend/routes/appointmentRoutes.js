import express from 'express';
import {
  createAppointment,
  getUserAppointments,
  getDoctorAppointments,
  getAppointment,
  updateAppointmentStatus,
  cancelAppointment,
  addConsultationNotes,
  updatePaymentStatus,
  getAppointmentStats
} from '../controllers/appointmentController.js';
import { authenticate, authorize, checkUserStatus } from '../middleware/auth.js';
import { validateAppointment, validate } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(authenticate);
router.use(checkUserStatus);

// User routes
router.post('/', authorize('user'), validateAppointment, validate, createAppointment);
router.get('/my-appointments', authorize('user'), getUserAppointments);

// Doctor routes
router.get('/doctor-appointments', authorize('doctor'), getDoctorAppointments);
router.get('/stats', authorize('doctor'), getAppointmentStats);
router.put('/:id/consultation', authorize('doctor'), addConsultationNotes);

// Shared routes (User, Doctor, Admin)
router.get('/:id', getAppointment);
router.put('/:id/cancel', cancelAppointment);

// Doctor and Admin routes
router.put('/:id/status', authorize('doctor', 'admin'), updateAppointmentStatus);

// Admin only routes
router.put('/:id/payment', authorize('admin'), updatePaymentStatus);

export default router;
