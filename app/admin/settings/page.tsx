"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      return toast.error("New passwords do not match")
    }

    setLoading(true)
    try {
      await authClient.changePassword(passwords.currentPassword, passwords.newPassword)
      toast.success("Password updated successfully")
      setPasswords({ currentPassword: "", newPassword: "", confirmNewPassword: "" })
    } catch (error) {
      toast.error("Failed to update password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Setting</h1>
        <p className="text-gray-500 text-sm">Edit your personal information</p>
      </div>

      {/* Profile Section */}
      <Card className="p-6 border-[#3A9BDC]/30 bg-[#DCEEFB]/20 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-24 h-24 border-2 border-white shadow-sm">
            <AvatarImage src="/admin-avatar.jpg" alt="Mr. Raja" />
            <AvatarFallback>RJ</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Mr. Raja</h2>
            <p className="text-gray-500 text-sm">@admin</p>
          </div>
        </div>
        <Button 
          variant="secondary" 
          className="bg-[#3A9BDC] hover:bg-[#2d7fb6] text-white px-8 rounded-lg"
        >
          Edit
        </Button>
      </Card>

      {/* Change Password Section */}
      <Card className="p-8 border-[#3A9BDC]/30 bg-[#DCEEFB]/20 rounded-2xl">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Change password</h3>
        
        <form onSubmit={handleChangePassword} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Current Password</label>
              <Input
                type="password"
                placeholder="................."
                className="bg-[#DCEEFB]/40 border-[#3A9BDC]/20 h-12 rounded-xl focus-visible:ring-[#3A9BDC]"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">New Password</label>
              <Input
                type="password"
                placeholder="................."
                className="bg-[#DCEEFB]/40 border-[#3A9BDC]/20 h-12 rounded-xl focus-visible:ring-[#3A9BDC]"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
              <Input
                type="password"
                placeholder="................."
                className="bg-[#DCEEFB]/40 border-[#3A9BDC]/20 h-12 rounded-xl focus-visible:ring-[#3A9BDC]"
                value={passwords.confirmNewPassword}
                onChange={(e) => setPasswords({...passwords, confirmNewPassword: e.target.value})}
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-[#3A9BDC] hover:bg-[#2d7fb6] text-white px-10 h-12 rounded-xl text-md font-medium"
            >
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}