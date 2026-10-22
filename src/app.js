const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const config = require('./config/env');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

app.use(helmet());
app.use(cors({ origin: config.clientOrigin })); // only your frontend origin
app.use(express.json({ limit: '10kb' }));
if (config.nodeEnv === 'development') app.use(morgan('dev'));

// Brute-force protection on login/register
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many attempts. Try again later.' },
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'GNDU Smart Campus API is running', data: { time: new Date() } });
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/students', studentRoutes);
// Stage 3+: exams, calendar, syllabus, placements, results go here

app.use(notFound);
app.use(errorHandler);

module.exports = app;