// models/DoctorAvailability
import mongoose from 'mongoose';

const doctorAvailabilitySchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dayOfWeek: { type: Number, min: 0, max: 6, required: true }, // 0=Sun..6=Sat
  startTime: { type: String, required: true }, // "10:00"
  endTime: { type: String, required: true },   // "17:00"
  slotDurationMinutes: { type: Number, default: 30 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

doctorAvailabilitySchema.index({ doctorId: 1, dayOfWeek: 1 });

 export const DoctorAvailability  = mongoose.model('DoctorAvailability', doctorAvailabilitySchema);