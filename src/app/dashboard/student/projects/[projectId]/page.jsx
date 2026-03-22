"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const router = useRouter();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${projectId}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [projectId]);

  if (loading) {
    return <div className="p-6 text-gray-600">Loading project...</div>;
  }

  if (!project) {
    return <div className="p-6 text-gray-600">Project not found.</div>;
  }

  return (
    <div className="p-6 relative">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {project.title}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Project details and progress overview
        </p>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <InfoCard label="Status" value={project.status || "Pending"} />
        <InfoCard
          label="Guide"
          value={project.faculty?.name || "Not Assigned"}
        />
        <InfoCard
          label="Created On"
          value={new Date(project.createdAt).toLocaleDateString("en-GB")}
        />
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Project Description
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {project.description || "No description provided."}
        </p>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Members */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Team Members</h2>

          {project.students && project.students.length > 0 ? (
            <ul className="space-y-2">
              {project.students.map((student) => (
                <li
                  key={student._id}
                  className="text-sm text-gray-700 border rounded px-3 py-2"
                >
                  {student.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No students assigned.</p>
          )}
        </div>

        {/* Submissions */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-3">Submissions</h2>
          <p className="text-sm text-gray-500">No submissions yet.</p>
        </div>
      </div>

      {/* Chat button */}
      <Link
  href={`/dashboard/student/projects/${projectId}/ProjectMessages`}
  className="fixed bottom-6 right-6 bg-blue-900 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-800 transition flex items-center space-x-2"
>
  <span>💬</span>
  <span>Chat</span>
</Link>

    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-medium text-gray-800 mt-1">{value}</p>
    </div>
  );
}
