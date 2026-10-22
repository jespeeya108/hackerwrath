const express = require('express');
const ctrl = require('../controllers/subjectController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  createSubjectRules, updateSubjectRules, listSubjectRules, idParam,
} = require('../validators/subjectValidators');

const router = express.Router();

router.use(protect); // every subject route needs a valid token

router.get('/', listSubjectRules, validate, ctrl.listSubjects);
router.get('/:id', idParam, validate, ctrl.getSubject);

router.post('/', authorize('admin'), createSubjectRules, validate, ctrl.createSubject);
router.put('/:id', authorize('admin'), updateSubjectRules, validate, ctrl.updateSubject);
router.delete('/:id', authorize('admin'), idParam, validate, ctrl.deleteSubject);

module.exports = router;