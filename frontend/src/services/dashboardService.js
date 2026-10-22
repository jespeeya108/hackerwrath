
import api from "./api";

const dashboardService = {
  getDashboard: () => api.get("/dashboard"),
  getStats: () => api.get("/dashboard/stats"),
  getTodaySchedule: () => api.get("/timetable/today"),
  getUpcomingExams: () => api.get("/examinations/upcoming"),
  getAnnouncements: () => api.get("/announcements"),
};

export default dashboardService;
