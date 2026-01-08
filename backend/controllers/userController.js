import User from '../models/User.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (User)
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private (User)
export const updateUserProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobile: req.body.mobile,
      address: req.body.address,
      bloodGroup: req.body.bloodGroup,
      emergencyContact: req.body.emergencyContact,
      image: req.body.image
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => 
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const user = await User.findByIdAndUpdate(
      req.user._id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user password
// @route   PUT /api/users/update-password
// @access  Private (User)
export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+password');

    // Check current password
    if (!(await user.comparePassword(req.body.currentPassword))) {
      return next(new ErrorResponse('Current password is incorrect', 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add medical history
// @route   POST /api/users/medical-history
// @access  Private (User)
export const addMedicalHistory = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    user.medicalHistory.push(req.body);
    await user.save();

    res.status(200).json({
      success: true,
      data: user.medicalHistory
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update medical information
// @route   PUT /api/users/medical-info
// @access  Private (User)
export const updateMedicalInfo = async (req, res, next) => {
  try {
    const { allergies, currentMedications } = req.body;

    const user = await User.findById(req.user._id);

    if (allergies) user.allergies = allergies;
    if (currentMedications) user.currentMedications = currentMedications;

    await user.save();

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user account
// @route   DELETE /api/users/account
// @access  Private (User)
export const deleteUserAccount = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { isActive: false });

    res.status(200).json({
      success: true,
      message: 'Account deactivated successfully'
    });
  } catch (error) {
    next(error);
  }
};
