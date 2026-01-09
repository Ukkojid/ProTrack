"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "123", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      if (data.role === "student") router.push("/dashboard/student");
      if (data.role === "faculty") router.push("/dashboard/faculty");
      if (data.role === "admin") router.push("/dashboard/admin");
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side with gradient + text */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white p-12">
        <h1 className="text-4xl font-bold mb-4">ProTrack</h1>
        <p className="text-lg text-gray-200 max-w-md text-center">
          Manage your academic projects, track progress, and collaborate
          effortlessly with your team and guides.
        </p>
      </div>

      {/* Right side with login form */}
      <div className="flex flex-1 justify-center items-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Welcome Back
          </h2>

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition duration-200"
          >
            Login
          </button>

          <div className="flex justify-between items-center mt-4 text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
            <a href="/register" className="text-blue-600 hover:underline">
              Create Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
