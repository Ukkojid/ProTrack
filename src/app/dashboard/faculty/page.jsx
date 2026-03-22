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
      fetch("/api/faculty/dashboard", { credentials: "include" }).then((r) =>
        r.json(),
      ),
      fetch("/api/faculty/my-students", { credentials: "include" }).then((r) =>
        r.json(),
      ),
    ])
      .then(([dashboardData, projectsData]) => {
  setStats({
    students: dashboardData.totalStudents || 0,
    projects: dashboardData.totalProjects || 0,
    pendingFeedback: dashboardData.pendingFeedback || 0,
  });

  // Directly store projects (not flatten)
  setRecentStudents(
    Array.isArray(projectsData) ? projectsData.slice(0, 5) : []
  );

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
  <h2 className="text-xl font-bold mb-4">Projects & Students</h2>

  {recentStudents.length === 0 ? (
    <p className="text-gray-500">No projects yet</p>
  ) : (
    <div className="space-y-5">
      {recentStudents.map((project) => (
        <div
          key={project._id}
          className="border rounded-lg p-4 hover:shadow-md transition"
        >
          {/* Project Title */}
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            {project.title}
          </h3>

          {/* Students List */}
          {project.students && project.students.length > 0 ? (
            <ul className="space-y-2">
              {project.students.slice(0, 3).map((student) => (
                <li
                  key={student._id}
                  className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded"
                >
                  <span className="font-medium">{student.name}</span>
                  <span className="text-sm text-gray-500">
                    {student.email}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No students assigned</p>
          )}
        </div>
      ))}
    </div>
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
