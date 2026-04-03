"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold  ">
          
          <Link href="/" className="flex items-center"><img src="/logo.png" alt=""  className="w-10 rounded-full mr-3"/>ProTrack</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" prefetch={true} className="hover:text-yellow-300 transition">Home</Link>
          <Link href="/features" prefetch={true} className="hover:text-yellow-300 transition">Features</Link>
          <Link href="/about" prefetch={true} className="hover:text-yellow-300 transition">About</Link>
          <Link href="/contact" prefetch={true} className="hover:text-yellow-300 transition">Contact</Link>

          {/* Optional dropdown for user roles */}
          <div className="relative group">
            <button className="flex items-center  hover:text-yellow-300 transition">
              Account <FaUserCircle className="text-2xl ml-1" />
            </button>
            <div className="absolute hidden group-hover:block bg-white text-blue-600 rounded shadow-lg mt-1 py-2 w-40">
              <Link href="/login" prefetch={true} className="block px-4 py-2 hover:bg-blue-100">Login</Link>
              <Link href="/register" prefetch={true} className="block px-4 py-2 hover:bg-blue-100">Register</Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-4 space-y-3 animate-slideDown">
          <Link href="/" className="block hover:text-yellow-300 transition">Home</Link>
          <Link href="/features" className="block hover:text-yellow-300 transition">Features</Link>
          <Link href="/about" className="block hover:text-yellow-300 transition">About</Link>
          <Link href="/contact" className="block hover:text-yellow-300 transition">Contact</Link>
          <Link href="/login" className="block hover:text-yellow-300 transition">Login</Link>
          <Link href="/register" className="block hover:text-yellow-300 transition">Register</Link>
        </div>
      )}
    </nav>
  );
}
