"use client";
import { useState } from "react";

export default function StudentTable({ search }) {
  // Mock student data
  const [students] = useState([
    {
      id: 1,
      name: "Rohan Mehta",
      email: "rohan@example.com",
      project: "AI Chatbot for Education",
      progress: 75,
      status: "In Progress",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      project: "Data Analytics Dashboard",
      progress: 100,
      status: "Completed",
    },
    {
      id: 3,
      name: "Amit Verma",
      email: "amit@example.com",
      project: "Mobile App for Learning",
      progress: 40,
      status: "In Progress",
    },
  ]);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.project.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Project</th>
            <th className="px-4 py-2 text-left">Progress</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((student) => (
              <tr key={student.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2">{student.project}</td>
                <td className="px-4 py-2">
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="bg-blue-600 h-2 rounded"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{student.progress}%</span>
                </td>
                <td className="px-4 py-2">{student.status}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button className="text-blue-600 hover:underline">View</button>
                  <button className="text-green-600 hover:underline">Feedback</button>
                  <button className="text-orange-600 hover:underline">Grade</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="text-center py-6 text-gray-500"
              >
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
