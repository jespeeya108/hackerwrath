
import api from "./api";

const timetableService = {
  getTimetable: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/timetable${query ? `?${query}` : ""}`);
  },

  getToday: () => api.get("/timetable/today"),
  getByDay: (day) =>
    api.get(`/timetable/day/${encodeURIComponent(day)}`),
};

export default timetableService;
