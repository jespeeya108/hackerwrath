const { body, query } = require('express-validator');
const { DATA_SOURCES } = require('../utils/constants');
const { idParam, paginationRules } = require('./commonValidators');

const fieldRules = (optional) => {
  const wrap = (chain) => (optional ? chain.optional() : chain);
  return [
    wrap(body('code').trim().notEmpty().withMessage('Subject code is required'))
      .isLength({ max: 20 }).withMessage('Code is too long'),
    wrap(body('name').trim().notEmpty().withMessage('Subject name is required'))
      .isLength({ max: 150 }),
    wrap(body('semester').isInt({ min: 1, max: 12 }).withMessage('Semester must be 1-12')),
    wrap(body('branch').trim().notEmpty().withMessage('Branch is required')),
    body('credits').optional().isFloat({ min: 0, max: 30 }).withMessage('Credits must be 0-30'),
    body('dataSource').optional().isIn(DATA_SOURCES).withMessage(`dataSource must be one of: ${DATA_SOURCES.join(', ')}`),
  ];
};

const createSubjectRules = fieldRules(false);
const updateSubjectRules = [idParam, ...fieldRules(true)];

const listSubjectRules = [
  ...paginationRules,
  query('semester').optional().isInt({ min: 1, max: 12 }).withMessage('semester must be 1-12'),
  query('branch').optional().isString().trim(),
  query('q').optional().isString().trim(),
];

module.exports = { createSubjectRules, updateSubjectRules, listSubjectRules, idParam };