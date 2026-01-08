import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  appointmentTime: {
    type: String,
    required: [true, 'Appointment time is required']
  },
  appointmentType: {
    type: String,
    enum: ['in-person', 'video-call', 'phone-call'],
    default: 'in-person'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'],
    default: 'pending'
  },
  reasonForVisit: {
    type: String,
    required: [true, 'Reason for visit is required'],
    maxlength: 500
  },
  symptoms: [String],
  notes: {
    type: String,
    maxlength: 1000
  },
  // Doctor's consultation notes (filled after appointment)
  diagnosis: {
    type: String,
    maxlength: 1000
  },
  prescription: [{
    medication: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String
  }],
  labTests: [{
    testName: String,
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending'
    },
    results: String,
    date: Date
  }],
  followUpDate: Date,
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentAmount: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'insurance', 'online'],
  },
  cancelledBy: {
    type: String,
    enum: ['patient', 'doctor', 'admin']
  },
  cancellationReason: String,
  reminderSent: {
    type: Boolean,
    default: false
  },
  reminderSentAt: Date
}, {
  timestamps: true
});

// Index for faster queries
appointmentSchema.index({ patient: 1, appointmentDate: -1 });
appointmentSchema.index({ doctor: 1, appointmentDate: -1 });
appointmentSchema.index({ status: 1, appointmentDate: 1 });

// Virtual to check if appointment is upcoming
appointmentSchema.virtual('isUpcoming').get(function() {
  return this.appointmentDate > new Date() && this.status === 'confirmed';
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
