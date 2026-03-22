"use client";
import { useState } from "react";
import UserTable from "./UserTable";

export default function ManageUsersPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Users</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 border rounded w-full md:w-40"
        >
          <option value="">All Roles</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <UserTable search={search} role={role} />
    </div>
  );
}
