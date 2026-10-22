const express = require('express');
const { query } = require('express-validator');
const { listStudents } = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { paginationRules } = require('../validators/commonValidators');

const router = express.Router();

router.get(
  '/',
  protect,
  authorize('admin'),
  [
    ...paginationRules,
    query('semester').optional().isInt({ min: 1, max: 12 }),
    query('branch').optional().isString().trim(),
    query('rollNumber').optional().isString().trim(),
  ],
  validate,
  listStudents
);

module.exports = router;