"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FacultyProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faculty/projects", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setProjects([]));
  }, []);

  if (loading)
    return <p className="p-6 text-center text-gray-600">Loading projects...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Projects</h1>

      {projects.length === 0 ? (
        <p className="text-gray-500 text-center">No projects assigned yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                Students Assigned: {project.students?.length || 0}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Status: {project.status || "Pending"}
              </p>

              <Link
                href={`/dashboard/faculty/projects/${project._id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
