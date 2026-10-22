const jwt = require('jsonwebtoken');
const config = require('../config/env');
const User = require('../models/User');
const ApiError = require('../utils/ApiErrors');
const asyncHandler = require('../utils/asyncHandler');

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

// POST /api/auth/register  (students only)
const register = asyncHandler(async (req, res) => {
  const { name, email, password, rollNumber, branch, semester, graduationYear } = req.body;

  // role is NOT read from the body: always "student"
  const user = await User.create({
    name, email, password, rollNumber, branch, semester, graduationYear,
    role: 'student',
  });

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: { token: signToken(user), user },
  });
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  const ok = user && (await user.comparePassword(password));

  // Same message for "no such user" and "wrong password" (no user enumeration)
  if (!ok) throw new ApiError(401, 'Invalid email or password');

  res.json({
    success: true,
    message: 'Login successful',
    data: { token: signToken(user), user },
  });
});

// GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, message: 'Profile fetched', data: { user: req.user } });
});

module.exports = { register, login, getMe };