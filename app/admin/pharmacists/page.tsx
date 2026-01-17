"use client"

import { UsersTable } from "@/components/users-table"

export default function PharmacistsPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-[#3A9BDC]">Pharmacist List</h1>
        <p className="text-gray-500 text-sm mt-1">Manage all pharmacists in the system</p>
      </div>

      <UsersTable role="pharmacist" />
    </div>
  )
}
