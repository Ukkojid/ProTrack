"use client";
import { useEffect, useState } from "react";

export default function FacultySubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faculty/submissions", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setSubmissions(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading submissions...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Submissions</h1>

      {submissions.map((s) => (
        <div key={s._id} className="bg-white p-4 mb-4 rounded shadow">
          <p><b>Student:</b> {s.student.name}</p>
          <p><b>Project:</b> {s.project.title}</p>
          <p><b>Week:</b> {s.week}</p>
          <p>{s.description}</p>

          <div className="flex gap-4 mt-2">
            {s.githubLink && (
              <a href={s.githubLink} target="_blank" className="text-blue-600">
                GitHub
              </a>
            )}
            {s.videoUrl && (
              <a href={s.videoUrl} target="_blank" className="text-green-600">
                Watch Video
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
