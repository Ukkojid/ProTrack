"use client";

import { useEffect, useState } from "react";

const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const BRANCH_OPTIONS = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Civil",
  "Other",
];

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md bg-white
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md bg-white
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function StudentProfilePage() {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    branch: "",
    year: "",
    skills: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch("/api/student/profile")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setForm({
            name: data.name || "",
            bio: data.bio || "",
            branch: data.branch || "",
            year: data.year || "",
            skills: data.skills?.join(", ") || "",
          });
        }
      })
      .catch(() =>
        setStatus({ type: "error", message: "Failed to load profile." })
      )
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status) setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const payload = {
        ...form,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const res = await fetch("/api/student/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      setStatus({ type: "success", message: "Profile saved successfully!" });
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-sm">Loading profile…</p>
        </div>
      </div>
    );
  }

  const skillsArray = form.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          My Profile
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Update your personal and academic information.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6"
      >
        <InputField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
        />

        {/* Bio */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Write a short introduction..."
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md bg-white
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
        </div>

        {/* Branch + Year */}
        <div className="grid md:grid-cols-2 gap-5">
          <SelectField
            label="Branch"
            name="branch"
            value={form.branch}
            onChange={handleChange}
            options={BRANCH_OPTIONS}
          />
          <SelectField
            label="Year"
            name="year"
            value={form.year}
            onChange={handleChange}
            options={YEAR_OPTIONS}
          />
        </div>

        {/* Skills */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Skills
          </label>

          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="React, Node.js, Python"
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

          <p className="text-xs text-gray-400">
            Separate skills with commas
          </p>

          {skillsArray.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {skillsArray.map((skill) => (
                <span
                  key={skill}
                  className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Status */}
        {status && (
          <div
            className={`text-sm px-4 py-2 rounded-md border ${
              status.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-600 border-red-200"
            }`}
          >
            {status.message}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md text-sm font-medium transition"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}