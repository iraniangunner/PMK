import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

declare module "axios" {
  export interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }
  export interface InternalAxiosRequestConfig {
    requiresAuth?: boolean;
    _retry?: boolean;
  }
}

const api = axios.create({
  baseURL: API_URL,
});

// ----------------------
// Request Interceptor
// ----------------------
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (config.requiresAuth) {
    try {
      const res = await fetch("/api/token");
      const data = await res.json();

      if (data.token) {
        config.headers.set("Authorization", `Bearer ${data.token}`);
      }
    } catch (err) {
      console.error("Error fetching token:", err);
    }
  }
  return config;
});

// ----------------------
// Response Interceptor (Token Refresh)
// ----------------------
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else if (token) prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/logout")
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const res = await fetch("/api/refresh-token", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Refresh failed");
      }

      const newToken = data.access_token;

      processQueue(null, newToken);
      isRefreshing = false;

      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      isRefreshing = false;

      window.dispatchEvent(new Event("auth:logout"));

      return Promise.reject(err);
    }
  }
);

export default api;

/*
|--------------------------------------------------------------------------
| API Functions
|--------------------------------------------------------------------------
*/

// Auth
export const authAPI = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  logout: () =>
    api.post("/auth/logout", {}, { requiresAuth: true }),
  me: () =>
    api.get("/auth/me", { requiresAuth: true }),
};
// Brands
export const brandAPI = {
    getAll: () => api.get("/brands"),
    getOne: (id: number) => api.get(`/brands/${id}`),
    create: (data: { name: string; description?: string }) =>
      api.post("/admin/brands", data, { requiresAuth: true }),
    update: (id: number, data: { name: string; description?: string }) =>
      api.post(`/admin/brands/${id}`, data, { requiresAuth: true }),
    delete: (id: number) =>
      api.delete(`/admin/brands/${id}`, { requiresAuth: true }),
  };
// Categories
export const categoryAPI = {
  getAll: () => api.get("/categories"),
  getOne: (id: number) => api.get(`/categories/${id}`),
  create: (data: object) =>
    api.post("/admin/categories", data, { requiresAuth: true }),
  update: (id: number, data: object) =>
    api.post(`/admin/categories/${id}`, data, { requiresAuth: true }),
  delete: (id: number) =>
    api.delete(`/admin/categories/${id}`, { requiresAuth: true }),
};

// Products
export const productAPI = {
  getAll: (params?: object) => api.get("/products", { params }),
  getOne: (id: number) => api.get(`/products/${id}`),
  create: (data: FormData) =>
    api.post("/admin/products", data, { requiresAuth: true }),
  update: (id: number, data: FormData) =>
    api.post(`/admin/products/${id}`, data, { requiresAuth: true }),
  delete: (id: number) =>
    api.delete(`/admin/products/${id}`, { requiresAuth: true }),
};

// Representatives
export const representativeAPI = {
  getAll: (params?: object) => api.get("/representatives", { params }),
  getOne: (id: number) => api.get(`/representatives/${id}`),
  create: (data: object) =>
    api.post("/admin/representatives", data, { requiresAuth: true }),
  update: (id: number, data: object) =>
    api.post(`/admin/representatives/${id}`, data, { requiresAuth: true }),
  delete: (id: number) =>
    api.delete(`/admin/representatives/${id}`, { requiresAuth: true }),
};

// Contacts
export const contactAPI = {
  send: (data: object) => api.post("/contacts", data),
  getAll: () => api.get("/admin/contacts", { requiresAuth: true }),
  getOne: (id: number) =>
    api.get(`/admin/contacts/${id}`, { requiresAuth: true }),
  delete: (id: number) =>
    api.delete(`/admin/contacts/${id}`, { requiresAuth: true }),
};

// Damage Forms
export const damageFormAPI = {
  submit: (data: object) => api.post("/damage-forms", data),
  getAll: () => api.get("/admin/damage-forms", { requiresAuth: true }),
  getOne: (id: number) =>
    api.get(`/admin/damage-forms/${id}`, { requiresAuth: true }),
  updateStatus: (id: number, status: string) =>
    api.patch(
      `/admin/damage-forms/${id}/status`,
      { status },
      { requiresAuth: true }
    ),
};

// Complaint Forms
export const complaintFormAPI = {
  submit: (data: object) => api.post("/complaint-forms", data),
  getAll: () => api.get("/admin/complaint-forms", { requiresAuth: true }),
  getOne: (id: number) =>
    api.get(`/admin/complaint-forms/${id}`, { requiresAuth: true }),
  updateStatus: (id: number, status: string) =>
    api.patch(
      `/admin/complaint-forms/${id}/status`,
      { status },
      { requiresAuth: true }
    ),
};

// Survey Forms
export const surveyFormAPI = {
  submit: (data: object) => api.post("/survey-forms", data),
  getAll: () => api.get("/admin/survey-forms", { requiresAuth: true }),
  getOne: (id: number) =>
    api.get(`/admin/survey-forms/${id}`, { requiresAuth: true }),
};
