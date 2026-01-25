"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects/my", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setProjects(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto mt-10 text-center text-gray-600">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">My Projects</h2>

        <Link
          href="/dashboard/student/projects/create"
          className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800"
        >
          + Create Project
        </Link>
      </div>

      {/* Empty state */}
      {projects.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No projects found
        </div>
      )}

      {/* Projects list */}
      <ul className="space-y-3">
        {projects.map((project) => (
          <li
            key={project._id}
            className="border rounded px-4 py-3 hover:bg-gray-50"
          >
            <Link
              href={`/dashboard/student/projects/${project._id}`}
              className="font-medium text-black"
            >
              {project.title}
            </Link>

            <div className="text-xs text-gray-500 mt-1">
              Status: {project.status || "Pending"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
