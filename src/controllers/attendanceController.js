const config = require('../config/env');
const Attendance = require('../models/Attendance');
const Subject = require('../models/Subject');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const pick = require('../utils/pick');
const { getPagination, buildPagination } = require('../utils/pagination');
const { calculatePercentage, getStatus, withStats } = require('../utils/attendanceCalc');

// Optional ?threshold=80 overrides the default from .env
const getThreshold = (req) =>
  req.query.threshold ? Number(req.query.threshold) : config.attendanceThreshold;

const bySubjectCode = (a, b) => (a.subject?.code || '').localeCompare(b.subject?.code || '');

// ---------- Student endpoints (own data only) ----------

// GET /api/attendance/me?semester=4
const getMyAttendance = asyncHandler(async (req, res) => {
  const threshold = getThreshold(req);
  const filter = { student: req.user._id };
  if (req.query.semester) filter.semester = Number(req.query.semester);

  const records = await Attendance.find(filter).populate('subject', 'code name credits');
  const attendance = records.map((r) => withStats(r, threshold)).sort(bySubjectCode);

  res.json({
    success: true,
    message: 'Attendance fetched',
    data: { threshold, attendance },
  });
});

// GET /api/attendance/me/summary?semester=4
const getMyAttendanceSummary = asyncHandler(async (req, res) => {
  const threshold = getThreshold(req);
  const filter = { student: req.user._id };
  if (req.query.semester) filter.semester = Number(req.query.semester);

  const records = await Attendance.find(filter).populate('subject', 'code name');
  const subjects = records.map((r) => withStats(r, threshold)).sort(bySubjectCode);

  const totalAttended = subjects.reduce((sum, s) => sum + s.classesAttended, 0);
  const totalClasses = subjects.reduce((sum, s) => sum + s.totalClasses, 0);

  const shortage = subjects.filter((s) => s.status === 'shortage');
  const warnings = shortage.map((s) =>
    s.classesNeededForThreshold === null
      ? `${s.subject.name}: ${s.percentage}%. Reaching ${threshold}% is not possible.`
      : `${s.subject.name}: ${s.percentage}% (below ${threshold}%). Attend the next ${s.classesNeededForThreshold} classes in a row to reach ${threshold}%.`
  );

  res.json({
    success: true,
    message: 'Attendance summary fetched',
    data: {
      threshold,
      semester: req.query.semester ? Number(req.query.semester) : null,
      overall: {
        classesAttended: totalAttended,
        totalClasses,
        percentage: calculatePercentage(totalAttended, totalClasses),
        status: getStatus(totalAttended, totalClasses, threshold),
      },
      subjects,
      shortageCount: shortage.length,
      warnings,
    },
  });
});

// ---------- Admin endpoints ----------

// GET /api/attendance?student=<id>&subject=<id>&semester=4&page=1  (admin)
const listAttendance = asyncHandler(async (req, res) => {
  const threshold = getThreshold(req);
  const { page, limit, skip } = getPagination(req.query);

  const filter = {};
  if (req.query.student) filter.student = req.query.student;
  if (req.query.subject) filter.subject = req.query.subject;
  if (req.query.semester) filter.semester = Number(req.query.semester);

  const [records, total] = await Promise.all([
    Attendance.find(filter)
      .populate('subject', 'code name')
      .populate('student', 'name rollNumber')
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit),
    Attendance.countDocuments(filter),
  ]);

  res.json({
    success: true,
    message: 'Attendance records fetched',
    data: {
      records: records.map((r) => ({ ...withStats(r, threshold), student: r.student })),
      pagination: buildPagination(page, limit, total),
    },
  });
});

// POST /api/attendance  (admin)
const createAttendance = asyncHandler(async (req, res) => {
  const { student, subject, semester, classesAttended, totalClasses, dataSource } = req.body;

  const studentDoc = await User.findById(student);
  if (!studentDoc || studentDoc.role !== 'student') throw new ApiError(404, 'Student not found');

  const subjectDoc = await Subject.findById(subject);
  if (!subjectDoc) throw new ApiError(404, 'Subject not found');

  const exists = await Attendance.exists({ student, subject, semester });
  if (exists) {
    throw new ApiError(409, 'A record already exists for this student, subject and semester. Use PUT to update it.');
  }

  const record = await Attendance.create({
    student, subject, semester, classesAttended, totalClasses, dataSource,
    updatedBy: req.user._id,
  });
  await record.populate('subject', 'code name');

  res.status(201).json({
    success: true,
    message: 'Attendance record created',
    data: { record: withStats(record, config.attendanceThreshold) },
  });
});

// PUT /api/attendance/:id  (admin)
const updateAttendance = asyncHandler(async (req, res) => {
  const updates = pick(req.body, ['classesAttended', 'totalClasses', 'dataSource']);
  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, 'Provide at least one of: classesAttended, totalClasses, dataSource');
  }

  const record = await Attendance.findById(req.params.id);
  if (!record) throw new ApiError(404, 'Attendance record not found');

  record.set(updates);
  record.updatedBy = req.user._id;
  await record.save(); // runs validators, e.g. attended <= total
  await record.populate('subject', 'code name');

  res.json({
    success: true,
    message: 'Attendance record updated',
    data: { record: withStats(record, config.attendanceThreshold) },
  });
});

module.exports = {
  getMyAttendance,
  getMyAttendanceSummary,
  listAttendance,
  createAttendance,
  updateAttendance,
};