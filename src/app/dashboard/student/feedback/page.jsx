"use client";
import { useEffect, useState } from "react";

export default function StudentFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/student/feedback", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading feedback...</p>;

  if (feedbacks.length === 0) {
    return <p className="p-6">No feedback yet.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Feedback</h1>

      {feedbacks.map((f) => (
        <div
          key={f._id}
          className="bg-white border rounded p-4 mb-4 shadow"
        >
          <p>
            <b>Project:</b> {f.submission?.project?.title}
          </p>

          <p>
            <b>Faculty:</b> {f.faculty?.name}
          </p>

          {f.score !== undefined && (
            <p>
              <b>Score:</b> {f.score}
            </p>
          )}

          <p className="mt-2">{f.message}</p>

          <p className="text-sm text-gray-500 mt-2">
            {new Date(f.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
