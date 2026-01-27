"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function FacultyProjectSubmissionsPage() {
  const { projectId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    fetch(`/api/faculty/projects/${projectId}/submissions`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data || []);
        setLoading(false);
      });
  }, [projectId]);

  if (loading) {
    return <p className="p-6">Loading submissions...</p>;
  }

  if (submissions.length === 0) {
    return <p className="p-6">No submissions found</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Project Submissions</h1>

      {submissions.map((sub) => (
        <div
          key={sub._id}
          className="border rounded p-4 space-y-3"
        >
          <div>
            <p className="font-semibold">
              Student: {sub.student?.name || sub.studentId?.name}
            </p>
            <p className="text-sm text-gray-600">
              Week: {sub.week}
            </p>
          </div>

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

          <div className="space-y-2">
            {sub.files?.map((file, index) => (
              <div key={index}>
                {file.type === "image" && (
                  <img
                    src={file.url}
                    alt={file.fileName}
                    className="max-w-xs rounded"
                  />
                )}

                {file.type === "video" && (
                  <video
                    src={file.url}
                    controls
                    className="max-w-md"
                  />
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
  );
}
