"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setPosts(data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-2xl space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-5 rounded-xl border animate-pulse">
              <div className="h-10 w-10 bg-gray-200 rounded-full mb-3" />
              <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-full mb-2" />
              <div className="h-40 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900">
            Community Feed
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Share updates, ideas, and progress with your peers
          </p>
        </div>

        {/* Empty State */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-xl border p-10 text-center">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-600 font-medium">No posts yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Start by sharing something
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl border shadow-sm hover:shadow-md transition p-4"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <Link href={`/dashboard/student/profile/${post.studentId?._id}`}>
                  <img
                    src={post.studentId?.photo || "/default.png"}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </Link>

                <div className="flex-1">
                  <Link
                    href={`/dashboard/student/profile/${post.studentId?._id}`}
                    className="font-semibold text-sm hover:underline"
                  >
                    {post.studentId?.name || "Unknown"}
                  </Link>

                  <p className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>

                <button className="text-gray-400 hover:text-gray-600">
                  ⋯
                </button>
              </div>

              {/* Content */}
              <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                {post.content}
              </div>

              {/* Media */}
              {post.files?.length > 0 && (
                <div className="mt-3 space-y-2">
                  {post.files.map((file, i) => {
                    if (file.type === "image") {
                      return (
                        <img
                          key={i}
                          src={file.url}
                          className="rounded-lg w-full max-h-[400px] object-cover border"
                        />
                      );
                    }

                    if (file.type === "video") {
                      return (
                        <video
                          key={i}
                          controls
                          className="rounded-lg w-full max-h-[400px] border"
                        >
                          <source src={file.url} />
                        </video>
                      );
                    }

                    if (file.type === "document") {
                      return (
                        <a
                          key={i}
                          href={file.url}
                          target="_blank"
                          className="flex items-center gap-2 border rounded-lg p-3 hover:bg-gray-50"
                        >
                          📄
                          <span className="text-sm text-blue-600 truncate">
                            {file.fileName}
                          </span>
                        </a>
                      );
                    }
                  })}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t text-sm text-gray-500">
                <button className="flex items-center gap-1 hover:text-blue-600">
                  👍 Like
                </button>

                <button className="flex items-center gap-1 hover:text-blue-600">
                  💬 Comment
                </button>

                <button className="flex items-center gap-1 hover:text-blue-600">
                  🔁 Share
                </button>

                <button className="flex items-center gap-1 hover:text-blue-600">
                  🔖 Save
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}