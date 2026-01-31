"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects/my", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setProjects(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-600">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            My Projects
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all your academic projects here
          </p>
        </div>

        <Link
          href="/dashboard/student/projects/create"
          className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-800 transition"
        >
          + Create Project
        </Link>
      </div>

      {/* Empty state */}
      {projects.length === 0 && (
        <div className="bg-white rounded-lg shadow p-10 text-center text-gray-500">
          No projects created yet.
        </div>
      )}

      {/* Projects table-style list */}
      {projects.length > 0 && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">
                  Project Title
                </th>
                <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">
                  Status
                </th>
                <th className="text-right text-sm font-medium text-gray-600 px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {projects.map(project => (
                <tr
                  key={project._id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {project.title}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {project.status || "Pending"}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/student/projects/${project._id}`}
                      className="text-blue-700 text-sm hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
