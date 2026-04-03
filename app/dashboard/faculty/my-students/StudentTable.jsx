"use client";

export default function StudentTable({ projects, search }) {
  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.students?.some(
        (s) =>
          s.name?.toLowerCase().includes(search.toLowerCase()) ||
          s.email?.toLowerCase().includes(search.toLowerCase())
      )
  );

  if (filteredProjects.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border text-center text-gray-500">
        No data found
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {filteredProjects.map((project) => (
        <div
          key={project._id}
          className="bg-white rounded-xl border shadow-sm overflow-hidden"
        >

          {/* Project Header */}
          <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">
              {project.title}
            </h2>

            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              project.status === "reviewed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {project.status || "active"}
            </span>
          </div>

          {/* Students Table */}
          {project.students?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium">Student</th>
                    <th className="px-6 py-3 text-left font-medium">Email</th>
                    <th className="px-6 py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {project.students.map((student) => (
                    <tr
                      key={student._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      {/* Student */}
                      <td className="px-6 py-3 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
                          {student.name?.charAt(0)}
                        </div>

                        <span className="font-medium text-gray-800">
                          {student.name}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-3 text-gray-600">
                        {student.email}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          Assigned
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-6 text-sm text-gray-400">
              No students assigned to this project
            </div>
          )}
        </div>
      ))}

    </div>
  );
}