import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import Admin from '../models/Admin.js';
import Specialist from '../models/Specialist.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ isActive: true });
    const totalDoctors = await Doctor.countDocuments({ isActive: true });
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
    const completedAppointments = await Appointment.countDocuments({ status: 'completed' });

    // Recent appointments
    const recentAppointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('patient', 'firstName lastName')
      .populate('doctor', 'firstName lastName speciality');

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalDoctors,
        totalAppointments,
        pendingAppointments,
        completedAppointments,
        recentAppointments
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, isActive } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all doctors (Admin)
// @route   GET /api/admin/doctors
// @access  Private (Admin)
export const getAllDoctorsAdmin = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, isVerified, isActive } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { speciality: { $regex: search, $options: 'i' } }
      ];
    }

    if (isVerified !== undefined) {
      query.isVerified = isVerified === 'true';
    }

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const doctors = await Doctor.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Doctor.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: doctors
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify doctor
// @route   PUT /api/admin/doctors/:id/verify
// @access  Private (Admin)
export const verifyDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    ).select('-password');

    if (!doctor) {
      return next(new ErrorResponse('Doctor not found', 404));
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Deactivate user/doctor
// @route   PUT /api/admin/users/:id/deactivate
// @access  Private (Admin)
export const deactivateUser = async (req, res, next) => {
  try {
    const { userType } = req.body; // 'user' or 'doctor'

    let user;
    if (userType === 'doctor') {
      user = await Doctor.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      ).select('-password');
    } else {
      user = await User.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      ).select('-password');
    }

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all appointments (Admin)
// @route   GET /api/admin/appointments
// @access  Private (Admin)
export const getAllAppointments = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, date } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    }

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      
      query.appointmentDate = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const appointments = await Appointment.find(query)
      .populate('patient', 'firstName lastName email mobile')
      .populate('doctor', 'firstName lastName speciality')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Appointment.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new admin
// @route   POST /api/admin/create
// @access  Private (Super Admin)
export const createAdmin = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone, role, permissions } = req.body;

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return next(new ErrorResponse('Admin with this email already exists', 400));
    }

    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      role,
      permissions
    });

    res.status(201).json({
      success: true,
      data: admin
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user/doctor
// @route   DELETE /api/admin/:userType/:id
// @access  Private (Admin)
export const deleteUser = async (req, res, next) => {
  try {
    const { userType, id } = req.params;

    let result;
    if (userType === 'doctor') {
      result = await Doctor.findByIdAndDelete(id);
    } else if (userType === 'user') {
      result = await User.findByIdAndDelete(id);
    }

    if (!result) {
      return next(new ErrorResponse('User not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
