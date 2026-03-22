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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-sm">Loading feed…</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Community Feed
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            See what your peers are working on.
          </p>
        </div>

        {/* Empty State */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 text-center">
            <p className="text-3xl mb-3">📭</p>
            <p className="text-gray-500 font-medium">No posts yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Be the first to share an update!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-blue-100 transition-colors"
            >
              {/* Author Row */}
              <Link
                href={`/dashboard/student/profile/${post.studentId?._id}`}
                className="flex items-center gap-3 group mb-4"
              >
                <img
                  src={post.studentId?.photo || "/defult.png"}
                  alt={post.studentId?.name || "Student"}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-offset-1 ring-gray-100 group-hover:ring-blue-200 transition"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition truncate">
                    {post.studentId?.name || "Unknown Student"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition font-medium">
                  View Profile →
                </span>
              </Link>
              {/* Post Content */}
              <p className="text-gray-800 text-sm whitespace-pre-line leading-relaxed">
                {post.content}
              </p>
              {post.files?.length > 0 && (
                <div className="mt-3 grid gap-2">
                  {post.files.map((file, i) => {
                    if (file.type === "image") {
                      return (
                        <img
                          key={i}
                          src={file.url}
                          className="rounded-xl max-h-[420px] object-cover w-full border"
                        />
                      );
                    }

                    if (file.type === "video") {
                      return (
                        <video
                          key={i}
                          controls
                          className="rounded-xl max-h-[420px] w-full border"
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
                          📄{" "}
                          <span className="text-sm text-blue-600">
                            {file.fileName}
                          </span>
                        </a>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
