"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-3">Users</h2>
        <p>Students: <b>{stats.students}</b></p>
        <p>Faculty: <b>{stats.faculty}</b></p>
        <p>Admins: <b>{stats.admins}</b></p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-3">Projects</h2>
        <p>Ongoing: {stats.ongoingProjects}</p>
        <p>Completed: {stats.completedProjects}</p>
        <p>Pending: {stats.pendingProjects}</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-3">Activity</h2>
        <p>Active Users Today: {stats.activeToday}</p>
        <p>Submissions: {stats.submissions}</p>
        <p>Feedbacks: {stats.feedbacks}</p>
      </div>
    </div>
  );
}
