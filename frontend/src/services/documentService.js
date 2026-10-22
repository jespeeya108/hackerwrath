
import api from "./api";

const documentService = {
  getDocuments: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/documents${query ? `?${query}` : ""}`);
  },

  getDocumentById: (id) =>
    api.get(`/documents/${encodeURIComponent(id)}`),

  downloadDocument: async (id) => {
    const token = localStorage.getItem("campusone_token");
    const baseUrl = (
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
    ).replace(/\/+$/, "");

    const response = await fetch(
      `${baseUrl}/documents/${encodeURIComponent(id)}/download`,
      {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
      }
    );

    if (!response.ok) {
      throw new Error("Unable to download document");
    }

    return response.blob();
  },
};

export default documentService;
