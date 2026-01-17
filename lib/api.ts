import axios, { type AxiosInstance, type AxiosError } from "axios"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        if (typeof window !== "undefined") {
          const refreshToken = localStorage.getItem("refreshToken")
          if (refreshToken) {
            const response = await axios.post(`${baseURL}/auth/reset-refresh-token`, {
              refreshToken,
            })

            const { accessToken } = response.data.data
            localStorage.setItem("accessToken", accessToken)
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
            return api(originalRequest)
          }
        }
      } catch (err) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
          window.location.href = "/login"
        }
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  },
)

export default api
