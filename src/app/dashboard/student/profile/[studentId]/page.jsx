"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const params = useParams();
  const studentId = params?.studentId;

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  const loadProfile = useCallback(async () => {
    if (!studentId) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/student/profile/${studentId}`);
      if (!res.ok)
        throw new Error(`Error ${res.status}: Could not load profile`);
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  const loadPosts = useCallback(async () => {
    if (!studentId) return;
    try {
      const res = await fetch(`/api/posts?studentId=${studentId}`);
      if (!res.ok) return;
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to load posts:", err);
    }
  }, [studentId]);

  useEffect(() => {
    loadProfile();
    loadPosts();
  }, [loadProfile, loadPosts]);

  const addPost = async () => {
    const trimmed = newPost.trim();
    if (!trimmed || posting) return;

    setPosting(true);

    try {
      const formData = new FormData();

      formData.append("content", newPost);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to post");

      setNewPost("");

      setFiles([]);

      await loadPosts();
    } catch (err) {
      console.error("Post error:", err);
    } finally {
      setPosting(false);
    }
  };

  const deletePost = async (postId) => {
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      await loadPosts();
    } catch (error) {
      console.error("Delete error:", err);
    }
  }

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        setCurrentUserId(data?._id);
      } catch (err) {
        console.log("Auth fetch error:", err);
      }
    };

    getCurrentUser();
  });

  const isOwnProfile = currentUserId === studentId;

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-sm">Loading profile…</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-4xl mb-3">😕</p>
          <p className="text-gray-700 font-medium mb-1">Profile not found</p>
          <p className="text-sm text-gray-400">{error}</p>
          <button
            onClick={loadProfile}
            className="mt-4 text-sm text-blue-600 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex gap-4">
            <img
              src="/defult.png"
              // alt={post.studentId?.name || "Student"}
              className="mt-2 w-10 h-10 rounded-full object-cover ring-2 ring-offset-1 ring-gray-100 group-hover:ring-blue-200 transition"
            />

            <div>
              <h1 className="text-2xl font-semibold">{profile.name}</h1>

              <p className="text-gray-500 text-sm">
                {profile.branch} • {profile.year}
              </p>

              {profile.bio && (
                <p className="text-gray-600 text-sm mt-2">{profile.bio}</p>
              )}

              <div className="flex gap-2 flex-wrap mt-3">
                {profile.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Composer */}
        {isOwnProfile && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {/* Text area */}
            <div className="px-4 pt-4">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && e.ctrlKey && addPost()}
                placeholder="Share a project update or achievement…"
                rows={3}
                disabled={posting}
                className="w-full text-sm text-gray-800 placeholder-gray-400 resize-none outline-none bg-transparent disabled:opacity-50 leading-relaxed"
              />
            </div>

            {/* File pills */}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 px-4 pb-3">
                {files.map((f, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-500 px-3 py-1 max-w-[180px]"
                  >
                    <span className="truncate">{f.name}</span>
                    <button
                      onClick={() =>
                        setFiles(files.filter((_, idx) => idx !== i))
                      }
                      className="text-gray-400 hover:text-gray-600 transition-colors leading-none"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Bottom bar */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {/* Attach button */}
                <label className="cursor-pointer p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13.5 7.5L7.5 13.5C6.12 14.88 3.88 14.88 2.5 13.5C1.12 12.12 1.12 9.88 2.5 8.5L8.5 2.5C9.33 1.67 10.67 1.67 11.5 2.5C12.33 3.33 12.33 4.67 11.5 5.5L5.5 11.5C5.09 11.91 4.41 11.91 4 11.5C3.59 11.09 3.59 10.41 4 10L9.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => setFiles([...e.target.files])}
                  />
                </label>

                <span className="text-xs text-gray-400">
                  Ctrl + Enter to post
                </span>
              </div>

              <button
                onClick={addPost}
                disabled={!newPost.trim() || posting}
                className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium px-4 py-1.5 rounded-lg border border-blue-200 transition-colors"
              >
                {posting && (
                  <span className="w-3 h-3 border border-blue-400 border-t-blue-700 rounded-full animate-spin" />
                )}
                {posting ? "Posting…" : "Post"}
              </button>
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-1">
            Updates {posts.length > 0 && `· ${posts.length}`}
          </h2>

          {posts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-12 text-center text-gray-400 text-sm">
              No posts yet. Share your first update!
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-white border rounded-xl p-4 shadow-sm"
              >
                {isOwnProfile && (
                  <button
                    onClick={() => deletePost(post._id)}
                    className="text-red-500 text-xs float-right hover:underline"
                  >
                    Delete
                  </button>
                )}
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

                <div className="text-xs text-gray-400 mt-3">
                  {new Date(post.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
