"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

export default function ProjectMessages() {
  const { projectId } = useParams(); // ✅ yaha se milega
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [me, setMe] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(res => res.json())
      .then(setMe);
  }, []);

  async function loadMessages() {
    if (!projectId) return;

    const res = await fetch(`/api/projects/${projectId}/chat`, {
      credentials: "include",
    });
    const data = await res.json();
    setMessages(data);
  }

  useEffect(() => {
    if (!projectId) return;
    loadMessages();
    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
  }, [projectId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!text.trim() && !file) return;

    const formData = new FormData();
    if (text) formData.append("text", text);
    if (file) formData.append("file", file);

    await fetch(`/api/projects/${projectId}/chat`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    setText("");
    setFile(null);
    loadMessages();
  }

  if (!me) return null;

  return (
    <div className="flex flex-col h-[450px] border rounded-lg bg-gray-100">
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map(m => {
          const isMe = m.sender._id === me._id;

          return (
            <div key={m._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${isMe ? "bg-green-200" : "bg-white border"}`}>
                
                {/* 🔥 sender name ab dono side pe */}
                <div className="text-xs font-semibold text-gray-600 mb-1">
                  {isMe ? "You" : m.sender.name}
                </div>

                {m.text && <div>{m.text}</div>}

                {m.fileUrl && m.fileType === "image" && (
                  <img src={m.fileUrl} className="mt-1 max-w-xs rounded" />
                )}

                {m.fileUrl && m.fileType !== "image" && (
                  <a href={m.fileUrl} target="_blank" className="text-blue-600 underline text-xs">
                    View File
                  </a>
                )}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 p-2 border-t bg-white">
        <input type="file" onChange={e => setFile(e.target.files[0])} className="text-xs" />

        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter" && !e.shiftkey) {
                e.preventDefault();
                sendMessage();
            }
          }}
          placeholder="Type a message"
          className="flex-1 border rounded px-3 py-2 text-sm"
        />

        <button onClick={sendMessage} className="bg-green-500 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
