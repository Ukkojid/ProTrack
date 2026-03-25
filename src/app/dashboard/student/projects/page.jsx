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
      <div className="py-16 flex justify-center">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            My Projects
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your academic work
          </p>
        </div>

        <Link
          href="/dashboard/student/projects/create"
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Project
        </Link>
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl py-16 text-center text-sm text-gray-500">
          No projects yet
        </div>
      )}

      {/* Projects List */}
      {projects.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-3 uppercase">
                  Project
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-3 uppercase">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-3 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr
                  key={project._id}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {project.title}
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {project.status || "Pending"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/student/projects/${project._id}`}
                      className="text-sm text-blue-600 hover:underline"
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