"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState({
    email: true,
    chat: true,
    projects: true,
  });

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        if (data?.notifications) {
          setNotifications(data.notifications);
        }
      });
  }, []);

  const handleToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveNotifications = async () => {
    await fetch("/api/user/notifications", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notifications }),
    });

    alert("Saved!");
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-8">

      <h1 className="text-2xl font-semibold text-gray-900">
        Settings
      </h1>

      {/* ACCOUNT */}
      <div className="bg-white border rounded-xl p-5 shadow-sm space-y-3">
        <h2 className="font-semibold text-gray-800">Account</h2>

        <div className="text-sm text-gray-600">
          <p><span className="font-medium">Name:</span> {user.name}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
        </div>

        <button className="text-sm text-blue-600 hover:underline">
          Edit Profile
        </button>
      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
        <h2 className="font-semibold text-gray-800">Notifications</h2>

        {/* Toggle Item */}
        {[
          { key: "email", label: "Email Notifications" },
          { key: "chat", label: "Chat Messages" },
          { key: "projects", label: "Project Updates" },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              {item.label}
            </span>

            <button
              onClick={() => handleToggle(item.key)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                notifications[item.key]
                  ? "bg-blue-500"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                  notifications[item.key] ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        ))}

        <button
          onClick={saveNotifications}
          className="mt-2 bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>

      {/* SECURITY */}
      <div className="bg-white border rounded-xl p-5 shadow-sm space-y-3">
        <h2 className="font-semibold text-gray-800">Security</h2>

        <button className="text-sm text-blue-600 hover:underline">
          Change Password
        </button>
      </div>

      {/* DANGER ZONE */}
      <div className="bg-white border border-red-200 rounded-xl p-5 shadow-sm space-y-3 ">
        <h2 className="font-semibold text-red-600">privacy</h2>

        <button
          onClick={logout}
          className="text-sm mr-10 bg-red-600 rounded-2xl px-3 py-1 text-white hover:bg-red-700"
        >
          Logout
        </button>

        <button className="text-sm bg-red-600 text-white rounded-2xl px-3 py-1 hover:bg-red-700">
          Delete Account
        </button>
      </div>
    </div>
  );
}