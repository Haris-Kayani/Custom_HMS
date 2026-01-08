import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import User from '../models/User.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private (User)
export const createAppointment = async (req, res, next) => {
  try {
    const { doctor, appointmentDate, appointmentTime, reasonForVisit, symptoms, appointmentType, notes } = req.body;

    // Check if doctor exists
    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) {
      return next(new ErrorResponse('Doctor not found', 404));
    }

    // Check if doctor is available
    if (!doctorExists.isAvailable) {
      return next(new ErrorResponse('Doctor is not available', 400));
    }

    // Check if slot is already booked
    const existingAppointment = await Appointment.findOne({
      doctor,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingAppointment) {
      return next(new ErrorResponse('This time slot is already booked', 400));
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor,
      appointmentDate,
      appointmentTime,
      reasonForVisit,
      symptoms,
      appointmentType,
      notes,
      paymentAmount: doctorExists.fees
    });

    await appointment.populate('doctor', 'firstName lastName speciality image');
    await appointment.populate('patient', 'firstName lastName email mobile');

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all appointments for user
// @route   GET /api/appointments/my-appointments
// @access  Private (User)
export const getUserAppointments = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    let query = { patient: req.user._id };

    if (status) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .populate('doctor', 'firstName lastName speciality image fees')
      .sort({ appointmentDate: -1 })
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

// @desc    Get all appointments for doctor
// @route   GET /api/appointments/doctor-appointments
// @access  Private (Doctor)
export const getDoctorAppointments = async (req, res, next) => {
  try {
    const { status, date, page = 1, limit = 10 } = req.query;

    let query = { doctor: req.user._id };

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
      .populate('patient', 'firstName lastName email mobile dateOfBirth gender bloodGroup')
      .sort({ appointmentDate: 1, appointmentTime: 1 })
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

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
export const getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('doctor', 'firstName lastName speciality image fees phone email')
      .populate('patient', 'firstName lastName email mobile dateOfBirth gender bloodGroup address');

    if (!appointment) {
      return next(new ErrorResponse('Appointment not found', 404));
    }

    // Make sure user is appointment owner or doctor
    if (
      appointment.patient._id.toString() !== req.user._id.toString() &&
      appointment.doctor._id.toString() !== req.user._id.toString() &&
      req.userRole !== 'admin'
    ) {
      return next(new ErrorResponse('Not authorized to access this appointment', 403));
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private (Doctor/Admin)
export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return next(new ErrorResponse('Appointment not found', 404));
    }

    // Check authorization
    if (
      req.userRole === 'doctor' &&
      appointment.doctor.toString() !== req.user._id.toString()
    ) {
      return next(new ErrorResponse('Not authorized to update this appointment', 403));
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private (User/Doctor/Admin)
export const cancelAppointment = async (req, res, next) => {
  try {
    const { cancellationReason } = req.body;

    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return next(new ErrorResponse('Appointment not found', 404));
    }

    // Check authorization
    if (
      appointment.patient.toString() !== req.user._id.toString() &&
      appointment.doctor.toString() !== req.user._id.toString() &&
      req.userRole !== 'admin'
    ) {
      return next(new ErrorResponse('Not authorized to cancel this appointment', 403));
    }

    if (appointment.status === 'completed' || appointment.status === 'cancelled') {
      return next(new ErrorResponse('Cannot cancel this appointment', 400));
    }

    appointment.status = 'cancelled';
    appointment.cancellationReason = cancellationReason;
    appointment.cancelledBy = req.userRole;
    
    await appointment.save();

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add consultation notes (Doctor only)
// @route   PUT /api/appointments/:id/consultation
// @access  Private (Doctor)
export const addConsultationNotes = async (req, res, next) => {
  try {
    const { diagnosis, prescription, labTests, followUpDate, notes } = req.body;

    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return next(new ErrorResponse('Appointment not found', 404));
    }

    if (appointment.doctor.toString() !== req.user._id.toString()) {
      return next(new ErrorResponse('Not authorized to update this appointment', 403));
    }

    appointment.diagnosis = diagnosis;
    appointment.prescription = prescription;
    appointment.labTests = labTests;
    appointment.followUpDate = followUpDate;
    appointment.notes = notes;
    appointment.status = 'completed';

    await appointment.save();

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update payment status
// @route   PUT /api/appointments/:id/payment
// @access  Private (Admin)
export const updatePaymentStatus = async (req, res, next) => {
  try {
    const { paymentStatus, paymentMethod } = req.body;

    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return next(new ErrorResponse('Appointment not found', 404));
    }

    appointment.paymentStatus = paymentStatus;
    appointment.paymentMethod = paymentMethod;

    await appointment.save();

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get appointment statistics
// @route   GET /api/appointments/stats
// @access  Private (Doctor)
export const getAppointmentStats = async (req, res, next) => {
  try {
    const doctorId = req.user._id;

    const total = await Appointment.countDocuments({ doctor: doctorId });
    const pending = await Appointment.countDocuments({ doctor: doctorId, status: 'pending' });
    const confirmed = await Appointment.countDocuments({ doctor: doctorId, status: 'confirmed' });
    const completed = await Appointment.countDocuments({ doctor: doctorId, status: 'completed' });
    const cancelled = await Appointment.countDocuments({ doctor: doctorId, status: 'cancelled' });

    // Today's appointments
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAppointments = await Appointment.countDocuments({
      doctor: doctorId,
      appointmentDate: { $gte: today, $lt: tomorrow }
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        confirmed,
        completed,
        cancelled,
        todayAppointments
      }
    });
  } catch (error) {
    next(error);
  }
};
