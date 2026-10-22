const { param, query } = require('express-validator');

const idParam = param('id').isMongoId().withMessage('Invalid id');

const paginationRules = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be 1 or more'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100'),
];

module.exports = { idParam, paginationRules };