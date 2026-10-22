const mongoose = require('mongoose');
const config = require('../config/env');
const User = require('../models/User');
const Subject = require('../models/Subjects');
const Attendance = require('../models/Attendance');

// All data below is SAMPLE data. Subject codes are prefixed with DEMO- on purpose.
const DEMO_STUDENT = {
  name: 'Demo Student',
  email: 'student1@example.com',
  password: 'Student123',
  rollNumber: 'DEMO-CSE-001',
  branch: 'CSE',
  semester: 4,
  graduationYear: 2027,
};

const DEMO_SUBJECTS = [
  { code: 'DEMO-CS201', name: 'Data Structures', credits: 4, attended: 38, total: 45 },   // safe
  { code: 'DEMO-CS202', name: 'Database Management Systems', credits: 4, attended: 30, total: 48 }, // shortage
  { code: 'DEMO-CS203', name: 'Operating Systems', credits: 3, attended: 33, total: 44 },  // exactly 75%
  { code: 'DEMO-CS204', name: 'Computer Networks', credits: 3, attended: 20, total: 30 },  // shortage
  { code: 'DEMO-CS205', name: 'Software Engineering', credits: 3, attended: 0, total: 0 }, // no classes yet
];

const run = async () => {
  await mongoose.connect(config.mongoUri);

  // Student: reuse if it exists, otherwise create
  let student = await User.findOne({ email: DEMO_STUDENT.email });
  if (!student) student = await User.create(DEMO_STUDENT);

  // Remove only previous DEMO records, then recreate
  await Attendance.deleteMany({ dataSource: 'demo' });
  await Subject.deleteMany({ dataSource: 'demo' });

  const subjects = await Subject.insertMany(
    DEMO_SUBJECTS.map((s) => ({
      code: s.code,
      name: s.name,
      credits: s.credits,
      semester: 4,
      branch: 'CSE',
      dataSource: 'demo',
    }))
  );

  await Attendance.insertMany(
    subjects.map((subject, i) => ({
      student: student._id,
      subject: subject._id,
      semester: 4,
      classesAttended: DEMO_SUBJECTS[i].attended,
      totalClasses: DEMO_SUBJECTS[i].total,
      dataSource: 'demo',
    }))
  );

  console.log(`Seeded ${subjects.length} demo subjects and attendance for ${student.email}`);
  console.log(`Demo student id: ${student._id}`);
  console.log('Demo login -> email: student1@example.com | password: Student123');

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});