export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: "admin" | "doctor" | "patient" | "pharmacist"
  avatarUrl: string
  doctorStatus: "pending" | "approved" | "rejected"
  active: boolean
  createdAt: string
  updatedAt?: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    accessToken: string
    refreshToken: string
    role: string
    _id: string
    user: User
  }
}

export interface AdminStats {
  totalPatients: number
  totalDoctors: number
  totalPharmacists: number
}

export interface UsersResponse {
  success: boolean
  message: string
  data: {
    users: User[]
  }
}

export interface AuthError {
  response?: {
    data: {
      message: string
    }
  }
}
