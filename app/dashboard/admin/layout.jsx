"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FaHome,
  FaUsers,
  FaProjectDiagram,
  FaChartPie,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-blue-900 text-white transition-all ${
          open ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-4 font-bold">
          {open && "ProTrack"}
          <button onClick={() => setOpen(!open)}>
            {open ? "«" : "»"}
          </button>
        </div>

        <nav className="px-2 space-y-2">
          <Link href="/dashboard/admin" className="flex items-center gap-3 p-3 rounded hover:bg-blue-700">
            <FaHome /> {open && "Dashboard"}
          </Link>

          <Link href="/dashboard/admin/manage-users" className="flex items-center gap-3 p-3 rounded hover:bg-blue-700">
            <FaUsers /> {open && "Manage Users"}
          </Link>

          <Link href="#" className="flex items-center gap-3 p-3 rounded hover:bg-blue-700">
            <FaProjectDiagram /> {open && "Projects"}
          </Link>

          <Link href="#" className="flex items-center gap-3 p-3 rounded hover:bg-blue-700">
            <FaChartPie /> {open && "Analytics"}
          </Link>

          <Link href="#" className="flex items-center gap-3 p-3 rounded hover:bg-blue-700">
            <FaCog /> {open && "Settings"}
          </Link>
        </nav>

        <div className="p-4 border-t border-blue-700 mt-auto">
          <Link href="/login" className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded">
            <FaSignOutAlt /> {open && "Logout"}
          </Link>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between">
          <h1 className="text-xl font-semibold text-blue-900">
            Admin Panel
          </h1>
          <img
            src="/defult.png"
            className="w-10 h-10 rounded-full"
            alt="admin"
          />
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
