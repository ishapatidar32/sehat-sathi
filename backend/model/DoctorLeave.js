// models/DoctorLeave.js
const mongoose = require('mongoose');

const doctorLeaveSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true }, // whole-day off
  reason: { type: String }
}, { timestamps: true });

doctorLeaveSchema.index({ doctorId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DoctorLeave', doctorLeaveSchema);