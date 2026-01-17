"use client"

import { useQuery } from "@tanstack/react-query"
import { Card } from "@/components/ui/card"
import { adminClient } from "@/lib/auth-client"
import { Users, Stethoscope, Pill, Filter } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

// Mock chart data based on your UI image
const chartData = [
  { name: '3 Oct', thisMonth: 1800, lastMonth: 400 },
  { name: '10 Oct', thisMonth: 2600, lastMonth: 1200 },
  { name: '14 Oct', thisMonth: 2200, lastMonth: 1100 },
  { name: '20 Oct', thisMonth: 3800, lastMonth: 2800 },
  { name: '23 Oct', thisMonth: 2000, lastMonth: 3700 },
  { name: '27 Oct', thisMonth: 1000, lastMonth: 3000 },
  { name: '30 Oct', thisMonth: 3600, lastMonth: 2000 },
];

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => adminClient.getStats(),
    staleTime: 5 * 60 * 1000,
  })

  const stats = data?.data?.stats || {}
  const recentOrders = data?.data?.recentOrders || []

  const statsCards = [
    {
      label: "Total Users",
      value: stats.totalPatients || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      borderColor: "border-b-blue-400",
    },
    {
      label: "Total Doctors",
      value: stats.totalDoctors || 0,
      icon: Stethoscope,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      borderColor: "border-b-indigo-400",
    },
    {
      label: "Total Pharmacist",
      value: stats.totalPharmacists || 0,
      icon: Pill,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      borderColor: "border-b-purple-400",
    },
  ]

  return (
    <div className="py-4 bg-slate-50 min-h-screen space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[#3A9BDC]">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back to your admin panel</p>
        </div>
        <Button variant="outline" className="gap-2 text-[#3A9BDC] border-[#3A9BDC]">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3].map((i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)
        ) : (
          statsCards.map((stat, i) => (
            <Card key={i} className={`p-6 border-b-4 ${stat.borderColor} rounded-xl shadow-sm border-x-0 border-t-0 bg-white/80`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-gray-500 font-medium mt-1">{stat.label}</p>
                </div>
                <div className={`${stat.bgColor} p-4 rounded-full`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Chart Section */}
      <Card className="p-6 rounded-xl shadow-sm border-none bg-white">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-gray-800">Sell Report</h2>
          <div className="flex bg-gray-100 p-1 rounded-lg text-xs font-semibold">
            <button className="px-4 py-1.5 rounded-md">Day</button>
            <button className="px-4 py-1.5 rounded-md">Week</button>
            <button className="px-4 py-1.5 bg-[#3A9BDC] text-white rounded-md shadow-sm">Month</button>
            <button className="px-4 py-1.5 rounded-md">Year</button>
          </div>
        </div>
        
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <Tooltip />
              <Line type="monotone" dataKey="thisMonth" stroke="#22c55e" strokeWidth={3} dot={{ r: 6, fill: '#fff', strokeWidth: 2 }} />
              <Line type="monotone" dataKey="lastMonth" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6, fill: '#fff', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-6 mt-4 ml-10 text-xs font-medium text-gray-500">
           <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"/> This Month</div>
           <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"/> Last Month</div>
        </div>
      </Card>

      {/* Recent Orders Table */}
      <Card className="p-6 rounded-xl shadow-sm border-none bg-white">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-4 font-semibold text-gray-600">Patient</th>
                <th className="pb-4 font-semibold text-gray-600">Medicine</th>
                <th className="pb-4 font-semibold text-gray-600">Address</th>
                <th className="pb-4 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order: any) => (
                <tr key={order._id} className="text-sm">
                  <td className="py-4 font-medium">{order.patient.name}</td>
                  <td className="py-4 text-gray-600">
                    {order.medicines.map((m: any) => `${m.name} (${m.dosage})`).join(", ")}
                  </td>
                  <td className="py-4 text-gray-500 truncate max-w-[200px]">{order.address}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold capitalize">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}