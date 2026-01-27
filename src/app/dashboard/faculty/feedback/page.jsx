"use client";

import { useEffect, useState } from "react";

export default function FacultyFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faculty/feedback", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setFeedbacks(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-4">Loading feedback...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Feedback</h2>

      {feedbacks.length === 0 && (
        <p className="text-gray-500">No feedback given yet</p>
      )}

      <div className="space-y-4">
        {feedbacks.map(fb => (
          <div
            key={fb._id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <p className="font-medium">
              Project: <span className="text-gray-700">{fb.project?.title}</span>
            </p>

            <p className="mt-2 text-gray-800">{fb.message}</p>

            <p className="mt-2 text-sm text-gray-500">
              {new Date(fb.createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
