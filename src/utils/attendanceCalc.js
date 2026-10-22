const round2 = (n) => Math.round(n * 100) / 100;

// (attended / total) * 100, safe against division by zero
const calculatePercentage = (attended, total) => {
  if (!Number.isFinite(attended) || !Number.isFinite(total) || total <= 0) return 0;
  return round2((attended / total) * 100);
};

// Exact integer comparison, so 74.999% is never shown as "safe" due to rounding
const meetsThreshold = (attended, total, threshold) => attended * 100 >= threshold * total;

const getStatus = (attended, total, threshold) => {
  if (total === 0) return 'no_classes';
  return meetsThreshold(attended, total, threshold) ? 'safe' : 'shortage';
};

// Consecutive classes the student must attend (without missing any) to reach the threshold.
// Solves (a + x) / (t + x) >= th / 100  ->  x >= (th*t - 100*a) / (100 - th)
// Returns null when mathematically impossible (threshold >= 100 but already missed a class).
const classesNeededForThreshold = (attended, total, threshold) => {
  if (total === 0 || meetsThreshold(attended, total, threshold)) return 0;
  if (threshold >= 100) return null;
  return Math.ceil((threshold * total - 100 * attended) / (100 - threshold));
};

// How many future classes can be skipped while staying at or above the threshold
const classesCanSkip = (attended, total, threshold) => {
  if (total === 0 || !meetsThreshold(attended, total, threshold)) return 0;
  return Math.floor((100 * attended - threshold * total) / threshold);
};

// Turns one Attendance record into the object the frontend receives
const withStats = (record, threshold) => {
  const { classesAttended, totalClasses } = record;
  return {
    _id: record._id,
    subject: record.subject,
    semester: record.semester,
    classesAttended,
    totalClasses,
    percentage: calculatePercentage(classesAttended, totalClasses),
    status: getStatus(classesAttended, totalClasses, threshold),
    classesNeededForThreshold: classesNeededForThreshold(classesAttended, totalClasses, threshold),
    classesCanSkip: classesCanSkip(classesAttended, totalClasses, threshold),
    dataSource: record.dataSource,
    updatedAt: record.updatedAt,
  };
};

module.exports = {
  calculatePercentage,
  getStatus,
  classesNeededForThreshold,
  classesCanSkip,
  withStats,
};