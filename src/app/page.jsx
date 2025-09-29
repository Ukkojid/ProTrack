import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import { FaProjectDiagram, FaComments, FaUserGraduate } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white flex flex-col md:flex-row items-center px-6 md:px-20 py-20">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Manage Academic Projects Effortlessly
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-md">
            ProTrack helps students, faculty, and admins track projects, tasks,
            and performance in one unified platform.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link href="/register" className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition font-semibold">
              Get Started
            </Link>
            <Link href="/features" className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-900 transition font-semibold">
              Features
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img src="/hero-illustration.svg" alt="ProTrack Illustration" className="w-3/4" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 text-center px-6 md:px-20">
        <h2 className="text-3xl font-bold mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaProjectDiagram className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Project Management</h3>
            <p>Track all projects, tasks, and submissions in one place.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaComments className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Feedback & Grading</h3>
            <p>Faculty can provide feedback and grade student submissions efficiently.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaUserGraduate className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Student Profiling</h3>
            <p>Showcase skills, projects, and achievements on a personalized profile.</p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-6 md:px-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-6 border-l-4 border-blue-500 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">1. Create Projects</h3>
            <p>Admins and faculty can create projects and assign tasks easily.</p>
          </div>
          <div className="p-6 border-l-4 border-blue-500 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">2. Collaborate & Track</h3>
            <p>Students can submit tasks, track progress, and collaborate with teammates.</p>
          </div>
          <div className="p-6 border-l-4 border-blue-500 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">3. Feedback & Profile</h3>
            <p>Receive faculty feedback and build your academic profile with projects and achievements.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-50 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-12">What Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition">
            <p className="mb-4 italic">"ProTrack has completely transformed how I manage my projects. Highly recommended!"</p>
            <h4 className="font-semibold">Alice Johnson</h4>
            <p className="text-sm text-gray-500">Student</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition">
            <p className="mb-4 italic">"Giving feedback is now seamless and organized. My students love it."</p>
            <h4 className="font-semibold">Dr. Robert Smith</h4>
            <p className="text-sm text-gray-500">Faculty</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition">
            <p className="mb-4 italic">"A one-stop platform for all academic project management needs."</p>
            <h4 className="font-semibold">Emily Davis</h4>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 md:px-20 bg-blue-900 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="mb-6 max-w-xl mx-auto">Sign up today and manage your academic projects effortlessly.</p>
        <Link href="/register" className="bg-yellow-500 text-black px-8 py-4 rounded-lg hover:bg-yellow-400 transition font-semibold">
          Create Account
        </Link>
      </section>

      <Footer />
    </div>
  );
}
