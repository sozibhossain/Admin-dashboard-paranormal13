"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Users, Stethoscope, Pill, Settings, LogOut } from "lucide-react"
import Image from "next/image"

// UI Components (Ensure these are installed via shadcn: npx shadcn-ui@latest add dialog button)
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const menuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "User List", icon: Users },
  { href: "/admin/doctors", label: "Doctors List", icon: Stethoscope },
  { href: "/admin/pharmacists", label: "Pharmacist List", icon: Pill },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const handleLogout = () => {
    localStorage.clear()
    router.push("/login")
  }

  return (
    <>
      <div 
        className="w-64 h-screen sticky top-0 flex flex-col text-white"
        style={{
          background: "#3A9BDC",
          borderRight: "1px solid",
          borderImageSource: "linear-gradient(180deg, #005B50 0%, #8289B6 100%)",
          borderImageSlice: 1
        }}
      >
        {/* Fixed Logo Section */}
        <div className="p-10 flex justify-center">
          <div className="w-32 h-32 rounded-[24px] bg-gradient-to-b from-[#83E9D2] to-[#3A9BDC] flex flex-col items-center justify-center shadow-lg">
            <div className="">
               {/* Use your actual pill/clock icon here */}
               <Image src="/logo.png" alt="Icon" width={500} height={500} className="w-[67px] h-[61px]" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.href)

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-4 px-4 py-4 rounded-lg transition-all ${
                    isActive 
                      ? "bg-[#E8F1F8] text-[#3A9BDC] shadow-sm" 
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? "text-[#3A9BDC]" : "text-white"}`} />
                  <span className="text-lg font-medium">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-6">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center gap-4 px-4 py-3 w-full text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <LogOut className="w-6 h-6" />
            <span className="text-lg font-medium">Log Out</span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <DialogContent className="sm:max-w-[400px] border-none">
          <DialogHeader className="flex flex-col items-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <LogOut className="w-6 h-6 text-red-600" />
            </div>
            <DialogTitle className="text-xl">Confirm Logout</DialogTitle>
            <DialogDescription className="text-center text-gray-500">
              Are you sure you want to log out? You will need to login again to access your dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-3 sm:justify-center mt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsLogoutModalOpen(false)}
              className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              No, Stay
            </Button>
            <Button 
              onClick={handleLogout}
              className="flex-1 bg-[#3A9BDC] hover:bg-[#2d7fb6] text-white"
            >
              Yes, Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}