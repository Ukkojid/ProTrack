"use client";

export default function StudentTable({ projects, search }) {
  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.students.some(
        (s) =>
          s.name?.toLowerCase().includes(search.toLowerCase()) ||
          s.email?.toLowerCase().includes(search.toLowerCase())
      )
  );

  if (filteredProjects.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
        No data found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredProjects.map((project) => (
        <div key={project._id} className="bg-white rounded-xl shadow">
          {/* Project Header */}
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <span className="text-sm text-gray-600">
              Status: {project.status}
            </span>
          </div>

          {/* Students Table */}
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {project.students.map((student) => (
                <tr key={student._id} className="border-t">
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
