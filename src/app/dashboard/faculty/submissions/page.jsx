"use client";
import { useEffect, useState } from "react";

export default function FacultySubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    fetch("/api/faculty/submissions", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        // 🛡️ safety: remove duplicates by _id
        const unique = Array.from(
          new Map(data.map((i) => [i._id, i])).values(),
        );
        setSubmissions(unique);
        setLoading(false);
      });
  }, []);

  const submitFeedback = async () => {
    const res = await fetch("/api/faculty/submissions/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submissionId: selectedSubmission,
        message: feedbackText,
        score,
      }),
    });

    if (res.ok) {
      alert("Feedback submitted");
      setOpen(false);
      setFeedbackText("");
      setScore("");
    } else {
      alert("Error submitting feedback");
    }
  };

  if (loading) return <p>Loading submissions...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Submissions</h1>

      {submissions.map((s) => (
        <div key={s._id} className="bg-white p-4 mb-4 rounded shadow">
          <p>
            <b>Student:</b> {s.student?.name}
          </p>
          <p>
            <b>Project:</b> {s.project?.title}
          </p>
          <p>
            <b>Week:</b> {s.week}
          </p>
          <p>{s.description}</p>

          <div className="flex gap-4 mt-2">
            {s.githubLink && (
              <a href={s.githubLink} target="_blank" className="text-blue-600">
                GitHub
              </a>
            )}
            {s.files && s.files.length > 0 && (
              <div className="mt-3 space-y-2">
                {s.files.map((file, index) => (
                  <div key={index}>
                    {file.type === "image" && (
                      <img
                        src={file.url}
                        alt={file.fileName}
                        className="max-w-xs rounded"
                      />
                    )}

                    {file.type === "video" && (
                      <video src={file.url} controls className="max-w-md" />
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
            )}
          </div>

          <button
            onClick={() => {
              setSelectedSubmission(s._id);
              setOpen(true);
            }}
            className="text-blue-600 mt-2"
          >
            Give Feedback
          </button>
        </div>
      ))}

      {/* Feedback Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-3">Give Feedback</h2>

            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full border p-2 mb-3"
              placeholder="Write feedback"
            />

            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="Score"
              className="w-full border p-2 mb-3"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button
                onClick={submitFeedback}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
