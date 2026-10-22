const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { getPagination, buildPagination } = require('../utils/pagination');

// GET /api/students?branch=CSE&semester=4&rollNumber=DEMO-CSE-001  (admin)
const listStudents = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);

  const filter = { role: 'student' };
  if (req.query.branch) filter.branch = req.query.branch.toUpperCase();
  if (req.query.semester) filter.semester = Number(req.query.semester);
  if (req.query.rollNumber) filter.rollNumber = req.query.rollNumber;

  const [students, total] = await Promise.all([
    User.find(filter).sort({ rollNumber: 1 }).skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);

  res.json({
    success: true,
    message: 'Students fetched',
    data: { students, pagination: buildPagination(page, limit, total) },
  });
});

module.exports = { listStudents };