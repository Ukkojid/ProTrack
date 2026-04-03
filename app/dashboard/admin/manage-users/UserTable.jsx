"use client";
import { useEffect, useState } from "react";

export default function UserTable({ search, role }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/users?search=${search}&role=${role}`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, [search, role]);

  const deleteUser = async (id) => {
  if (!confirm("Delete this user?")) return;

  const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
  const data = await res.json();

  if (data.success) {
    setUsers(users.filter(u => u._id !== id));
  } else {
    alert(data.error || "Failed to delete");
  }
};


  if (loading) return <div>Loading users...</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? users.map(user => (
            <tr key={user._id} className="border-t">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3 capitalize">{user.role}</td>
              <td className="p-3">{user.status}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() => deleteUser(user._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" className="p-6 text-center text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
