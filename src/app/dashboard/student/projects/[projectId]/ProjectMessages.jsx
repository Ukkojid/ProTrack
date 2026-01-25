"use client";

import { useEffect, useState } from "react";

export default function ProjectMessages({ projectId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`/api/projects/${projectId}/feedback/messages`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setMessages);
  }, [projectId]);

  async function sendMessage() {
    await fetch(`/api/projects/${projectId}/feedback/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ text }),
    });

    setText("");
    const res = await fetch(
      `/api/projects/${projectId}/feedback/messages`,
      { credentials: "include" }
    );
    setMessages(await res.json());
  }

  return (
    <div>
      <h3>Messages</h3>

      {messages.map((m) => (
        <p key={m._id}>
          <b>{m.sender.name}:</b> {m.text}
        </p>
      ))}

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
