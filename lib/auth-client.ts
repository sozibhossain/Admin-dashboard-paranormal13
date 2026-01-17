import api from "./api"
import type { LoginResponse, UsersResponse } from "./types"

export const authClient = {
  login: async (email: string, password: string) => {
    const response = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    })
    return response.data
  },

  forgotPassword: async (email: string) => {
    const response = await api.post("/auth/forgotPassword", { email })
    return response.data
  },

  verifyResetCode: async (email: string, resetCode: string) => {
    const response = await api.post("/auth/verifyResetCode", {
      email,
      resetCode,
    })
    return response.data
  },

  resetPassword: async (email: string, resetCode: string, newPassword: string, newPasswordConfirm: string) => {
    const response = await api.post("/auth/resetPassword", {
      email,
      resetCode,
      newPassword,
      newPasswordConfirm,
    })
    return response.data
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    const response = await api.post("/auth/change-password", {
      oldPassword,
      newPassword,
    })
    return response.data
  },
}

export const adminClient = {
  getStats: async () => {
    const response = await api.get("/admin/stats")
    return response.data
  },

  getUsers: async (role: "patient" | "doctor" | "pharmacist", page: number, limit: number) => {
    const response = await api.get<UsersResponse>(`/admin/users?role=${role}&page=${page}&limit=${limit}`)
    return response.data
  },

  updateUserStatus: async (userId: string, status: string) => {
    const response = await api.put(`/admin/users/${userId}/status`, {
      doctorStatus: status,
    })
    return response.data
  },
}
