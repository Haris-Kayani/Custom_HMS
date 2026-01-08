import jwt from 'jsonwebtoken';
import { ErrorResponse } from './errorHandler.js';
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Admin from '../models/Admin.js';

// Protect routes - authenticate user
export const authenticate = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers or cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach user based on role
      if (decoded.role === 'user') {
        req.user = await User.findById(decoded.id).select('-password');
      } else if (decoded.role === 'doctor') {
        req.user = await Doctor.findById(decoded.id).select('-password');
      } else if (decoded.role === 'admin') {
        req.user = await Admin.findById(decoded.id).select('-password');
      }

      if (!req.user) {
        return next(new ErrorResponse('User not found', 404));
      }

      req.userRole = decoded.role;
      next();
    } catch (error) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }
  } catch (error) {
    next(error);
  }
};

// Authorize specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return next(
        new ErrorResponse(
          `User role ${req.userRole} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

// Check if user is active
export const checkUserStatus = async (req, res, next) => {
  try {
    if (req.user && req.user.isActive === false) {
      return next(new ErrorResponse('Your account has been deactivated', 403));
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Check admin permissions
export const checkPermission = (permission) => {
  return (req, res, next) => {
    if (req.userRole === 'admin' && !req.user.permissions.includes(permission)) {
      return next(
        new ErrorResponse(
          `You don't have permission to perform this action`,
          403
        )
      );
    }
    next();
  };
};
