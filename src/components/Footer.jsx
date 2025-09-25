import React from 'react'

const footer = () => {
  return (
    <div>
      <footer className="bg-gradient-to-r from-indigo-50 to-teal-50 border-t-1 border-blue-500">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} ProTrack. Designed with care for academics.</p>
      </div>
    </footer>
    </div>
  )
}

export default footer
