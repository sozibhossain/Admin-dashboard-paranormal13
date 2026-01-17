import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import RootLayoutContent from "./RootLayoutContent"

const _geist = { subsets: ["latin"] }
const _geistMono = { subsets: ["latin"] }

export const metadata: Metadata = {
  title: "MediRemind Admin Dashboard",
  description: "Admin dashboard for MediRemind healthcare platform",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RootLayoutContent>{children}</RootLayoutContent>
}
