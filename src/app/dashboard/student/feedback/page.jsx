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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 text-lg">
        Loading feedback...
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
        No feedback yet.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Feedback
      </h1>

      <div className="space-y-4">
        {feedbacks.map((f) => (
          <div
            key={f._id}
            className="bg-white p-5 rounded-xl shadow-md border hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-700">
                  Project: <span className="font-normal">{f.submission?.project?.title}</span>
                </p>
                <p className="font-semibold text-gray-700">
                  Faculty: <span className="font-normal">{f.faculty?.name}</span>
                </p>
                {f.score !== undefined && (
                  <p className="font-semibold text-gray-700">
                    Score: <span className="font-normal text-blue-600">{f.score}</span>
                  </p>
                )}
              </div>
              <p className="text-sm text-gray-400">
                {new Date(f.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>

            <p className="mt-3 text-gray-800">{f.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
