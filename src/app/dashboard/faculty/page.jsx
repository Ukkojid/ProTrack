"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaUsers,
  FaProjectDiagram,
  FaComments,
  FaSignOutAlt,
} from "react-icons/fa";

export default function FacultyDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
   const [user, setUser] = useState(null);

  useEffect(() => {
      fetch("/api/auth/me")
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => setUser(null));
    }, []);
  

  const [stats, setStats] = useState({
    students: 0,
    projects: 0,
    pendingFeedback: 0,
  });

  const [recentStudents, setRecentStudents] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/faculty/dashboard", { credentials: "include" }).then((r) =>
        r.json()
      ),
      fetch("/api/faculty/my-students", { credentials: "include" }).then((r) =>
        r.json()
      ),
    ])
      .then(([dashboardData, studentsData]) => {
        setStats({
          students: dashboardData.totalStudents || 0,
          projects: dashboardData.totalProjects || 0,
          pendingFeedback: dashboardData.pendingFeedback || 0,
        });

        setRecentStudents(
          Array.isArray(studentsData) ? studentsData.slice(0, 5) : []
        );

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

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
          <Link
            href="/dashboard/faculty"
            className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700"
          >
            <FaHome /> {sidebarOpen && <span>Dashboard</span>}
          </Link>

          <Link
            href="/dashboard/faculty/my-students"
            className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700"
          >
            <FaUsers /> {sidebarOpen && <span>My Students</span>}
          </Link>

          <Link
            href="/dashboard/faculty/projects"
            className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700"
          >
            <FaProjectDiagram /> {sidebarOpen && <span>Projects</span>}
          </Link>

          <Link
            href="/dashboard/faculty/feedback"
            className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700"
          >
            <FaComments /> {sidebarOpen && <span>Feedback</span>}
          </Link>

          <Link
            href="/dashboard/faculty/submissions"
            className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700"
          >
            <FaComments /> {sidebarOpen && <span>Submissions</span>}
          </Link>
        </nav>

        <div className="p-4 border-t border-blue-700">
          <Link
            href="/login"
            className="flex items-center space-x-3 p-2 rounded hover:bg-blue-700"
          >
            <FaSignOutAlt /> {sidebarOpen && <span>Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-900">
            Welcome{user?.name ? `, ${user.name}` : ""}
          </h1>
        </header>

        {/* Stats */}
        <section className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-gray-600">Total Students</h3>
            <p className="text-3xl font-bold">{stats.students}</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-gray-600">Active Projects</h3>
            <p className="text-3xl font-bold">{stats.projects}</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-gray-600">Pending Feedback</h3>
            <p className="text-3xl font-bold">{stats.pendingFeedback}</p>
          </div>
        </section>

        {/* Recent Students */}
        <section className="p-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Recently Added Students</h2>

            {recentStudents.length === 0 ? (
              <p className="text-gray-500">No students yet</p>
            ) : (
              <ul className="space-y-3">
                {recentStudents.map((s) => (
                  <li
                    key={s._id}
                    className="p-3 border rounded hover:bg-gray-50"
                  >
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-sm text-gray-600">
                      {s.project}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
