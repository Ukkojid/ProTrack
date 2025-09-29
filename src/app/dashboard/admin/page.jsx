"use client";
import { useState } from "react";
import Image from "next/image";
import { FaHome, FaUsers, FaProjectDiagram, FaTasks, FaCog, FaChartPie, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-blue-900 text-white ${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300 flex flex-col`}>
        <div className="flex items-center justify-between p-4 font-bold text-xl">
          {sidebarOpen && "ProTrack"}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
            {sidebarOpen ? "«" : "»"}
          </button>
        </div>
        <nav className="flex-1 px-2 space-y-2">
          <a href="#" className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
            <FaHome /> {sidebarOpen && <span>Dashboard</span>}
          </a>
          <a href="/dashboard/admin/manage-users" className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
            <FaUsers /> {sidebarOpen && <span>Manage Users</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
            <FaProjectDiagram /> {sidebarOpen && <span>All Projects</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
            <FaTasks /> {sidebarOpen && <span>Tasks</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
            <FaChartPie /> {sidebarOpen && <span>Analytics</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
            <FaCog /> {sidebarOpen && <span>Settings</span>}
          </a>
        </nav>
        <div className="p-4 border-t border-blue-700">
          <a href="/login" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-700">
            <FaSignOutAlt /> {sidebarOpen && <span>Logout</span>}
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-900">Admin Dashboard 🛠️</h1>
          <img src="/defult.png" alt="profile" className="w-10 h-10 rounded-full cursor-pointer" />
        </header>

        <section className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Management */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <p>Total Students: <span className="font-bold">70</span></p>
            <p>Total Faculty: <span className="font-bold">10</span></p>
            <p>Admins: <span className="font-bold">3</span></p>
          </div>

          {/* Projects */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Projects</h2>
            <p>Ongoing: 24</p>
            <p>Completed: 1</p>
            <p>Pending Approval: 5</p>
          </div>

          {/* Analytics */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">System Analytics</h2>
            <p>Active Users Today: 45</p>
            <p>Submissions Uploaded: 12</p>
            <p>Feedbacks Given: 9</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Student Progress</h2>
            <h2>student list</h2>
            <h2>(group 1)</h2>
            <button className=" text-zinc-600 mt-5 rounded-2xl cursor-pointer">all student ....</button>
          </div>


          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Faculty</h2>
            <h2>Faculty list</h2>
            <h2>(Faculty group assign)</h2>
            <button className=" text-zinc-600 mt-5 rounded-2xl cursor-pointer">all Faculty ....</button>
          </div>

          
        </section>
      </main>
    </div>
  );
}
