"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function FacultyProjectDetailsPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    async function fetchData() {
      setLoading(true);

      try {
        const resProject = await fetch(`/api/projects/${projectId}`, {
          credentials: "include",
        });
        const dataProject = await resProject.json();

        const resSub = await fetch(
          `/api/projects/${projectId}/submissions`,
          { credentials: "include" }
        );
        const dataSub = await resSub.json();

        setProject(dataProject);
        setSubmissions(dataSub || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [projectId]);

  if (loading) {
    return (
      <div className="p-6 text-gray-500">Loading project details...</div>
    );
  }

  if (!project) {
    return <div className="p-6 text-gray-500">Project not found</div>;
  }

  return (
    <div className="space-y-6">

      {/* PROJECT INFO */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {project.title}
            </h1>

            {project.description && (
              <p className="text-sm text-gray-600 mt-2">
                {project.description}
              </p>
            )}

            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              <span>
                Status:{" "}
                <span className="font-medium text-gray-800">
                  {project.status || "Pending"}
                </span>
              </span>

              <span>
                Students: {project.students?.length || 0}
              </span>

              <span>
                Submissions: {submissions.length}
              </span>
            </div>
          </div>

          {project.startDate && project.endDate && (
            <div className="text-xs text-gray-500 text-right">
              <p>Duration</p>
              <p className="font-medium text-gray-700">
                {new Date(project.startDate).toLocaleDateString()} -{" "}
                {new Date(project.endDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* TEAM MEMBERS */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Team Members</h2>

        {project.students?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-3">
            {project.students.map((s) => (
              <div
                key={s._id}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                  {s.name?.charAt(0)}
                </div>

                <div>
                  <p className="font-medium text-gray-800">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.email}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            No team members assigned.
          </p>
        )}
      </div>

      {/* SUBMISSIONS (SCROLL CONTAINER) */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Submissions ({submissions.length})
          </h2>
        </div>

        {submissions.length === 0 ? (
          <p className="text-gray-500 text-sm">No submissions yet.</p>
        ) : (
          <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4">
            {submissions.map((sub) => (
              <div
                key={sub._id}
                className="border rounded-lg p-4 space-y-3 hover:shadow-sm transition"
              >
                {/* Header */}
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-800">
                    {sub.student?.name || sub.studentId?.name}
                  </p>

                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    Week {sub.week || "-"}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  {sub.description}
                </p>

                {sub.githubLink && (
                  <a
                    href={sub.githubLink}
                    target="_blank"
                    className="text-blue-600 text-sm underline"
                  >
                    GitHub Repository
                  </a>
                )}

                {/* Files */}
                <div className="flex flex-wrap gap-3">
                  {sub.files?.map((file, index) => (
                    <div key={index}>
                      {file.type === "image" && (
                        <img
                          src={file.url}
                          className="w-40 h-28 object-cover rounded border cursor-pointer"
                          onDoubleClick={() =>
                            window.open(file.url, "_blank")
                          }
                        />
                      )}

                      {file.type === "video" && (
                        <video
                          controls
                          className="w-64 rounded border"
                        >
                          <source src={file.url} />
                        </video>
                      )}

                      {file.type === "document" && (
                        <a
                          href={file.url}
                          target="_blank"
                          className="text-blue-600 text-sm underline"
                        >
                          {file.fileName || "View Document"}
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-400">
                  {new Date(sub.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}