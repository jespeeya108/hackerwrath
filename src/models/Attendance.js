const mongoose = require('mongoose');
const { DATA_SOURCES } = require('../utils/constants');

const isWholeNumber = {
  validator: Number.isInteger,
  message: '{PATH} must be a whole number',
};

const attendanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    semester: { type: Number, required: true, min: 1, max: 12 },
    classesAttended: {
      type: Number,
      required: [true, 'classesAttended is required'],
      min: [0, 'classesAttended cannot be negative'],
      validate: [
        isWholeNumber,
        {
          validator: function (v) {
            return this.totalClasses === undefined || v <= this.totalClasses;
          },
          message: 'classesAttended cannot be greater than totalClasses',
        },
      ],
    },
    totalClasses: {
      type: Number,
      required: [true, 'totalClasses is required'],
      min: [0, 'totalClasses cannot be negative'],
      validate: [
        isWholeNumber,
        {
          validator: function (v) {
            return this.classesAttended === undefined || v >= this.classesAttended;
          },
          message: 'totalClasses cannot be less than classesAttended',
        },
      ],
    },
    dataSource: { type: String, enum: DATA_SOURCES, default: 'admin_entered' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

attendanceSchema.index({ student: 1, subject: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);