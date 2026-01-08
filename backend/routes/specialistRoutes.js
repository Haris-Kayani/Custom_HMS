import express from 'express';
import {
  getAllSpecialists,
  getSpecialist,
  createSpecialist,
  updateSpecialist,
  deleteSpecialist
} from '../controllers/specialistController.js';
import { authenticate, authorize, checkPermission } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllSpecialists);
router.get('/:id', getSpecialist);

// Protected routes (Admin only)
router.post('/', authenticate, authorize('admin'), checkPermission('manage_settings'), createSpecialist);
router.put('/:id', authenticate, authorize('admin'), checkPermission('manage_settings'), updateSpecialist);
router.delete('/:id', authenticate, authorize('admin'), checkPermission('manage_settings'), deleteSpecialist);

export default router;
