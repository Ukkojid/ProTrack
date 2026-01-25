"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FacultyProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faculty/projects", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading projects...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Projects</h1>

      {projects.length === 0 ? (
        <p className="text-gray-500">No projects assigned yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div
              key={p._id}
              className="bg-white p-4 rounded shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-600">
                Students: {p.students?.length || 0}
              </p>

              <Link
                href={`/dashboard/faculty/projects/${p._id}`}
                className="text-blue-600 text-sm mt-2 inline-block"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
