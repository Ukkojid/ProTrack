"use client";

import { useEffect, useState } from "react";

export default function StudentSubmissionsPage() {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [week, setWeek] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/projects/my", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const submitWork = async () => {
    setMessage("");

    if (!projectId || !week || !description.trim()) {
      return setMessage("All required fields must be filled");
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("projectId", projectId);
    formData.append("week", week);
    formData.append("description", description);
    formData.append("githubLink", githubLink);

    files.forEach((file) => formData.append("files", file));

    const res = await fetch("/api/student/submissions", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Submission failed");
    } else {
      setMessage("Submission successful");
      setWeek("");
      setDescription("");
      setGithubLink("");
      setFiles([]);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Weekly Submission
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        {/* Project selector */}
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>

        {/* Week number */}
        <input
          type="number"
          placeholder="Week Number"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {/* Description */}
        <textarea
          placeholder="What did you work on this week?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none h-32 resize-none"
        />

        {/* Files */}
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
          className="w-full"
        />

        {/* GitHub link */}
        <input
          type="text"
          placeholder="GitHub link (optional)"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {/* Submit button */}
        <button
          onClick={submitWork}
          disabled={loading}
          className={`w-full text-white font-semibold py-3 rounded-lg transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {/* Message */}
        {message && (
          <p
            className={`text-center mt-2 text-sm font-medium ${
              message.toLowerCase().includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
