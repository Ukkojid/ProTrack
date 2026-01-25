"use client";
import { useState } from "react";
import StudentTable from "./StudentTable";

export default function MyStudentsPage() {
  const [search, setSearch] = useState("");
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between md:items-center">
        <h1 className="text-3xl font-bold text-gray-800">My Students</h1>
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-64 mt-4 md:mt-0"
        />
      </div>

      {/* Stats Overview (optional but nice for faculty dashboard) */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Students</h3>
          <p className="text-2xl font-bold text-blue-600">18</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Active Projects</h3>
          <p className="text-2xl font-bold text-green-600">12</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Pending Reviews</h3>
          <p className="text-2xl font-bold text-orange-600">5</p>
        </div>
      </div>

      {/* Student Table */}
      <StudentTable search={search} />
    </div>
  );
}
