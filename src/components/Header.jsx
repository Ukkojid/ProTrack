import Link from 'next/link'
import React from 'react'

const hearder = () => {
  return (
    <div>
      <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-700"><Link href='/'>ProTrack</Link></h1>
        <nav className="space-x-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <Link href="/feature" className="hover:text-indigo-600">Features</Link>
          <Link href="/about" className="hover:text-indigo-600">About</Link>
          <Link href="/auth/login" className="hover:text-indigo-600">Login</Link>
        </nav>
      </div>
    </header>
    </div>
  )
}

export default hearder
