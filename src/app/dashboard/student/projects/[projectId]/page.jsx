"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectMessages from "./ProjectMessages";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!projectId) return;

    fetch(`/api/projects/${projectId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setProject);
  }, [projectId]);

  if (!project) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{project.title}</h2>
      <p>{project.description}</p>
      <p>Status: {project.status}</p>

      {/* CHAT SECTION */}
      <ProjectMessages projectId={projectId} />
    </div>
  );
}
