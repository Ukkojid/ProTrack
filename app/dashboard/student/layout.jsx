"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaProjectDiagram,
  FaUpload,
  FaComments,
  FaUser,
  FaCog,
  FaBell,
  FaSignOutAlt,
  FaStream,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function StudentLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [studentId, setStudentId] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setStudentId(data._id);
      })
      .catch(() => setUser(null));
  }, []);

  const isActive = (href) => {
    if (href === "/dashboard/student") return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-blue-900 text-white flex flex-col z-20 transition-all duration-200 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-blue-800">
          {sidebarOpen && (
            <span className="font-semibold text-lg tracking-wide">
              ProTrack
            </span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? (
              <FaChevronLeft size={14} />
            ) : (
              <FaChevronRight size={14} />
            )}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          <NavItem
            href="/dashboard/student"
            icon={<FaHome />}
            label="Dashboard"
            open={sidebarOpen}
            active={isActive("/dashboard/student")}
          />
          <NavItem
            href="/dashboard/student/projects"
            icon={<FaProjectDiagram />}
            label="Projects"
            open={sidebarOpen}
            active={isActive("/dashboard/student/projects")}
          />
          <NavItem
            href="/dashboard/student/submissions"
            icon={<FaUpload />}
            label="Submissions"
            open={sidebarOpen}
            active={isActive("/dashboard/student/submissions")}
          />
          <NavItem
            href="/dashboard/student/feedback"
            icon={<FaComments />}
            label="Feedback"
            open={sidebarOpen}
            active={isActive("/dashboard/student/feedback")}
          />
          <NavItem
            href="/dashboard/student/feed"
            icon={<FaStream />}
            label="Feed"
            open={sidebarOpen}
            active={isActive("/dashboard/student/feed")}
          />
          <NavItem
            href="/dashboard/student/profile"
            icon={<FaUser />}
            label="Profile"
            open={sidebarOpen}
            active={pathname === "/dashboard/student/profile"}
          />
          <NavItem
            href="/dashboard/student/settings"
            icon={<FaCog />}
            label="Settings"
            open={sidebarOpen}
            active={isActive("/dashboard/student/settings")}
          />

          {user && (
            <NavItem
              href={`/dashboard/student/profile/${studentId}`}
              icon={<FaUser />}
              label="Create Post"
              open={sidebarOpen}
              active={pathname.startsWith(
                `/dashboard/student/profile/${studentId}`
              )}
            />
          )}
        </nav>

        <div className="border-t border-blue-800 p-3">
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/login";
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded text-sm hover:bg-red-500/20 transition"
          >
            <FaSignOutAlt />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Topbar */}
      <header
        className="fixed top-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10"
        style={{
          left: sidebarOpen ? "256px" : "64px",
          width: sidebarOpen ? "calc(100% - 256px)" : "calc(100% - 64px)",
        }}
      >
        <h1 className="text-lg font-semibold text-gray-800">
          Student Dashboard
        </h1>

        <div className="flex items-center gap-6">
          <FaBell className="text-gray-600 text-lg cursor-pointer" />
          <Link href="/dashboard/student/profile">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="/default.png"
                alt="profile"
                className="w-9 h-9 rounded-full"
              />
              <span className="text-sm text-gray-600">
                {user?.name || "Student"}
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="pt-24 px-6 pb-6 bg-gray-100 min-h-screen"
        style={{ marginLeft: sidebarOpen ? "256px" : "64px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-h-[80vh]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, open, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
        active
          ? "bg-blue-50 text-black font-medium"
          : "text-blue-200 hover:bg-blue-800/70"
      }`}
    >
      <span>{icon}</span>
      {open && <span>{label}</span>}
    </Link>
  );
}