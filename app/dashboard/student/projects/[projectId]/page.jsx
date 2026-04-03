"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const projectRes = await fetch(`/api/projects/${projectId}`, {
          credentials: "include",
        });
        const projectData = await projectRes.json();

        const subRes = await fetch(`/api/projects/${projectId}/submissions`, {
          credentials: "include",
        });
        const subData = await subRes.json();

        setProject(projectData);
        setSubmissions(subData || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) loadData();
  }, [projectId]);

  if (loading) {
    return <div className="p-6 text-gray-600">Loading project...</div>;
  }

  if (!project) {
    return <div className="p-6 text-gray-600">Project not found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          {project.title}
        </h1>
        <p className="text-sm text-gray-500">
          Project details and progress overview
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard label="Status" value={project.status || "Active"} />
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
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Project Description</h2>
        <p className="text-sm text-gray-600">
          {project.description || "No description provided."}
        </p>
      </div>

      {/* Team + Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Team Members</h2>

          {project.students?.length > 0 ? (
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-[500px]">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Submissions</h2>
            <p className="text-xs text-gray-500 mt-1">
              Track all submitted work
            </p>
          </div>

          {/* Scrollable Area */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {submissions.length > 0 ? (
              submissions.map((sub) => (
                <div
                  key={sub._id}
                  className="border rounded-lg p-4 bg-gray-50 hover:shadow-sm transition"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Week {sub.week || "-"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(sub.createdAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                      {sub.status || "Submitted"}
                    </span>
                  </div>

                  {/* Description */}
                  {sub.description && (
                    <p className="text-sm text-gray-600 mb-3">
                      {sub.description}
                    </p>
                  )}

                  {/* Files */}
                  {sub.files?.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {sub.files.map((file, i) => (
                        <a
                          key={i}
                          href={file.url}
                          target="_blank"
                          className="border rounded-md p-2 bg-white hover:bg-gray-100 transition w-32"
                        >
                          <div className="text-xs text-gray-600 truncate">
                            📄 {file.fileName || "File"}
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 text-sm py-10">
                No submissions yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <Link
        href={`/dashboard/student/projects/${projectId}/ProjectMessages`}
        className="fixed bottom-6 right-6 bg-blue-900 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-800 transition"
      >
        💬 Chat
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
