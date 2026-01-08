import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Default placeholder image for doctors (local file in frontend public folder)
const DEFAULT_DOCTOR_IMAGE = '/images/default-doctor.svg';

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Gender is required']
  },
  // Renamed from profileImage to match frontend
  image: {
    type: String,
    default: DEFAULT_DOCTOR_IMAGE
  },
  // Renamed from specialization to match frontend
  speciality: {
    type: String,
    required: [true, 'Speciality is required']
  },
  // Renamed from qualification to match frontend
  degree: {
    type: String,
    required: [true, 'Degree/Qualification is required']
  },
  // Stored as Number, exposed as string via virtual
  experienceYears: {
    type: Number,
    required: [true, 'Years of experience is required'],
    min: 0
  },
  about: {
    type: String,
    maxlength: 1000
  },
  licenseNumber: {
    type: String,
    required: [true, 'Medical license number is required'],
    unique: true
  },
  // Renamed from consultationFee to match frontend
  fees: {
    type: Number,
    required: [true, 'Consultation fee is required'],
    min: 0
  },
  availableDays: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }],
  availableSlots: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    startTime: String, // Format: "HH:MM"
    endTime: String,   // Format: "HH:MM"
    slotDuration: {
      type: Number,
      default: 30 // in minutes
    }
  }],
  hospitalAffiliation: {
    type: String,
    default: 'Custom HMS Hospital'
  },
  // Restructured address to match frontend (line1, line2 format)
  address: {
    line1: String,
    line2: String
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  languages: [String],
  awards: [{
    title: String,
    year: Number,
    description: String
  }],
  education: [{
    degree: String,
    institution: String,
    year: Number
  }],
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});

// Hash password before saving
doctorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
doctorSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
doctorSchema.methods.generateToken = function() {
  return jwt.sign(
    { id: this._id, role: 'doctor' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Get full name (also aliased as 'name' to match frontend)
doctorSchema.virtual('fullName').get(function() {
  return `Dr. ${this.firstName} ${this.lastName}`;
});

// Alias for frontend compatibility - 'name' field
doctorSchema.virtual('name').get(function() {
  return `Dr. ${this.firstName} ${this.lastName}`;
});

// Virtual 'experience' field - returns string like "4 Years" for frontend
doctorSchema.virtual('experience').get(function() {
  return `${this.experienceYears} Years`;
});

// Ensure virtuals are included when converting to JSON/Object
doctorSchema.set('toJSON', { virtuals: true });
doctorSchema.set('toObject', { virtuals: true });

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
