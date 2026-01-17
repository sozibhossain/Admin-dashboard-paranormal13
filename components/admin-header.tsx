"use client";

import { useEffect, useState } from "react";
import type { User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sliders } from "lucide-react";

export function AdminHeader() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div
      className="flex items-center justify-between px-8 py-4 bg-gradient-to-b  border-b border-gray-200"
      style={{
        background: "#3A9BDC",
        borderRight: "1px solid",
        borderImageSource: "linear-gradient(180deg, #005B50 0%, #8289B6 100%)",
        borderImageSlice: 1,
      }}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600">
          Welcome back to your admin panel
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Sliders className="w-5 h-5 text-gray-600" />
        </button>

        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-600 capitalize">{user.role}</p>
            </div>
            <Avatar>
              <AvatarImage src={user.avatarUrl || "/placeholder.svg"} />
              <AvatarFallback>
                {user.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );
}
