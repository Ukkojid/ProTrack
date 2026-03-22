"use client";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    Promise.all([
      fetch("/api/projects/my", { credentials: "include" }).then(res => res.json()),
      fetch("/api/student/feedback", { credentials: "include" }).then(res => res.json())
    ])
      .then(([projectsData, feedbackData]) => {
        setProjects(projectsData || []);
        setFeedbacks(feedbackData || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-6">
    
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="text-gray-500 mt-1">
          Here’s a quick overview of your academic progress.
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Projects" value={projects.length} />
        <StatCard title="Feedback Received" value={feedbacks.length} />
        <StatCard title="Pending Submissions" value="0" />
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">My Projects</h2>

          {projects.length === 0 && (
            <p className="text-gray-500">No projects created yet.</p>
          )}

          <div className="space-y-3">
            {projects.map(project => (
              <div
                key={project._id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-800">
                    {project.title}
                  </p>
                  <span className="text-sm text-gray-500">
                    {project.status || "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Faculty Feedback</h2>

          {feedbacks.length === 0 && (
            <p className="text-gray-500">No feedback received yet.</p>
          )}

          <div className="space-y-4">
            {feedbacks.map(f => (
              <div key={f._id} className="border rounded-lg p-3">
                <p className="text-sm font-medium text-gray-700">
                  {f.submission?.project?.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  by {f.faculty?.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-gray-800 mt-2">
        {value}
      </p>
    </div>
  );
}
