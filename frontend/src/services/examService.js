
import api from "./api";

const examService = {
  getAllExams: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/examinations${query ? `?${query}` : ""}`);
  },

  getUpcomingExams: () => api.get("/examinations/upcoming"),

  getExamById: (id) =>
    api.get(`/examinations/${encodeURIComponent(id)}`),
};

export default examService;
