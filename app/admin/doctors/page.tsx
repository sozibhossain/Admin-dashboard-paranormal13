"use client"

import { UsersTable } from "@/components/users-table"

export default function DoctorsPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-[#3A9BDC]">Doctors List</h1>
        <p className="text-gray-500 text-sm mt-1">Manage all doctors in the system</p>
      </div>

      <UsersTable role="doctor" />
    </div>
  )
}
