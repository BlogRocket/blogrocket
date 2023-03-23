import Navbar from "@/components/common/Navbar"
import Sidebar from "@/components/common/Sidebar"
import React, { PropsWithChildren } from "react"

const LINKS = [
  { to: "", label: "Dashboard" },
  { to: "access", label: "Manage access" },
]

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <div className="lg:hidden">
        <Navbar links={LINKS} />
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <aside className="hidden lg:block fixed z-20 inset-0 top-0 left-0 right-auto w-[19.5rem]">
          <Sidebar />
        </aside>
        <div className="max-w-4xl lg:ml-[19.5rem]">
          {children}
        </div>
      </div>
    </main>
  )
}