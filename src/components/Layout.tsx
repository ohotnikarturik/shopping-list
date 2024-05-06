import { Outlet } from "react-router-dom"
import { Suspense, useState } from "react"

import AppBar from "./AppBar"
import Sidebar from "./Sidebar"

const SIDEBAR_OPEN = "SHOPPING_LIST_SIDEBAR_OPEN"

const getStoredSidebarValue = () => {
  const storedValue = localStorage.getItem(SIDEBAR_OPEN)
  if (!storedValue) return true
  return JSON.parse(storedValue)
}

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(getStoredSidebarValue)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    localStorage.setItem(SIDEBAR_OPEN, JSON.stringify(!isSidebarOpen))
  }

  return (
    <div className="flex h-screen divide-x">
      <Sidebar open={isSidebarOpen} />
      <div className="w-full flex flex-col divide-y">
        <AppBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 p-4 overflow-auto">
          <Suspense fallback={<div>Page is Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
        <footer>Footer</footer>
      </div>
    </div>
  )
}
export default Layout
