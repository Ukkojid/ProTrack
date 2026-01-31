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
        // Project details
        const resProject = await fetch(`/api/projects/${projectId}`, {
          credentials: "include",
        });
        const dataProject = await resProject.json();

        // Submissions for this project
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
    return <p className="p-6">Loading project details...</p>;
  }

  

  if (!project) {
    return <p className="p-6">Project not found</p>;
  }



  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Project info */}
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
        {project.description && (
          <p className="text-gray-700 mb-2">{project.description}</p>
        )}
        <p className="text-sm text-gray-500">
          Status: <span className="font-semibold">{project.status || "Pending"}</span>
        </p>
        {project.startDate && project.endDate && (
          <p className="text-sm text-gray-500">
            Duration: {new Date(project.startDate).toLocaleDateString()} –{" "}
            {new Date(project.endDate).toLocaleDateString()}
          </p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          Total Students: {project.students?.length || 0}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Total Submissions: {submissions.length}
        </p>
      </div>

      {/* Team members */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Team Members</h2>
        {project.students?.length > 0 ? (
          <ul className="space-y-1">
            {project.students.map((s) => (
              <li key={s._id} className="text-gray-800">
                {s.name} ({s.email})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No team members assigned.</p>
        )}
      </div>

      {/* Submissions */}
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">
          Submissions ({submissions.length})
        </h2>

        {submissions.length === 0 && (
          <p className="text-gray-500">No submissions yet.</p>
        )}

        {submissions.map((sub) => (
          <div key={sub._id} className="border rounded p-4 space-y-2">
            <p className="font-semibold text-gray-800">
              Student: {sub.student?.name || sub.studentId?.name} ({sub.student?.email})
            </p>
            <p className="text-sm text-gray-500">Week: {sub.week}</p>
            <p>{sub.description}</p>

            {sub.githubLink && (
              <a
                href={sub.githubLink}
                target="_blank"
                className="text-blue-600 underline"
              >
                GitHub Link
              </a>
            )}

            {/* Files */}
            <div className="flex flex-wrap gap-3 mt-2">
              {sub.files?.map((file, index) => (
                <div key={index}>
                  {file.type === "image" && (
                    <img
                      src={file.url}
                      alt={file.fileName}
                      className="max-w-xs rounded shadow"
                    />
                  )}
                  {file.type === "video" && (
                    <video src={file.url} controls className="max-w-md rounded" />
                  )}
                  {file.type === "document" && (
                    <a
                      href={file.url}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      {file.fileName || "View Document"}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
