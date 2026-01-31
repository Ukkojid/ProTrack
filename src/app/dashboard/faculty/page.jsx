"use client";

import { useEffect, useState } from "react";

export default function FacultyDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    students: 0,
    projects: 0,
    pendingFeedback: 0,
  });
  const [recentStudents, setRecentStudents] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/faculty/dashboard", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/faculty/my-students", { credentials: "include" }).then((r) => r.json()),
    ])
      .then(([dashboardData, studentsData]) => {
        setStats({
          students: dashboardData.totalStudents || 0,
          projects: dashboardData.totalProjects || 0,
          pendingFeedback: dashboardData.pendingFeedback || 0,
        });
        setRecentStudents(Array.isArray(studentsData) ? studentsData.slice(0, 5) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Students" value={stats.students} />
        <StatCard label="Active Projects" value={stats.projects} />
        <StatCard label="Pending Feedback" value={stats.pendingFeedback} />
      </div>

      {/* Recent Students */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Recently Added Students</h2>
        {recentStudents.length === 0 ? (
          <p className="text-gray-500">No students yet</p>
        ) : (
          <ul className="space-y-3">
            {recentStudents.map((s) => (
              <li key={s._id} className="p-3 border rounded hover:bg-gray-50">
                <div className="font-semibold">{s.name}</div>
                <div className="text-sm text-gray-600">{s.project}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-gray-600">{label}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
