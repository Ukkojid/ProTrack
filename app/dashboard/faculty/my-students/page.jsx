"use client";
import { useState, useEffect } from "react";
import StudentTable from "./StudentTable";
import { FaUsers, FaProjectDiagram, FaClock } from "react-icons/fa";

export default function MyStudentsPage() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeProjects: 0,
    pendingReviews: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetch("/api/faculty/my-students", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const projectList = Array.isArray(data) ? data : [];
        setProjects(projectList);

        const totalStudents = projectList.reduce(
          (sum, p) => sum + (p.students?.length || 0),
          0
        );

        const activeProjects = projectList.length;

        const pendingReviews = projectList.filter(
          (p) => p.status !== "reviewed"
        ).length;

        setStats({
          totalStudents,
          activeProjects,
          pendingReviews,
        });

        setLoadingStats(false);
      })
      .catch(() => setLoadingStats(false));
  }, []);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            My Students
          </h1>
          <p className="text-sm text-gray-500">
            Manage your students and their project progress
          </p>
        </div>

        <input
          type="text"
          placeholder="Search project or student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm"
        />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Students"
          value={stats.totalStudents}
          loading={loadingStats}
          icon={<FaUsers />}
          color="blue"
        />
        <StatCard
          label="Active Projects"
          value={stats.activeProjects}
          loading={loadingStats}
          icon={<FaProjectDiagram />}
          color="green"
        />
        <StatCard
          label="Pending Reviews"
          value={stats.pendingReviews}
          loading={loadingStats}
          icon={<FaClock />}
          color="orange"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl shadow-sm p-5">
        <StudentTable projects={projects} search={search} />
      </div>

    </div>
  );
}

/* STATS CARD */
function StatCard({ label, value, loading, icon, color }) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    orange: "text-orange-600 bg-orange-50",
  };

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {loading ? "..." : value}
          </p>
        </div>

        <div className={`p-3 rounded-lg ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}