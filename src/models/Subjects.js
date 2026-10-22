const mongoose = require('mongoose');
const { DATA_SOURCES } = require('../utils/constants');

const subjectSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Subject code is required'],
      unique: true,
      uppercase: true,
      trim: true,
      maxlength: 20,
    },
    name: { type: String, required: [true, 'Subject name is required'], trim: true, maxlength: 150 },
    semester: { type: Number, required: [true, 'Semester is required'], min: 1, max: 12 },
    branch: { type: String, required: [true, 'Branch is required'], uppercase: true, trim: true },
    credits: { type: Number, min: 0, max: 30, default: 0 },
    dataSource: { type: String, enum: DATA_SOURCES, default: 'admin_entered' },
  },
  { timestamps: true }
);

subjectSchema.index({ branch: 1, semester: 1 });

module.exports = mongoose.model('Subject', subjectSchema);