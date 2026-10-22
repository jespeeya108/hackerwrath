const config = require('../config/env');

const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let errors = err.errors;

  // Mongoose validation error (schema rules)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // Invalid ObjectId, e.g. /api/exams/abc
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid value for ${err.path}`;
  }

  // Duplicate unique field (email, roll number)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `A record with this ${field} already exists`;
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Invalid or expired token. Please log in again.';
  }

  if (statusCode === 500 && config.nodeEnv === 'production') {
    message = 'Internal server error'; // never leak internals
  }

  if (statusCode === 500) console.error(err);

  res.status(statusCode).json({ success: false, message, ...(errors && { errors }) });
};

module.exports = { notFound, errorHandler };