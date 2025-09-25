import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 px-4 py-16">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          About ProTrack
        </h1>
        <p className="text-gray-600 text-lg">
          ProTrack is designed to streamline academic project management, helping students, faculty, and admins collaborate efficiently and showcase skills effectively.
        </p>
      </section>

      {/* Flow Section */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-10">How ProTrack Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1 text-center bg-white rounded-2xl shadow p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">1. Project Submission</h3>
            <p className="text-gray-600">
              Students upload projects, code, and documents in an organized way.
            </p>
          </div>
          <div className="flex-1 text-center bg-white rounded-2xl shadow p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">2. Collaboration</h3>
            <p className="text-gray-600">
              Teams can work together, track contributions, and communicate efficiently.
            </p>
          </div>
          <div className="flex-1 text-center bg-white rounded-2xl shadow p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">3. Feedback & Mentoring</h3>
            <p className="text-gray-600">
              Faculty provide guidance and constructive feedback directly on submissions.
            </p>
          </div>
          <div className="flex-1 text-center bg-white rounded-2xl shadow p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">4. Skill Showcase</h3>
            <p className="text-gray-600">
              Students’ work is visible in profiles, helping showcase skills for internships or jobs.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">Organized Projects</h3>
          <p className="text-gray-600">Keep all submissions and documents neatly structured.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">Team Collaboration</h3>
          <p className="text-gray-600">Work seamlessly with your project team on shared tasks.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">Faculty Guidance</h3>
          <p className="text-gray-600">Receive timely feedback to improve project quality.</p>
        </div>
      </section>

      {/* Vision / Quote */}
      <section className="max-w-4xl mx-auto text-center">
        <p className="text-gray-700 italic text-lg">
          "Empowering students to showcase their skills and collaborate smarter, not harder."
        </p>
      </section>
    </div>
  )
}

export default About
