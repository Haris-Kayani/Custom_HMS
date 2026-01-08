import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  getAllDoctorsAdmin,
  verifyDoctor,
  deactivateUser,
  getAllAppointments,
  createAdmin,
  deleteUser
} from '../controllers/adminController.js';
import { authenticate, authorize, checkUserStatus, checkPermission } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected and require admin role
router.use(authenticate);
router.use(authorize('admin'));
router.use(checkUserStatus);

// Dashboard
router.get('/stats', getDashboardStats);

// User management
router.get('/users', checkPermission('manage_users'), getAllUsers);
router.put('/users/:id/deactivate', checkPermission('manage_users'), deactivateUser);
router.delete('/:userType/:id', checkPermission('manage_users'), deleteUser);

// Doctor management
router.get('/doctors', checkPermission('manage_doctors'), getAllDoctorsAdmin);
router.put('/doctors/:id/verify', checkPermission('manage_doctors'), verifyDoctor);

// Appointment management
router.get('/appointments', checkPermission('manage_appointments'), getAllAppointments);

// Admin management (Super Admin only)
router.post('/create', authorize('admin'), checkPermission('manage_admins'), createAdmin);

export default router;
