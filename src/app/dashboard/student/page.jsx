"use client";
import { useState } from "react";
import { FaHome, FaProjectDiagram, FaTasks, FaUpload, FaComments, FaUser, FaCog, FaBell, FaSignOutAlt } from "react-icons/fa";

export default function StudentDashboard() {
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
          <a href="#" className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
            <FaProjectDiagram /> {sidebarOpen && <span>Projects</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
            <FaTasks /> {sidebarOpen && <span>Tasks</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
            <FaUpload /> {sidebarOpen && <span>Submissions</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
            <FaComments /> {sidebarOpen && <span>Feedback</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700">
            <FaUser /> {sidebarOpen && <span>Profile</span>}
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
        {/* Top Navbar */}
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-900">Welcome,  </h1>
          <div className="flex items-center space-x-6">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-lg hidden md:block"
            />
            <FaBell className="text-xl cursor-pointer text-blue-900" />
            <img
              src="/defult.png"
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </div>
        </header>

        {/* Dashboard  */}
        <section className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ongoing Projects */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-4">Ongoing Projects</h2>
            <ul className="space-y-2">
              <li className="p-3 border rounded-lg hover:bg-blue-50">ProTrack - 30% complete</li>
            </ul>
          </div>

          {/* Task Tracker */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2 p-2 rounded-2xl bg-black text-yellow-400 text-center">Show All Task  </h2>
            <h2 className="text-xl font-bold mb-4">Task Tracker</h2>
            <p>Completed: <span className="font-bold text-green-600">12</span></p>
            <p>Pending: <span className="font-bold text-red-600">5</span></p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full w-2/3"></div>
            </div>
          </div>

          {/* Faculty Feedback */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-4">Faculty Feedback</h2>
            <div className="p-3 border rounded-lg mb-2">
              "Good progress on ProTrack. Improve documentation." - Prof. Sunita Naik
            </div>
            {/* <div className="p-3 border rounded-lg">
              "Keep working on backend tasks." - Prof. Saniket Kuddo
            </div> */}
          </div>

          {/* Recent Submissions */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Recent Submissions</h2>
            <table className="w-full text-left border">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-2">Project</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">Project Report</td>
                  <td className="p-2">30-09-2025</td>
                  <td className="p-2 text-green-600">Approved</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">40% improment</td>
                  <td className="p-2">30-09-2025</td>
                  <td className="p-2 text-yellow-600">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Performance Chart (Placeholder) */}
          {/* <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition col-span-1 md:col-span-2 lg:col-span-3 text-center">
            <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
            <p className="text-gray-600 mb-2">[Chart will go here – can integrate Recharts/Chart.js later]</p>
            <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center">
              📊
            </div>
          </div> */}
        </section>
      </main>
    </div>
  );
}
