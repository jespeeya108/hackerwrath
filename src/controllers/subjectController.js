const Subject = require('../models/Subject');
const Attendance = require('../models/Attendance');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const pick = require('../utils/pick');
const { getPagination, buildPagination } = require('../utils/pagination');

const SUBJECT_FIELDS = ['code', 'name', 'semester', 'branch', 'credits', 'dataSource'];
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET /api/subjects?semester=4&branch=CSE&q=data&page=1&limit=20
const listSubjects = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);

  const filter = {};
  if (req.query.semester) filter.semester = Number(req.query.semester);
  if (req.query.branch) filter.branch = req.query.branch.toUpperCase();
  if (req.query.q) filter.name = { $regex: escapeRegex(req.query.q), $options: 'i' };

  const [subjects, total] = await Promise.all([
    Subject.find(filter).sort({ semester: 1, code: 1 }).skip(skip).limit(limit),
    Subject.countDocuments(filter),
  ]);

  res.json({
    success: true,
    message: 'Subjects fetched',
    data: { subjects, pagination: buildPagination(page, limit, total) },
  });
});

// GET /api/subjects/:id
const getSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) throw new ApiError(404, 'Subject not found');
  res.json({ success: true, message: 'Subject fetched', data: { subject } });
});

// POST /api/subjects  (admin)
const createSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.create(pick(req.body, SUBJECT_FIELDS));
  res.status(201).json({ success: true, message: 'Subject created', data: { subject } });
});

// PUT /api/subjects/:id  (admin)
const updateSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) throw new ApiError(404, 'Subject not found');

  subject.set(pick(req.body, SUBJECT_FIELDS));
  await subject.save(); // save() runs the schema validators
  res.json({ success: true, message: 'Subject updated', data: { subject } });
});

// DELETE /api/subjects/:id  (admin)
const deleteSubject = asyncHandler(async (req, res) => {
  const inUse = await Attendance.exists({ subject: req.params.id });
  if (inUse) {
    throw new ApiError(409, 'Cannot delete: attendance records still reference this subject');
  }
  const subject = await Subject.findByIdAndDelete(req.params.id);
  if (!subject) throw new ApiError(404, 'Subject not found');
  res.json({ success: true, message: 'Subject deleted', data: {} });
});

module.exports = { listSubjects, getSubject, createSubject, updateSubject, deleteSubject };