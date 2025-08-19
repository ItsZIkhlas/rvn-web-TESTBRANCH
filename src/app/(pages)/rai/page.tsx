"use client";

import { useState, useRef, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "@clerk/nextjs";
import {
  SidebarInset,
  SidebarProvider,
} from "@/registry/new-york-v4/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/registry/new-york-v4/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/registry/new-york-v4/ui/sheet";
import { Plus, History } from "lucide-react";
import { createSupabaseClientWithAuth } from "@/lib/supabase";

interface Message {
  role: "user" | "ai";
  content: string;
  created_at?: string;
}

interface Conversation {
  id: string;
  summary: string;
  archived: boolean;
  created_at: string;
  updated_at: string;
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [prevConversations, setPrevConversations] = useState<Conversation[] | null>(null);
  const [convoId, setConvoId] = useState<string>();
  const { user } = useUser();
  const { getToken } = useAuth();

  // fetch conversations
  const handleMsgData = async () => {
    const token = await getToken({ template: "supabase" });
    if (!token) return;

    const supabase = createSupabaseClientWithAuth(token);

    const { data: prevConvos, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("user_id", user?.id);

    if (error) {
      console.error("Error fetching conversations:", error);
      setPrevConversations(null);
    } else {
      setPrevConversations(prevConvos);
    }
  };

  // fetch messages for a conversation
  const handleMessageRender = async (conversation_id: string) => {
    setConvoId(conversation_id);

    const token = await getToken({ template: "supabase" });
    if (!token) return;

    const supabase = createSupabaseClientWithAuth(token);

    const { data: currentMsg, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", user?.id)
      .eq("conversation_id", conversation_id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    } else {
      setMessages(currentMsg ?? []);
    }
  };

  // send message locally + placeholder
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const placeholder: Message = { role: "ai", content: "..." };

    // add user msg + placeholder in one go
    setMessages((prev) => [...prev, userMessage, placeholder]);

    setInput("");
    setLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        role: "ai",
        content: `🤖 Simulated AI response: "${userMessage.content}"`,
      };

      // replace last placeholder with real ai msg
      setMessages((prev) => [...prev.slice(0, -1), aiMessage]);
      setLoading(false);
    }, 800);
  };

  // scroll to bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // only fetch conversations once on mount
  useEffect(() => {
    handleMsgData();
  }, []);

  // 🔴 Realtime subscription (commented - costs money if left on)
  /*
  useEffect(() => {
    if (!convoId) return;

    (async () => {
      const token = await getToken({ template: "supabase" });
      if (!token) return;

      const supabase = createSupabaseClientWithAuth(token);

      const channel = supabase
        .channel("messages")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${convoId}`,
          },
          (payload) => {
            setMessages((prev) => [...prev, payload.new]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    })();
  }, [convoId]);
  */

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
        <div className="flex flex-col h-full max-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-gray-900/70 backdrop-blur-xl shadow-lg">
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Chat Console
            </h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setMessages([])}
                className="flex items-center gap-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/10"
              >
                <Plus className="w-4 h-4" /> New Chat
              </Button>
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-purple-400 text-purple-300 hover:bg-purple-400/10"
                  >
                    <History className="w-4 h-4" /> History
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] p-4 bg-gray-900/90 backdrop-blur-md border-l border-purple-500/30 text-white"
                >
                  <SheetTitle className="text-lg font-semibold mb-4 text-purple-300">
                    Previous Chats
                  </SheetTitle>
                  <ul className="space-y-2">
                    {!prevConversations ? (
                      <li className="text-sm text-gray-400">No chats yet</li>
                    ) : (
                      prevConversations.map((m, i) => (
                        <li
                          key={i}
                          className="text-sm truncate px-3 py-2 rounded-md bg-gray-800/50 hover:bg-gray-700/50 transition cursor-pointer"
                          onClick={() => {
                            handleMessageRender(m.id);
                            setSheetOpen(false);
                          }}
                        >
                          {m.summary}
                        </li>
                      ))
                    )}
                  </ul>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "ai" && (
                  <img
                    src="/robot-pfp.png"
                    alt="AI"
                    className="w-8 h-8 rounded-full mr-2 border border-cyan-400/50"
                  />
                )}
                <div
                  className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-lg whitespace-pre-wrap break-words transition-all duration-300 ${msg.role === "user"
                    ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white"
                    : msg.content === "..."
                      ? "bg-gray-700/50 italic text-gray-400"
                      : "bg-gray-800/80 border border-gray-700 text-gray-100"
                    }`}
                >
                  {msg.content}
                </div>

                {msg.role === "user" && (
                  <img
                    src={user?.imageUrl}
                    alt="User"
                    className="w-8 h-8 rounded-full ml-2 border border-blue-400/50"
                  />
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="max-w-3xl mx-auto p-4 w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-end gap-2 p-3 rounded-xl shadow-lg bg-gray-900/80 border border-gray-700 backdrop-blur-md"
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
                className="flex-1 resize-none rounded-md bg-transparent border-none focus:outline-none text-lg text-white placeholder-gray-400 max-h-40 overflow-y-auto"
                placeholder="Type your message..."
                rows={2}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-4 py-2 rounded-md disabled:opacity-50 text-sm shadow-cyan-500/30"
              >
                {loading ? "Thinking..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
