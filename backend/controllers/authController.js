import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Admin from '../models/Admin.js';
import { ErrorResponse } from '../middleware/errorHandler.js';
import { sendEmail } from '../utils/emailService.js';
import crypto from 'crypto';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, mobile, dateOfBirth, gender } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorResponse('Email already registered', 400));
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      mobile,
      dateOfBirth,
      gender
    });

    sendTokenResponse(user, 201, res, 'user');
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse('Please provide email and password', 400));
    }

    let user;
    let userRole = role || 'user';

    // Find user based on role
    if (userRole === 'doctor') {
      user = await Doctor.findOne({ email }).select('+password');
    } else if (userRole === 'admin') {
      user = await Admin.findOne({ email }).select('+password');
      if (user) {
        user.lastLogin = new Date();
        await user.save();
      }
    } else {
      user = await User.findOne({ email }).select('+password');
    }

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if user is active
    if (user.isActive === false) {
      return next(new ErrorResponse('Your account has been deactivated', 403));
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res, userRole);
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    
    res.status(200).json({
      success: true,
      data: user,
      role: req.userRole
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res, next) => {
  try {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  try {
    const { email, role } = req.body;
    let user;

    if (role === 'doctor') {
      user = await Doctor.findOne({ email });
    } else if (role === 'admin') {
      user = await Admin.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return next(new ErrorResponse('No user found with that email', 404));
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Request',
        message
      });

      res.status(200).json({
        success: true,
        message: 'Email sent'
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return next(new ErrorResponse('Email could not be sent', 500));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resetToken
// @access  Public
export const resetPassword = async (req, res, next) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    const { role, password } = req.body;

    let user;
    if (role === 'doctor') {
      user = await Doctor.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
      });
    } else if (role === 'admin') {
      user = await Admin.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
      });
    } else {
      user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
      });
    }

    if (!user) {
      return next(new ErrorResponse('Invalid or expired token', 400));
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res, role || 'user');
  } catch (error) {
    next(error);
  }
};

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res, role) => {
  // Create token
  const token = user.generateToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      role,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile || user.phone,
        image: user.image || user.profileImage
      }
    });
};
