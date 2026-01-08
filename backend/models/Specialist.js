import mongoose from 'mongoose';

const specialistSchema = new mongoose.Schema({
  // Renamed from 'name' to 'speciality' to match frontend
  speciality: {
    type: String,
    required: [true, 'Speciality name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 500
  },
  icon: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  doctorCount: {
    type: Number,
    default: 0
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Specialist = mongoose.model('Specialist', specialistSchema);

export default Specialist;
