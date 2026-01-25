"use client";

import { useEffect, useState } from "react";

export default function StudentSubmissionsPage() {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");

  const [week, setWeek] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 load student's projects
  useEffect(() => {
    fetch("/api/projects/my", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const submitWork = async () => {
    setMessage("");

    if (!projectId) {
      return setMessage("Please select a project");
    }
    if (!week) {
      return setMessage("Week is required");
    }
    if (!description.trim()) {
      return setMessage("Description is required");
    }

    setLoading(true);

    const res = await fetch("/api/student/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId,          // ✅ REAL ObjectId
        week,
        description,
        githubLink,
        videoUrl,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Submission failed");
    } else {
      setMessage("Submission successful");
      setWeek("");
      setDescription("");
      setGithubLink("");
      setVideoUrl("");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Weekly Submission</h1>

      <div className="space-y-4">
        {/* Project select */}
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Week Number"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="What did you work on this week?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded h-32"
        />

        <input
          type="text"
          placeholder="Video Recording Link (Drive / Cloudinary)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="GitHub link (optional)"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={submitWork}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {message && (
          <p className="text-sm text-center mt-2 text-red-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
