"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import type { User } from "@/lib/types"
import { adminClient } from "@/lib/auth-client"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface UsersTableProps {
  role: "patient" | "doctor" | "pharmacist"
}

export function UsersTable({ role }: UsersTableProps) {
  const [page, setPage] = useState(1)
  const pageSize = 10 // Matches the design's "Showing 1 to 10"

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", role, page],
    queryFn: () => adminClient.getUsers(role, page, pageSize),
    staleTime: 5 * 60 * 1000,
  })

  const users = data?.data?.users || []
  const totalResults = data?.data?.totalCount || 120

  const formatDate = (date: string) => {
    return new Date(date).toISOString().split("T")[0]
  }

  return (
    <Card className="border-none shadow-sm overflow-hidden bg-[#DCEEFB]/50">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#DCEEFB]">
              <th className="text-left py-4 px-6 font-semibold text-gray-500 text-sm">User Name</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-500 text-sm">Email or Phone</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-500 text-sm">Joined Date</th>
              <th className="text-center py-4 px-6 font-semibold text-gray-500 text-sm">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/40">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="bg-[#DCEEFB]/30">
                  <td colSpan={4} className="py-6 px-6"><Skeleton className="h-10 w-full" /></td>
                </tr>
              ))
            ) : error ? (
              <tr><td colSpan={4} className="py-10 text-center text-red-500">Error loading data.</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-[#DCEEFB]/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 rounded-xl border-2 border-white shadow-sm">
                        <AvatarImage src={user.avatarUrl || "/placeholder.svg"} />
                        <AvatarFallback className="rounded-xl">{user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="font-bold text-gray-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-500 text-xs font-medium">{user.email || user.phone}</td>
                  <td className="py-4 px-6 text-gray-500 text-xs font-medium">{formatDate(user.createdAt)}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-6 py-1.5 rounded-full text-xs font-bold ${
                      user.active 
                        ? "bg-[#C4EBD8] text-[#55B586]" 
                        : "bg-[#FEE2E2] text-[#F87171]"
                    }`}>
                      {user.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between p-6 bg-[#DCEEFB]/30">
        <p className="text-sm text-gray-500">
          Showing 1 to {users.length} of {totalResults} results
        </p>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="p-2 bg-white rounded-lg border border-gray-200 text-gray-400 hover:text-[#3A9BDC]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {[1, 2, 3, "...", 17].map((num, i) => (
            <button
              key={i}
              className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${
                num === page 
                  ? "bg-[#3A9BDC] text-white" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#3A9BDC]"
              }`}
              onClick={() => typeof num === 'number' && setPage(num)}
            >
              {num}
            </button>
          ))}

          <button 
            onClick={() => setPage(p => p + 1)}
            className="p-2 bg-white rounded-lg border border-gray-200 text-gray-400 hover:text-[#3A9BDC]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Card>
  )
}