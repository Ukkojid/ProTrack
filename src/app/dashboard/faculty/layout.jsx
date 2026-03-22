"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaHome,
  FaUsers,
  FaProjectDiagram,
  FaComments,
  FaSignOutAlt,
} from "react-icons/fa";

export default function FacultyLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-blue-900 text-white ${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 font-bold text-xl">
          {sidebarOpen && "ProTrack"}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "«" : "»"}
          </button>
        </div>

        <nav className="flex-1 px-2 space-y-2 ">
          <SidebarLink href="/dashboard/faculty" icon={<FaHome />} label="Dashboard" open={sidebarOpen} />
          <SidebarLink href="/dashboard/faculty/my-students" icon={<FaUsers />} label="My Students" open={sidebarOpen} />
          <SidebarLink href="/dashboard/faculty/projects" icon={<FaProjectDiagram />} label="Projects" open={sidebarOpen} />
          <SidebarLink href="/dashboard/faculty/feedback" icon={<FaComments />} label="Feedback" open={sidebarOpen} />
          <SidebarLink href="/dashboard/faculty/submissions" icon={<FaComments />} label="Submissions" open={sidebarOpen} />
        </nav>

        <div className="p-4 border-t border-blue-700">
          <Link
            href="/login"
            className="flex items-center space-x-3 p-2 rounded hover:bg-blue-700"
          >
            <FaSignOutAlt />
            {sidebarOpen && <span>Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-900">
            Welcome{user?.name ? `, ${user.name}` : ""}
          </h1>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

function SidebarLink({ href, icon, label, open }) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700 transition"
    >
      {icon}
      {open && <span>{label}</span>}
    </Link>
  );
}
