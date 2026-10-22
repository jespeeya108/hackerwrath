
import api from "./api";

const feeService = {
  getAllFees: () => api.get("/fees"),
  getFeeSummary: () => api.get("/fees/summary"),
  getPaymentHistory: () => api.get("/fees/payments"),
  getFeeById: (id) => api.get(`/fees/${encodeURIComponent(id)}`),
};

export default feeService;
