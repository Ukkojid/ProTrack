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

    files.forEach((file) => {
      formData.append("files", file);
    });

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
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Weekly Submission</h1>

      <div className="space-y-4">
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
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
          className="w-full"
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
