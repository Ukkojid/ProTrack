"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { io } from "socket.io-client";

export default function ProjectMessages() {
  const { projectId } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [me, setMe] = useState(null);

  const bottomRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then(setMe);
  }, []);

  async function loadMessages() {
    const res = await fetch(`/api/projects/${projectId}/chat`, {
      credentials: "include",
    });
    const data = await res.json();
    setMessages(data);
  }

  useEffect(() => {
    if (!projectId) return;

    fetch("/api/socket");

    const socket = io();
    socketRef.current = socket;

    socket.emit("joinProject", projectId);

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    loadMessages();

    return () => socket.disconnect();
  }, [projectId]);

  // add state if not present
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!projectId) return;

    fetch(`/api/projects/${projectId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setProject);
  }, [projectId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!text.trim() && !file) return;

    const formData = new FormData();
    if (text) formData.append("text", text);
    if (file) formData.append("file", file);

    const res = await fetch(`/api/projects/${projectId}/chat`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const savedMessage = await res.json();

    socketRef.current.emit("sendMessage", {
      projectId,
      message: savedMessage,
    });

    setText("");
    setFile(null);
  }

  if (!me) return null;

  return (
    <div className="flex flex-col h-[600px] border rounded-xl bg-gray-50 shadow">
      {/* Project Info Header */}
      <div className="bg-white border rounded-xl shadow-sm p-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Project Name */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {project?.title || "Project"}
            </h2>
            <p className="text-xs text-gray-500">Team collaboration space</p>
          </div>

          {/* Members */}
          <div className="flex -space-x-2">
            {project?.students?.map((s) => (
              <div
                key={s._id}
                className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs border-2 border-white"
                title={s.name}
              >
                {s.name.charAt(0)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => {
          const isMe = m.sender._id === me._id;

          return (
            <div
              key={m._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  isMe
                    ? "bg-blue-600 text-white"
                    : "bg-white border text-gray-800"
                }`}
              >
                {/* Sender */}
                <div className="text-[11px] mb-1 opacity-70">
                  {isMe ? "You" : m.sender.name}
                </div>

                {/* Text */}
                {m.text && (
                  <div className="whitespace-pre-wrap break-words leading-relaxed">
                    {m.text}
                  </div>
                )}

                {/* Image */}
                {m.fileUrl && m.fileType === "image" && (
                  <img
                    src={m.fileUrl}
                    className="mt-2 max-w-full max-h-60 rounded-lg object-cover"
                  />
                )}

                {/* Video */}
                {m.fileUrl && m.fileType === "video" && (
                  <video
                    src={m.fileUrl}
                    controls
                    className="mt-2 max-w-full max-h-60 rounded-lg"
                  />
                )}

                {/* PDF / Docs */}
                {m.fileUrl && m.fileType === "raw" && (
                  <a
                    href={m.fileUrl}
                    target="_blank"
                    className="mt-2 inline-block text-blue-300 underline text-xs"
                  >
                    📄 View Document
                  </a>
                )}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 border-t bg-white rounded-b-xl">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-xs"
        />

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
