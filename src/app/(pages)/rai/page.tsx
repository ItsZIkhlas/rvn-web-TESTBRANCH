"use client";

import { useState, useRef, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/registry/new-york-v4/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/registry/new-york-v4/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/registry/new-york-v4/ui/sheet";
import { Plus, History } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        role: "ai",
        content: `Simulated response to: "${userMessage.content}"`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex flex-col h-full max-h-screen bg-muted/70">
          {/* Header Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h1 className="text-xl font-semibold">Chat Interface</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setMessages([])}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> New Chat
              </Button>
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <History className="w-4 h-4" /> History
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] p-4">
                  <h2 className="text-lg font-semibold mb-4">Old Chats</h2>
                  <ul className="space-y-2">
                    {messages.length === 0 ? (
                      <li className="text-sm text-muted-foreground">
                        No chats yet
                      </li>
                    ) : (
                      messages.map((m, i) => (
                        <li key={i} className="text-sm truncate">
                          {m.content}
                        </li>
                      ))
                    )}
                  </ul>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Chat container */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <div className="max-w-6xl mx-auto flex flex-col gap-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-end ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "ai" && (
                      <img
                        src="/robot-pfp.png"
                        alt="AI"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <div
                      className={`max-w-[75%] px-5 py-3 rounded-2xl text-md leading-relaxed shadow-md transition-all duration-200 whitespace-pre-wrap break-words ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white"
                          : "bg-white border border-gray-200 text-gray-800"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === "user" && (
                      <img
                        src={user?.imageUrl}
                        alt="User"
                        className="w-8 h-8 rounded-full ml-2"
                      />
                    )}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            </div>

            {/* Input */}
            <div className="max-w-3xl mx-auto p-4 w-full">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-end gap-2 border border-gray-300 p-3 rounded-xl shadow-sm"
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="flex-1 resize-none rounded-md border-none focus:outline-none focus:ring-0 text-lg max-h-40 overflow-y-auto"
                  placeholder="Type your message..."
                  rows={5}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50 text-sm"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
