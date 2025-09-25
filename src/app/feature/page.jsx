import React from 'react'

const Features = () => {
    const features = [
    {
      title: "Project Submission",
      description:
        "Easily upload your project files, documents, and code in a structured way for smooth tracking.",
      icon: "📁",
    },
    {
      title: "Team Collaboration",
      description:
        "Collaborate with your team efficiently, track contributions, and communicate seamlessly.",
      icon: "🤝",
    },
    {
      title: "Faculty Feedback",
      description:
        "Get timely guidance and feedback directly from faculty to improve your work.",
      icon: "📝",
    },
    {
      title: "Skill Showcase",
      description:
        "Highlight your work and skills on your profile, helping with internships and job opportunities.",
      icon: "🌟",
    },
    {
      title: "Screen Recording Upload",
      description:
        "Upload screen recordings of your work to show your workflow and project execution clearly.",
      icon: "🎥",
    },
    {
      title: "Document & Code Tracking",
      description:
        "Track every submission, code commit, and document in one unified dashboard.",
      icon: "📊",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 px-4 py-16">
      <section className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">ProTrack Features</h1>
        <p className="text-gray-600 text-lg">
          Everything you need to manage academic projects efficiently and showcase your skills.
        </p>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition flex flex-col items-center text-center"
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Features
