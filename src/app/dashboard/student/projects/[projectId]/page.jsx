// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";

// export default function StudentProjectPage() {
//   const { projectId } = useParams();

//   const [project, setProject] = useState(null);
//   const [finalFeedback, setFinalFeedback] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const resProject = await fetch(`/api/projects/${projectId}/feedback`);
//         const projectData = await resProject.json();
//         setProject(projectData);

//         const resFinal = await fetch(`/api/projects/${projectId}/feedback/final`);
//         const finalData = await resFinal.json();
//         setFinalFeedback(finalData);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     fetchData();
//   }, [projectId]);

//   if (!project) return <p>Loading project...</p>;

//   return (
//     <div>
//       <h1>{project.title}</h1>
//       <p>{project.description}</p>

//       <h2>Final Feedback</h2>
//       {finalFeedback ? (
//         <p>{finalFeedback.message || "No feedback yet"}</p>
//       ) : (
//         <p>Loading final feedback...</p>
//       )}
//     </div>
//   );
// }



"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`/api/projects/${projectId}`)
      .then(res => res.json())
      .then(data => setProject(data));
  }, [projectId]);

  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p>Status: {project.status}</p>
    </div>
  );
}
