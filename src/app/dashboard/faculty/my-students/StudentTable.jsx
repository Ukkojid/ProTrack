"use client";
import { useEffect, useState } from "react";

export default function StudentTable({ search }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faculty/my-students", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // ✅ force array safety
        setStudents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setStudents([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-4">Loading students...</p>;
  }

  const filtered = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.project?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Project</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length > 0 ? (
            filtered.map((student) => (
              <tr key={student._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2">{student.project}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-6 text-gray-500">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
