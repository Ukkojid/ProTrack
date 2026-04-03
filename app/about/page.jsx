import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaBullseye, FaUsers, FaLightbulb } from "react-icons/fa";

export default function About() {
  const values = [
    { icon: <FaBullseye className="text-blue-600 text-4xl mb-4" />, title: "Our Mission", description: "To simplify academic project management and make collaboration seamless." },
    { icon: <FaUsers className="text-blue-600 text-4xl mb-4" />, title: "Our Team", description: "A group of passionate developers and educators committed to improving student performance tracking." },
    { icon: <FaLightbulb className="text-blue-600 text-4xl mb-4" />, title: "Our Vision", description: "To be the leading platform for managing academic projects efficiently." }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-20 px-6 md:px-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About ProTrack</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          ProTrack is an academic project management system designed for students, faculty, and administrators to track, manage, and improve project workflows efficiently.
        </p>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-12">Our Mission, Vision & Team</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
              {value.icon}
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Optional CTA */}
      <section className="bg-blue-900 text-white py-16 text-center px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us Today</h2>
        <p className="mb-6 max-w-xl mx-auto">Create your account and start managing projects with ProTrack.</p>
        <a href="/register" className="bg-yellow-500 text-black px-8 py-3 rounded-lg hover:bg-yellow-400 transition font-semibold">
          Get Started
        </a>
      </section>

      <Footer />
    </div>
  );
}
