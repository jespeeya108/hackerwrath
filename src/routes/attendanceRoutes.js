const express = require('express');
const ctrl = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const v = require('../validators/attendanceValidators');

const router = express.Router();

router.use(protect);

// Student: own data only
router.get('/me', v.myAttendanceRules, validate, ctrl.getMyAttendance);
router.get('/me/summary', v.myAttendanceRules, validate, ctrl.getMyAttendanceSummary);

// Admin
router.get('/', authorize('admin'), v.adminListRules, validate, ctrl.listAttendance);
router.post('/', authorize('admin'), v.createAttendanceRules, validate, ctrl.createAttendance);
router.put('/:id', authorize('admin'), v.updateAttendanceRules, validate, ctrl.updateAttendance);

module.exports = router;