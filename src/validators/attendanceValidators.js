const { body, query } = require('express-validator');
const { DATA_SOURCES } = require('../utils/constants');
const { idParam, paginationRules } = require('./commonValidators');

const thresholdRule = query('threshold')
  .optional()
  .isFloat({ min: 1, max: 100 })
  .withMessage('threshold must be between 1 and 100');

const semesterQuery = query('semester').optional().isInt({ min: 1, max: 12 }).withMessage('semester must be 1-12');

const myAttendanceRules = [semesterQuery, thresholdRule];

const adminListRules = [
  ...paginationRules,
  semesterQuery,
  thresholdRule,
  query('student').optional().isMongoId().withMessage('student must be a valid id'),
  query('subject').optional().isMongoId().withMessage('subject must be a valid id'),
];

const createAttendanceRules = [
  body('student').isMongoId().withMessage('student must be a valid id'),
  body('subject').isMongoId().withMessage('subject must be a valid id'),
  body('semester').isInt({ min: 1, max: 12 }).withMessage('semester must be 1-12'),
  body('classesAttended').isInt({ min: 0 }).withMessage('classesAttended must be a whole number, 0 or more'),
  body('totalClasses').isInt({ min: 0 }).withMessage('totalClasses must be a whole number, 0 or more'),
  body('dataSource').optional().isIn(DATA_SOURCES).withMessage(`dataSource must be one of: ${DATA_SOURCES.join(', ')}`),
];

const updateAttendanceRules = [
  idParam,
  body('classesAttended').optional().isInt({ min: 0 }).withMessage('classesAttended must be a whole number, 0 or more'),
  body('totalClasses').optional().isInt({ min: 0 }).withMessage('totalClasses must be a whole number, 0 or more'),
  body('dataSource').optional().isIn(DATA_SOURCES),
];

module.exports = {
  myAttendanceRules,
  adminListRules,
  createAttendanceRules,
  updateAttendanceRules,
};