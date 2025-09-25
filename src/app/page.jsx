import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-16 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 leading-tight mb-4">
          Track, Collaborate & Showcase Academic Projects
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          ProTrack makes project management easier for students, faculty, and
          admins.
        </p>
        <Link
          href="/auth/login"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">
            Smart Submissions
          </h3>
          <p className="text-gray-600">
            Upload and organize your project files, documents, and code with
            ease.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">
            Collaboration Hub
          </h3>
          <p className="text-gray-600">
            Work with your team in real time and track contributions clearly.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">
            Faculty Feedback
          </h3>
          <p className="text-gray-600">
            Get constructive feedback and mentoring directly on your work.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
