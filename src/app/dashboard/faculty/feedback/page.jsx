"use client";

import { useEffect, useState } from "react";

export default function FacultyFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faculty/feedback", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setFeedbacks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-600">Loading feedback...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Feedback</h2>

      {feedbacks.length === 0 ? (
        <p className="text-gray-500">No feedback given yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {feedbacks.map(fb => (
            <div
              key={fb._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              
                <p className="font-semibold text-gray-800 mb-2">Project:<span> </span>
                   {fb.submission?.project?.title}
                </p>
            

              <p className="text-gray-700">{fb.message}</p>

              <p className="text-sm text-gray-500 mt-3">
                {new Date(fb.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
