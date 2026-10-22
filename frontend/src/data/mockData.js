
export const mockDashboardStats = [
  {
    title: "Attendance",
    value: "92%",
    subtitle: "Overall attendance",
    color: "blue",
    trend: "+4%",
    trendLabel: "this month",
  },
  {
    title: "CGPA",
    value: "8.6",
    subtitle: "Current CGPA",
    color: "purple",
  },
  {
    title: "Pending Fees",
    value: "₹12,500",
    subtitle: "Outstanding amount",
    color: "orange",
  },
  {
    title: "Upcoming Exams",
    value: "3",
    subtitle: "Exams scheduled",
    color: "green",
  },
];

export const mockSchedule = [
  {
    id: 1,
    subject: "Database Management Systems",
    code: "CSE-301",
    time: "09:00 AM - 10:00 AM",
    room: "Room 204",
    faculty: "Dr. Sharma",
  },
  {
    id: 2,
    subject: "Operating Systems",
    code: "CSE-302",
    time: "10:15 AM - 11:15 AM",
    room: "Room 108",
    faculty: "Prof. Kaur",
  },
  {
    id: 3,
    subject: "Computer Networks",
    code: "CSE-303",
    time: "12:00 PM - 01:00 PM",
    room: "Lab 3",
    faculty: "Dr. Singh",
  },
];

export const mockUpcomingExams = [
  {
    id: 1,
    subject: "Database Management Systems",
    code: "CSE-301",
    date: "2026-11-05",
    time: "10:00 AM",
    venue: "Exam Hall A",
  },
  {
    id: 2,
    subject: "Operating Systems",
    code: "CSE-302",
    date: "2026-11-08",
    time: "02:00 PM",
    venue: "Exam Hall B",
  },
  {
    id: 3,
    subject: "Computer Networks",
    code: "CSE-303",
    date: "2026-11-12",
    time: "10:00 AM",
    venue: "Exam Hall A",
  },
];

export const mockAnnouncements = [
  {
    id: 1,
    title: "End Semester Examination Schedule",
    description:
      "The end semester examination schedule has been published.",
    date: "2026-10-20",
    category: "Examinations",
  },
  {
    id: 2,
    title: "Library Book Return Reminder",
    description:
      "Students are requested to return overdue library books.",
    date: "2026-10-18",
    category: "Library",
  },
  {
    id: 3,
    title: "Fee Payment Notice",
    description:
      "Please clear pending semester fees before the due date.",
    date: "2026-10-15",
    category: "Fees",
  },
];

export const mockCourses = [
  {
    id: 1,
    code: "CSE-301",
    name: "Database Management Systems",
    credits: 4,
    faculty: "Dr. Sharma",
    attendance: 94,
    grade: "A",
  },
  {
    id: 2,
    code: "CSE-302",
    name: "Operating Systems",
    credits: 4,
    faculty: "Prof. Kaur",
    attendance: 89,
    grade: "A-",
  },
  {
    id: 3,
    code: "CSE-303",
    name: "Computer Networks",
    credits: 3,
    faculty: "Dr. Singh",
    attendance: 92,
    grade: "B+",
  },
];

export const mockTimetable = [
  {
    id: 1,
    day: "Monday",
    startTime: "09:00",
    endTime: "10:00",
    subject: "Database Management Systems",
    code: "CSE-301",
    room: "Room 204",
    faculty: "Dr. Sharma",
  },
  {
    id: 2,
    day: "Monday",
    startTime: "10:15",
    endTime: "11:15",
    subject: "Operating Systems",
    code: "CSE-302",
    room: "Room 108",
    faculty: "Prof. Kaur",
  },
  {
    id: 3,
    day: "Tuesday",
    startTime: "09:00",
    endTime: "10:00",
    subject: "Computer Networks",
    code: "CSE-303",
    room: "Lab 3",
    faculty: "Dr. Singh",
  },
];

export const mockDocuments = [
  {
    id: 1,
    name: "Academic Calendar 2026",
    category: "Academic",
    type: "PDF",
    date: "2026-08-01",
    url: "/documents/academic-calendar-2026.pdf",
  },
  {
    id: 2,
    name: "Examination Guidelines",
    category: "Examinations",
    type: "PDF",
    date: "2026-09-10",
    url: "/documents/examination-guidelines.pdf",
  },
];

export const mockFees = [
  {
    id: 1,
    title: "Semester Tuition Fee",
    amount: 25000,
    paid: 25000,
    dueDate: "2026-08-15",
    status: "Paid",
  },
  {
    id: 2,
    title: "Examination Fee",
    amount: 5000,
    paid: 0,
    dueDate: "2026-11-01",
    status: "Pending",
  },
];

export const mockNotifications = [
  {
    id: 1,
    title: "New examination schedule",
    message: "The end semester examination schedule is now available.",
    date: "2026-10-20",
    read: false,
  },
  {
    id: 2,
    title: "Fee payment reminder",
    message: "Please review your pending fee balance.",
    date: "2026-10-18",
    read: true,
  },
];

export const mockStudent = {
  id: "STU2026001",
  name: "Aarav Sharma",
  email: "student@example.com",
  phone: "+91 98765 43210",
  program: "Bachelor of Technology",
  department: "Computer Science and Engineering",
  semester: 5,
  rollNumber: "2023CSE001",
  enrollmentYear: 2023,
};
