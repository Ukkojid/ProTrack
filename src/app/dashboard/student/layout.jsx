"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaHome,
  FaProjectDiagram,
  FaUpload,
  FaComments,
  FaUser,
  FaCog,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";

export default function StudentLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-blue-900 text-white transition-all duration-300 flex flex-col ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-4 font-semibold text-lg">
          {sidebarOpen && <span>ProTrack</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "«" : "»"}
          </button>
        </div>

        <nav className="flex-1 px-2 space-y-1">
          <NavItem href="/dashboard/student" icon={<FaHome />} label="Dashboard" open={sidebarOpen} />
          <NavItem href="/dashboard/student/projects" icon={<FaProjectDiagram />} label="Projects" open={sidebarOpen} />
          <NavItem href="/dashboard/student/submissions" icon={<FaUpload />} label="Submissions" open={sidebarOpen} />
          <NavItem href="/dashboard/student/feedback" icon={<FaComments />} label="Feedback" open={sidebarOpen} />
          <NavItem href="/dashboard/student/profile" icon={<FaUser />} label="Profile" open={sidebarOpen} />
          <NavItem href="/dashboard/student/settings" icon={<FaCog />} label="Settings" open={sidebarOpen} />
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/login";
            }}
            className="flex items-center space-x-3 p-2 rounded hover:bg-blue-800 w-full"
          >
            <FaSignOutAlt />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
          <h1 className="text-lg font-medium text-gray-800">
            Student Dashboard
          </h1>

          <div className="flex items-center space-x-5">
            <FaBell className="text-gray-600 text-lg cursor-pointer" />
            <div className="flex items-center space-x-2">
              <img
                src="/defult.png"
                alt="profile"
                className="w-9 h-9 rounded-full"
              />
              <span className="text-sm text-gray-700">
                {user?.name || "Student"}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, open }) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 p-3 rounded hover:bg-blue-800 transition"
    >
      {icon}
      {open && <span>{label}</span>}
    </Link>
  );
}
