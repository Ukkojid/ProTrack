"use client";
import { useState, useEffect } from "react";
import StudentTable from "./StudentTable";

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
    <div className="p-6 bg-gray-100 min-h-screen">
    
      <div className="mb-6 flex flex-col md:flex-row justify-between md:items-center">
        <h1 className="text-3xl font-bold text-gray-800">My Students</h1>
        <input
          type="text"
          placeholder="Search project or student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-64 mt-4 md:mt-0"
        />
      </div>

     
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <StatCard label="Total Students" value={stats.totalStudents} loading={loadingStats} />
        <StatCard label="Active Projects" value={stats.activeProjects} loading={loadingStats} />
        <StatCard label="Pending Reviews" value={stats.pendingReviews} loading={loadingStats} />
      </div>

      
      <StudentTable projects={projects} search={search} />
    </div>
  );
}

function StatCard({ label, value, loading }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-gray-600">{label}</h3>
      <p className="text-3xl font-bold">
        {loading ? "..." : value}
      </p>
    </div>
  );
}
