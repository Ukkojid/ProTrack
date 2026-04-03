import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaProjectDiagram, FaTasks, FaUsers, FaChartLine } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: <FaProjectDiagram className="text-blue-600 text-4xl mb-4" />,
      title: "Project Management",
      description: "Create and manage all academic projects in a single platform, assign tasks and track progress."
    },
    {
      icon: <FaTasks className="text-blue-600 text-4xl mb-4" />,
      title: "Task Tracking",
      description: "Students and faculty can monitor task completion, deadlines, and submissions efficiently."
    },
    {
      icon: <FaUsers className="text-blue-600 text-4xl mb-4" />,
      title: "Collaboration",
      description: "Team members can collaborate seamlessly, share updates, and maintain communication."
    },
    {
      icon: <FaChartLine className="text-blue-600 text-4xl mb-4" />,
      title: "Analytics & Reports",
      description: "Track performance metrics, project stats, and get actionable insights."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="bg-blue-50 py-20 px-6 md:px-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Features That Make ProTrack Stand Out</h1>
        <p className="mb-12 max-w-2xl mx-auto text-lg">
          Designed to simplify project management for students, faculty, and admins.
        </p>
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Optional CTA */}
      <section className="bg-blue-900 text-white py-16 text-center px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience ProTrack?</h2>
        <p className="mb-6 max-w-xl mx-auto">Sign up today and simplify your academic project workflow.</p>
        <a href="/register" className="bg-yellow-500 text-black px-8 py-3 rounded-lg hover:bg-yellow-400 transition font-semibold">
          Create Account
        </a>
      </section>

      <Footer />
    </div>
  );
}
