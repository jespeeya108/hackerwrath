
import api from "./api";

const academicService = {
  getCourses: () => api.get("/academics/courses"),
  getResults: () => api.get("/academics/results"),
  getAttendance: () => api.get("/academics/attendance"),
  getAcademicSummary: () => api.get("/academics/summary"),
};

export default academicService;
