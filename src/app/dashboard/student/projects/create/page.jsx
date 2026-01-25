"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProject() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [students, setStudents] = useState([]);
  const [facultyList, setFacultyList] = useState([]);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [error, setError] = useState("");

  const [openStudentDropdown, setOpenStudentDropdown] = useState(false);

  useEffect(() => {
    fetch("/api/users/students")
      .then((res) => res.json())
      .then(setStudents);

    fetch("/api/users/faculty")
      .then((res) => res.json())
      .then(setFacultyList);
  }, []);

  const toggleStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents((prev) => prev.filter((s) => s !== id));
    } else {
      if (selectedStudents.length >= 2) return;
      setSelectedStudents((prev) => [...prev, id]);
    }
  };

  const createProject = async () => {
    setError("");

    if (!title.trim()) {
      return setError("Project title is required");
    }

    if (selectedStudents.length !== 2) {
      return setError("Select exactly 2 students (you are automatically included)");
    }

    if (!selectedFaculty) {
      return setError("Please select a faculty");
    }

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        students: selectedStudents, // ONLY 2
        faculty: selectedFaculty,
      }),
    });

    if (res.ok) {
      router.push("/dashboard/student/projects");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Create Project</h2>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {/* Project title */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-1">
          Project Title
        </label>
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Enter project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Students dropdown */}
      <div className="mb-5 relative">
        <label className="block text-sm font-medium mb-1">
          Group Members (2 students + you)
        </label>

        <button
          type="button"
          onClick={() => setOpenStudentDropdown(!openStudentDropdown)}
          className="w-full border rounded px-3 py-2 text-left"
        >
          {selectedStudents.length}/2 selected
        </button>

        {openStudentDropdown && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-auto">
            {students.map((student) => {
              const checked = selectedStudents.includes(student._id);
              const disabled = !checked && selectedStudents.length >= 2;

              return (
                <label
                  key={student._id}
                  className={`flex items-center px-3 py-2 ${
                    disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleStudent(student._id)}
                  />
                  {student.name}
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Faculty */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Assigned Faculty
        </label>
        <select
          className="w-full border rounded px-3 py-2"
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
        >
          <option value="">Select faculty</option>
          {facultyList.map((f) => (
            <option key={f._id} value={f._id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={createProject}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Create Project
      </button>
    </div>
  );
}
