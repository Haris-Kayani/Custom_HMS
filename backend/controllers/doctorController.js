import Doctor from '../models/Doctor.js';
import Specialist from '../models/Specialist.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
export const getAllDoctors = async (req, res, next) => {
  try {
    const { speciality, search, isAvailable, page = 1, limit = 10 } = req.query;

    let query = { isActive: true };

    // Filter by speciality
    if (speciality) {
      query.speciality = speciality;
    }

    // Filter by availability
    if (isAvailable) {
      query.isAvailable = isAvailable === 'true';
    }

    // Search by name
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ];
    }

    const doctors = await Doctor.find(query)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ rating: -1 });

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

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
export const getDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('-password');

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

// @desc    Get doctor profile (for logged in doctor)
// @route   GET /api/doctors/profile
// @access  Private (Doctor)
export const getDoctorProfile = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.user._id).select('-password');

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update doctor profile
// @route   PUT /api/doctors/profile
// @access  Private (Doctor)
export const updateDoctorProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      about: req.body.about,
      fees: req.body.fees,
      availableDays: req.body.availableDays,
      availableSlots: req.body.availableSlots,
      languages: req.body.languages,
      image: req.body.image,
      address: req.body.address,
      isAvailable: req.body.isAvailable
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => 
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const doctor = await Doctor.findByIdAndUpdate(
      req.user._id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get doctors by speciality
// @route   GET /api/doctors/speciality/:speciality
// @access  Public
export const getDoctorsBySpecialization = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({
      speciality: req.params.speciality,
      isActive: true,
      isVerified: true
    })
      .select('-password')
      .sort({ rating: -1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get related doctors (same specialization)
// @route   GET /api/doctors/:id/related
// @access  Public
export const getRelatedDoctors = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return next(new ErrorResponse('Doctor not found', 404));
    }

    const relatedDoctors = await Doctor.find({
      speciality: doctor.speciality,
      _id: { $ne: doctor._id },
      isActive: true,
      isVerified: true
    })
      .select('-password')
      .limit(4)
      .sort({ rating: -1 });

    res.status(200).json({
      success: true,
      data: relatedDoctors
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update doctor availability
// @route   PUT /api/doctors/availability
// @access  Private (Doctor)
export const updateAvailability = async (req, res, next) => {
  try {
    const { isAvailable } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      req.user._id,
      { isAvailable },
      { new: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add doctor education
// @route   POST /api/doctors/education
// @access  Private (Doctor)
export const addEducation = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.user._id);

    doctor.education.push(req.body);
    await doctor.save();

    res.status(200).json({
      success: true,
      data: doctor.education
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add doctor award
// @route   POST /api/doctors/awards
// @access  Private (Doctor)
export const addAward = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.user._id);

    doctor.awards.push(req.body);
    await doctor.save();

    res.status(200).json({
      success: true,
      data: doctor.awards
    });
  } catch (error) {
    next(error);
  }
};
