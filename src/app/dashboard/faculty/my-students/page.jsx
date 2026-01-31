"use client";
import { useState, useEffect } from "react";
import StudentTable from "./StudentTable";

export default function MyStudentsPage() {
  const [search, setSearch] = useState("");
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
        const students = Array.isArray(data) ? data : [];
        const totalStudents = students.length;
        const activeProjects = new Set(students.map((s) => s.project)).size;
        const pendingReviews = students.filter((s) => s.pendingFeedback).length;

        setStats({ totalStudents, activeProjects, pendingReviews });
        setLoadingStats(false);
      })
      .catch(() => setLoadingStats(false));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between md:items-center">
        <h1 className="text-3xl font-bold text-gray-800">My Students</h1>
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-64 mt-4 md:mt-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <StatCard
          label="Total Students"
          value={stats.totalStudents}
          loading={loadingStats}
          color="blue"
        />
        <StatCard
          label="Active Projects"
          value={stats.activeProjects}
          loading={loadingStats}
          color="green"
        />
        <StatCard
          label="Pending Reviews"
          value={stats.pendingReviews}
          loading={loadingStats}
          color="orange"
        />
      </div>

      {/* Student Table */}
      <StudentTable search={search} />
    </div>
  );
}

function StatCard({ label, value, loading, color }) {
  const colors = {
    blue: "text-blue-600",
    green: "text-green-600",
    orange: "text-orange-600",
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-gray-600">{label}</h3>
      <p className={`text-3xl font-bold ${colors[color]}`}>
        {loading ? "..." : value}
      </p>
    </div>
  );
}
