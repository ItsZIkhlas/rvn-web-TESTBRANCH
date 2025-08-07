"use client"
import { useState } from "react";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulated AI response
    setTimeout(() => {
      const aiMessage: Message = {
        role: "ai",
        content: `🤖 Simulated response to: "${userMessage.content}"`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-muted/40">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white self-end"
                  : "bg-gray-200 text-black self-start"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="p-4 border-t bg-white"
      >
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded disabled:opacity-50 text-sm"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
