"use client";
import { useEffect, useState } from "react";

export default function FacultySubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [score, setScore] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("/api/faculty/submissions", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const unique = Array.from(
          new Map((data || []).map((i) => [i._id, i])).values()
        );
        setSubmissions(unique);
        setLoading(false);
      });
  }, []);

  const submitFeedback = async () => {
    setSuccessMsg("");
    setErrorMsg("");

    if (!feedbackText.trim()) {
      setErrorMsg("Feedback message is required");
      return;
    }

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
      setSuccessMsg("Feedback submitted successfully");
      setFeedbackText("");
      setScore("");

      // optional: auto close after 1.5 sec
      setTimeout(() => {
        setOpen(false);
        setSuccessMsg("");
      }, 1500);
    } else {
      setErrorMsg("Failed to submit feedback");
    }
  };

  if (loading) return <p className="p-6">Loading submissions...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Student Submissions</h1>

      {submissions.length === 0 && (
        <p className="text-gray-500">No submissions found</p>
      )}

      <div className="space-y-6">
        {submissions.map((s) => (
          <div
            key={s._id}
            className="bg-white border rounded-lg p-5 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800">
                  {s.student?.name}
                </p>
                <p className="text-sm text-gray-600">
                  Project: {s.project?.title}
                </p>
                <p className="text-sm text-gray-600">
                  Week: {s.week}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedSubmission(s._id);
                  setOpen(true);
                }}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Give Feedback
              </button>
            </div>

            <p className="mt-3 text-gray-800">{s.description}</p>

            {s.githubLink && (
              <a
                href={s.githubLink}
                target="_blank"
                className="inline-block mt-2 text-blue-600 text-sm underline"
              >
                View GitHub Repository
              </a>
            )}

            {/* Files */}
            {s.files?.length > 0 && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {s.files.map((file, i) => (
                  <div key={i} className="border rounded p-2">
                    {file.type === "image" && (
                      <img
                        src={file.url}
                        alt={file.fileName}
                        className="rounded max-h-40 object-cover"
                      />
                    )}

                    {file.type === "video" && (
                      <video
                        src={file.url}
                        controls
                        className="rounded max-h-40"
                      />
                    )}

                    {file.type === "document" && (
                      <a
                        href={file.url}
                        target="_blank"
                        className="text-blue-600 underline text-sm"
                      >
                        {file.fileName || "View Document"}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Feedback Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Give Feedback</h2>

            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Write your feedback"
              className="w-full border rounded p-2 h-28 mb-3"
            />

            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="Score (optional)"
              className="w-full border rounded p-2 mb-3"
            />

            {successMsg && (
              <p className="text-green-600 text-sm mb-2">{successMsg}</p>
            )}

            {errorMsg && (
              <p className="text-red-600 text-sm mb-2">{errorMsg}</p>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-1 border rounded"
              >
                Cancel
              </button>
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
