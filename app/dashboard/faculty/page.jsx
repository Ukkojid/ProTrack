"use client";

import { useEffect, useState } from "react";
import {
  FaUsers,
  FaProjectDiagram,
  FaComments,
} from "react-icons/fa";

export default function FacultyDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    students: 0,
    projects: 0,
    pendingFeedback: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/faculty/dashboard", { credentials: "include" }).then((r) =>
        r.json()
      ),
      fetch("/api/faculty/my-students", { credentials: "include" }).then((r) =>
        r.json()
      ),
    ])
      .then(([dashboardData, projectsData]) => {
        setStats({
          students: dashboardData.totalStudents || 0,
          projects: dashboardData.totalProjects || 0,
          pendingFeedback: dashboardData.pendingFeedback || 0,
        });

        setRecentProjects(
          Array.isArray(projectsData) ? projectsData.slice(0, 5) : []
        );

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Faculty Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Overview of your students, projects and activity
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatCard
          label="Total Students"
          value={stats.students}
          icon={<FaUsers />}
          color="blue"
        />

        <StatCard
          label="Active Projects"
          value={stats.projects}
          icon={<FaProjectDiagram />}
          color="green"
        />

        <StatCard
          label="Pending Feedback"
          value={stats.pendingFeedback}
          icon={<FaComments />}
          color="orange"
        />

      </div>

      {/* PROJECTS */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Projects
        </h2>

        {recentProjects.length === 0 ? (
          <p className="text-sm text-gray-400">
            No projects available
          </p>
        ) : (
          <div className="space-y-5">
            {recentProjects.map((project) => (
              <div
                key={project._id}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                {/* Project Title */}
                <h3 className="font-semibold text-gray-800 mb-3">
                  {project.title}
                </h3>

                {/* Students */}
                {project.students?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.students.slice(0, 4).map((student) => (
                      <div
                        key={student._id}
                        className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
                          {student.name?.charAt(0)}
                        </div>

                        <div>
                          <p className="text-sm font-medium">
                            {student.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">
                    No students assigned
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

/* STATS CARD */
function StatCard({ label, value, icon, color }) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    orange: "text-orange-600 bg-orange-50",
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {value}
          </p>
        </div>

        <div
          className={`p-3 rounded-lg ${colorMap[color]} text-xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}