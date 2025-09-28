"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handlesubmit = (e)=> {
    e.preventDefault();

    if(!email || !password){
      setError("Please fill in both field.");
      return;
    }

    if(email === "admin" && password === "admin"){
      router.push("/users/admin/dashboard");
    } 
    else if(email === "2" && password === "2"){
      router.push("/users/students/dashboard");
    }
    else if(email === "1" && password === "1"){
      router.push("/users/faculty/dashboard");
    }
    else {
      setError("Invalid email and password")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 flex flex-col">
      {/* Login Section */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Login
          </h2>
          <form onSubmit={handlesubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>

             {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
