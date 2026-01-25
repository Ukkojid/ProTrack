"use client";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaUpload,
  FaComments,
  FaUser,
  FaCog,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  /* ---------------- user info ---------------- */
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  /* ---------------- student projects ---------------- */
  useEffect(() => {
    fetch("/api/projects/my", {
      credentials: "include",
    })
      .then((res) => {
        console.log("status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("projects api data:", data);
        setProjects(data || []);
      })
      .catch((err) => {
        console.error("fetch error:", err);
      });
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

        <nav className="flex-1 px-2 space-y-2">
          <SidebarItem icon={<FaHome />} label="Dashboard" open={sidebarOpen} />
          <Link href="/dashboard/student/projects">
            <SidebarItem
              icon={<FaProjectDiagram />}
              label="Projects"
              open={sidebarOpen}
            />
          </Link>

          <SidebarItem icon={<FaTasks />} label="Tasks" open={sidebarOpen} />
          <Link href="/dashboard/student/submissions">
          <SidebarItem
            icon={<FaUpload />}
            label="Submissions"
            open={sidebarOpen}
          />
          </Link>

          <SidebarItem
            icon={<FaComments />}
            label="Feedback"
            open={sidebarOpen}
          />
          <SidebarItem icon={<FaUser />} label="Profile" open={sidebarOpen} />
          <SidebarItem icon={<FaCog />} label="Settings" open={sidebarOpen} />
        </nav>

        <div className="p-4 border-t border-blue-700">
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/login";
            }}
            className="flex items-center space-x-3 p-2 rounded hover:bg-blue-700 w-full"
          >
            <FaSignOutAlt />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-900">
            Welcome{user?.name ? `, ${user.name}` : ""}
          </h1>
          <div className="flex items-center space-x-6">
            <FaBell className="text-xl text-blue-900" />
            <img src="/defult.png" className="w-10 h-10 rounded-full" />
          </div>
        </header>

        {/* Dashboard */}
        <section className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Projects */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">My Projects</h2>

            {loadingProjects && <p>Loading projects...</p>}

            {!loadingProjects && projects.length === 0 && (
              <p className="text-gray-500">No projects yet.</p>
            )}

            <ul className="space-y-2">
              {projects.map((project) => (
                <li
                  key={project._id}
                  className="p-3 border rounded hover:bg-blue-50"
                >
                  <p className="font-semibold">{project.title}</p>
                  <p className="text-sm text-gray-600">
                    Status: {project.status || "Pending"}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Feedback (placeholder) */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Faculty Feedback</h2>
            <p className="text-gray-500">Feedback feature coming next.</p>
          </div>

          {/* Submissions (placeholder) */}
          <div className="bg-white p-6 rounded-lg shadow col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Submissions</h2>
            <p className="text-gray-500">No submissions yet.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------- small reusable component ---------- */
function SidebarItem({ icon, label, open }) {
  return (
    <a className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
      {icon}
      {open && <span>{label}</span>}
    </a>
  );
}
