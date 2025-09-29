"use client";
import Link from "next/link";
import { useState } from "react";
import { FaHome, FaProjectDiagram, FaTasks, FaUsers, FaComments, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function FacultyDashboard() {
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
          <Link href="/dashboard/faculty/my-students" className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
            <FaUsers /> {sidebarOpen && <span>My Students</span>}
          </Link>
          <a href="#" className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
            <FaProjectDiagram /> {sidebarOpen && <span>Projects</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
            <FaTasks /> {sidebarOpen && <span>Tasks</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
            <FaComments /> {sidebarOpen && <span>Feedback</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
            <FaChartBar /> {sidebarOpen && <span>Reports</span>}
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
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-900">Welcome, Faculty </h1>
          <div className="flex items-center space-x-6">
            <input type="text" placeholder="Search..." className="px-4 py-2 border rounded-lg hidden md:block" />
            <img src="/defult.png" alt="profile" className="w-10 h-10 rounded-full cursor-pointer" />
          </div>
        </header>

        {/* Dashboard */}
        <section className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Student List */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">My Students</h2>
            <ul className="space-y-2">
              <li className="p-3 border rounded hover:bg-blue-50">Deepak Ukkoji (G-11) - ProTrack</li>
              <li className="p-3 border rounded hover:bg-blue-50">Swayam Shinde (G-12) - Web Development</li>
              <li className="p-3 border rounded hover:bg-blue-50">Yash (G-13) - application Development</li>
              <li className="p-3 border rounded hover:bg-blue-50">Gautam Patel (G-14) - Hotel Management</li>
              <li className="p-3 border rounded hover:bg-blue-50">Ashawin Patel (G-15) - NEWS summary</li>
              <li className="p-3 border rounded hover:bg-blue-50">Vishwa Patel (G-16) - Web Development</li>
              <li className="p-3 border rounded hover:bg-blue-50">chirag (G-17) - Expanse Tracker</li>
            </ul>
          </div>

          {/* Feedback Tasks */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2 text-xl text-yellow-300 bg-black text-center p-2 rounded-2xl">Groupwise Data show</h3>
            <h2 className="text-xl font-bold mb-4">Pending Feedback</h2>
            <p>AI Project - Needs review</p>
            <p>Database Project - Waiting for grading</p>
          </div>

          {/* Reports */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2 text-xl text-yellow-300 bg-black text-center p-2 rounded-2xl">Groupwise Data show</h3>
            <h2 className="text-xl font-bold mb-4">Reports Overview</h2>
            <p>✔️ 8 Projects Supervised</p>
            <p>📑 4 Feedbacks Given</p>
            <p>📊 Avg Completion: 50%</p>
          </div>
        </section>
      </main>
    </div>
  );
}
