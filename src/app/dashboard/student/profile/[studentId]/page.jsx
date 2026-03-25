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
  const [files, setFiles] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  const loadProfile = useCallback(async () => {
    if (!studentId) return;
    setLoading(true);
    const res = await fetch(`/api/student/profile/${studentId}`);
    const data = await res.json();
    setProfile(data);
    setLoading(false);
  }, [studentId]);

  const loadPosts = useCallback(async () => {
    const res = await fetch(`/api/posts?studentId=${studentId}`);
    const data = await res.json();
    setPosts(data || []);
  }, [studentId]);

  useEffect(() => {
    loadProfile();
    loadPosts();
  }, [loadProfile, loadPosts]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setCurrentUserId(data?._id));
  }, []);

  const addPost = async () => {
    if (!newPost.trim()) return;

    setPosting(true);

    const formData = new FormData();
    formData.append("content", newPost);
    files.forEach((f) => formData.append("files", f));

    await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    setNewPost("");
    setFiles([]);
    await loadPosts();
    setPosting(false);
  };

  const deletePost = async (id) => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    await loadPosts();
  };

  const isOwnProfile = currentUserId === studentId;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* PROFILE HEADER */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src="/default.png"
            className="w-16 h-16 rounded-full object-cover border"
          />

          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900">
              {profile.name}
            </h1>

            <p className="text-sm text-gray-500">
              {profile.branch} • {profile.year}
            </p>

            {profile.bio && (
              <p className="text-sm text-gray-600 mt-2">
                {profile.bio}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mt-3">
              {profile.skills?.map((s) => (
                <span
                  key={s}
                  className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full border"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* POST CREATOR */}
      {isOwnProfile && (
        <div className="bg-white border rounded-xl p-4 shadow-sm space-y-3">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share something..."
            rows={3}
            className="w-full text-sm border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {files.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {files.map((f, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 px-2 py-1 rounded border"
                >
                  {f.name}
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center">
            <input
              type="file"
              multiple
              onChange={(e) => setFiles([...e.target.files])}
              className="text-sm"
            />

            <button
              onClick={addPost}
              disabled={posting || !newPost.trim()}
              className="bg-blue-600 text-white px-5 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              {posting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      )}

      {/* POSTS */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center text-gray-400 py-10 text-sm">
            No posts yet
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border rounded-xl p-4 shadow-sm space-y-3"
            >
              {/* Post header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <img
                    src="/default.png"
                    className="w-9 h-9 rounded-full border"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      You
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* DELETE ICON BUTTON */}
                {isOwnProfile && (
                  <button
                    onClick={() => deletePost(post._id)}
                    className="text-gray-400 hover:text-red-500 transition"
                    title="Delete post"
                  >
                    🗑️
                  </button>
                )}
              </div>

              {/* Content */}
              <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                {post.content}
              </p>

              {/* Files */}
              {post.files?.length > 0 && (
                <div className="space-y-3">
                  {post.files.map((file, i) => {
                    const url = file.url;

                    if (file.type === "image") {
                      return (
                        <img
                          key={i}
                          src={url}
                          className="w-full rounded-lg border max-h-[400px] object-cover"
                        />
                      );
                    }

                    if (file.type === "video") {
                      return (
                        <video
                          key={i}
                          controls
                          className="w-full rounded-lg border max-h-[400px]"
                        >
                          <source src={url} />
                        </video>
                      );
                    }

                    if (file.type === "document") {
                      return (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          className="flex justify-between items-center border rounded-lg p-3 hover:bg-gray-50 transition"
                        >
                          <span className="text-sm text-gray-600 truncate">
                            {file.fileName || "Document"}
                          </span>
                          <span className="text-blue-600 text-sm">
                            Open
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