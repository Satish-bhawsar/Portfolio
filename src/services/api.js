import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Request interceptor — attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("portfolio_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("portfolio_token");
      localStorage.removeItem("portfolio_admin");
      // Only redirect if in admin area
      if (window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// ── Auth ──────────────────────────────────────────────────
export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
  changePassword: (data) => api.put("/auth/change-password", data),
};

// ── Admin ─────────────────────────────────────────────────
export const adminAPI = {
  getProfile: () => api.get("/admin/profile"),
  updateProfile: (data) => api.put("/admin/profile", data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  updateEmail: (data) => api.put("/admin/email", data),
  getStats: () => api.get("/admin/stats"),
  // Contact messages
  getMessages: (params) => api.get("/admin/contact", { params }),
  getMessage: (id) => api.get(`/admin/contact/${id}`),
  updateMessageStatus: (id, status) => api.patch(`/admin/contact/${id}/status`, { status }),
  deleteMessage: (id) => api.delete(`/admin/contact/${id}`),
};

// ── Generic CRUD factory ───────────────────────────────────
const createResourceAPI = (resource) => ({
  getAll: (params) => api.get(`/${resource}`, { params }),
  getOne: (id) => api.get(`/${resource}/${id}`),
  create: (data, isFormData = false) =>
    api.post(`/${resource}`, data, isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {}),
  update: (id, data, isFormData = false) =>
    api.put(`/${resource}/${id}`, data, isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {}),
  remove: (id) => api.delete(`/${resource}/${id}`),
  toggle: (id) => api.patch(`/${resource}/${id}/toggle`),
  reorder: (items) => api.put(`/${resource}/reorder`, { items }),
});

// ── Public APIs (portfolio sections) ─────────────────────
export const heroAPI = createResourceAPI("hero");
export const skillsAPI = createResourceAPI("skills");
export const projectsAPI = createResourceAPI("projects");
export const experienceAPI = createResourceAPI("experience");
export const educationAPI = createResourceAPI("education");
export const certificatesAPI = createResourceAPI("certificates");
export const achievementsAPI = createResourceAPI("achievements");
export const testimonialsAPI = createResourceAPI("testimonials");
export const blogsAPI = createResourceAPI("blogs");
export const contactAPI = {
  submit: (data) => api.post("/contact", data),
};
