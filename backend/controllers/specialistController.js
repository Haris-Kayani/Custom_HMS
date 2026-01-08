import Specialist from '../models/Specialist.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

// @desc    Get all specialists
// @route   GET /api/specialists
// @access  Public
export const getAllSpecialists = async (req, res, next) => {
  try {
    const specialists = await Specialist.find({ isActive: true })
      .sort({ displayOrder: 1 });

    res.status(200).json({
      success: true,
      count: specialists.length,
      data: specialists
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single specialist
// @route   GET /api/specialists/:id
// @access  Public
export const getSpecialist = async (req, res, next) => {
  try {
    const specialist = await Specialist.findById(req.params.id);

    if (!specialist) {
      return next(new ErrorResponse('Specialist not found', 404));
    }

    res.status(200).json({
      success: true,
      data: specialist
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create specialist
// @route   POST /api/specialists
// @access  Private (Admin)
export const createSpecialist = async (req, res, next) => {
  try {
    const specialist = await Specialist.create(req.body);

    res.status(201).json({
      success: true,
      data: specialist
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update specialist
// @route   PUT /api/specialists/:id
// @access  Private (Admin)
export const updateSpecialist = async (req, res, next) => {
  try {
    const specialist = await Specialist.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!specialist) {
      return next(new ErrorResponse('Specialist not found', 404));
    }

    res.status(200).json({
      success: true,
      data: specialist
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete specialist
// @route   DELETE /api/specialists/:id
// @access  Private (Admin)
export const deleteSpecialist = async (req, res, next) => {
  try {
    const specialist = await Specialist.findByIdAndDelete(req.params.id);

    if (!specialist) {
      return next(new ErrorResponse('Specialist not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Specialist deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
