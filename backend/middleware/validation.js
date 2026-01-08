import { body, validationResult } from 'express-validator';
import { ErrorResponse } from './errorHandler.js';

// Validation middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    return next(new ErrorResponse(errorMessages, 400));
  }
  next();
};

// User registration validation
export const validateUserRegistration = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('mobile').notEmpty().withMessage('Mobile number is required'),
  body('dateOfBirth').isDate().withMessage('Please provide a valid date of birth'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Please select a valid gender'),
];

// Login validation
export const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Doctor registration validation
export const validateDoctorRegistration = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('speciality').notEmpty().withMessage('Speciality is required'),
  body('degree').notEmpty().withMessage('Degree/Qualification is required'),
  body('licenseNumber').notEmpty().withMessage('License number is required'),
  body('fees').isNumeric().withMessage('Consultation fee must be a number'),
];

// Appointment validation
export const validateAppointment = [
  body('doctor').notEmpty().withMessage('Doctor ID is required'),
  body('appointmentDate').isDate().withMessage('Please provide a valid date'),
  body('appointmentTime').notEmpty().withMessage('Appointment time is required'),
  body('reasonForVisit').trim().notEmpty().withMessage('Reason for visit is required'),
];
