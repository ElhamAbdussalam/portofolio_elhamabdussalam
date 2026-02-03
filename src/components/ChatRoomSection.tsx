"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { supabase } from "@/lib/supabase"; // Import supabase

// Types
type ChatMessage = {
  id: string;
  user_id: string;
  user_name: string;
  user_image?: string;
  message: string;
  created_at: string;
  provider: string;
};

export default function ChatRoomSection() {
  const { data: session, status } = useSession();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch messages from Supabase on mount
  useEffect(() => {
    fetchMessages();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("chat_messages_channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as ChatMessage]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Fetch messages from database
  const fetchMessages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
    } else {
      setMessages(data || []);
    }
    setIsLoading(false);
  };

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle Google login
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: window.location.href });
  };

  // Handle GitHub login
  const handleGithubLogin = () => {
    signIn("github", { callbackUrl: window.location.href });
  };

  // Handle logout
  const handleLogout = () => {
    signOut();
  };

  // Handle send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !session?.user) return;

    setIsSending(true);

    const messageData = {
      user_id: session.user.id || session.user.email || "unknown",
      user_name: session.user.name || "Anonymous",
      user_image: session.user.image || null,
      message: newMessage.trim(),
      provider: session.user.email?.includes("gmail") ? "google" : "github",
    };

    // Insert to Supabase
    const { error } = await supabase
      .from("chat_messages")
      .insert([messageData]);

    if (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } else {
      setNewMessage("");
    }

    setIsSending(false);
  };

  // Format date time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // Get avatar color based on userId
  const getAvatarColor = (userId: string) => {
    const colors = [
      "from-purple-500 to-purple-600",
      "from-green-500 to-emerald-600",
      "from-pink-500 to-rose-600",
      "from-blue-500 to-cyan-600",
      "from-orange-500 to-amber-600",
      "from-violet-500 to-purple-600",
    ];
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + hash;
    }
    return colors[hash % colors.length];
  };

  // Show loading state while checking authentication
  if (status === "loading" || isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <span className="text-sm font-semibold text-blue-400">
              💬 Community Chat
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Chat Room
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Feel free to share your thoughts, suggestions, questions, or
            anything else!
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mt-6"></div>
        </div>

        {/* User Info Bar (if logged in) */}
        {session?.user && (
          <div className="mb-6 bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between animate-slideDown">
            <div className="flex items-center gap-3">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-10 h-10 rounded-full ring-2 ring-blue-500 object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {getInitials(session.user.name || "U")}
                </div>
              )}
              <div>
                <p className="text-white font-semibold">
                  {session.user.name || "Anonymous"}
                </p>
                <p className="text-xs text-slate-400">{session.user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">↗</span>
            </button>
          </div>
        )}

        {/* Chat Container */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
          {/* Messages */}
          <div className="p-6 space-y-6 min-h-[500px] max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-bold text-slate-300 mb-2">
                  No messages yet
                </h3>
                <p className="text-slate-500">
                  Be the first to start the conversation!
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="flex gap-4 animate-fadeIn">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {msg.user_image ? (
                      <img
                        src={msg.user_image}
                        alt={msg.user_name}
                        className="w-10 h-10 rounded-full ring-2 ring-slate-700 object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextElementSibling?.classList.remove(
                            "hidden",
                          );
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(msg.user_id)} flex items-center justify-center text-white font-bold ${msg.user_image ? "hidden" : ""}`}
                    >
                      {getInitials(msg.user_name)}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-semibold text-white">
                        {msg.user_name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {formatDateTime(msg.created_at)}
                      </span>
                    </div>
                    <div className="bg-slate-800 border border-slate-700/50 rounded-lg px-4 py-3 inline-block max-w-full break-words">
                      <p className="text-slate-200">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input Area */}
          {!session ? (
            // Login Required Section
            <div className="border-t border-slate-700 bg-slate-900/50 p-8">
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-slate-400 mb-6">
                  🔒 Please sign in to join the conversation. Don&apos;t worry,
                  your data is safe with us.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleGoogleLogin}
                    className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign in with Google
                  </button>

                  <button
                    onClick={handleGithubLogin}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-slate-700 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Sign in with GitHub
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Message Input Form
            <form
              onSubmit={handleSendMessage}
              className="border-t border-slate-700 bg-slate-900/50 p-4"
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  disabled={isSending}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isSending}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? "..." : "Send"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 hover:border-blue-500/30 transition-all">
            <h3 className="font-bold text-white mb-2">👁️ Public Chat</h3>
            <p className="text-slate-400 text-sm">
              All messages are visible to everyone. Be respectful!
            </p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 hover:border-purple-500/30 transition-all">
            <h3 className="font-bold text-white mb-2">🛡️ Safe & Secure</h3>
            <p className="text-slate-400 text-sm">
              Your data is protected with industry-standard security
            </p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 hover:border-pink-500/30 transition-all">
            <h3 className="font-bold text-white mb-2">💬 Active Community</h3>
            <p className="text-slate-400 text-sm">
              Join discussions and connect with other visitors
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }

        .scrollbar-thumb-slate-700::-webkit-scrollbar-thumb {
          background-color: rgb(51 65 85);
          border-radius: 4px;
        }

        .scrollbar-track-slate-900::-webkit-scrollbar-track {
          background-color: rgb(15 23 42);
        }
      `}</style>
    </section>
  );
}
