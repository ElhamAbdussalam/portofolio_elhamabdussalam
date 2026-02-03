"use client";

import { useState, useEffect, useRef } from "react";

// Simple types
type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  provider: "google" | "github";
};

type ChatMessage = {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  message: string;
  timestamp: Date;
  provider: "google" | "github";
};

// Demo messages
const demoMessages: ChatMessage[] = [
  {
    id: "1",
    userId: "user-1",
    userName: "Frenzy Kuzo",
    message: "Keren banget, tampilannya rapi dan modern 🔥",
    timestamp: new Date("2026-01-22T19:18:00"),
    provider: "google",
  },
  {
    id: "2",
    userId: "user-2",
    userName: "VIP M",
    message: "Halo! Project ini menarik banget 👋",
    timestamp: new Date("2026-01-26T23:39:00"),
    provider: "github",
  },
  {
    id: "3",
    userId: "user-3",
    userName: "Anonymous User",
    message:
      "Bagian resume di homepage terlihat menarik. Mungkin bisa diperjelas lagi agar lebih mudah dipahami.",
    timestamp: new Date("2026-01-27T01:10:00"),
    provider: "google",
  },
  {
    id: "4",
    userId: "user-4",
    userName: "User Marquardt",
    message:
      "Keren banget! Project-nya terlihat aktif dikembangkan dan terawat dengan baik.",
    timestamp: new Date("2026-01-27T05:51:00"),
    provider: "github",
  },
];

export default function ChatRoomSection() {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(demoMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        id: "current-user",
        name: "M Elham Abdussalam",
        email: "elham@gmail.com",
        provider: "google",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleGithubLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        id: "current-user",
        name: "M Elham Abdussalam",
        email: "elham@github.com",
        provider: "github",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    setIsSending(true);

    const msg: ChatMessage = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userImage: user.image,
      message: newMessage.trim(),
      timestamp: new Date(),
      provider: user.provider,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, msg]);
      setNewMessage("");
      setIsSending(false);
    }, 500);
  };

  const formatDateTime = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

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

        {/* Chat Container */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
          {/* Messages */}
          <div className="p-6 space-y-6 min-h-[500px] max-h-[600px] overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {msg.userImage ? (
                    <img
                      src={msg.userImage}
                      alt={msg.userName}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(msg.userId)} flex items-center justify-center text-white font-bold`}
                    >
                      {getInitials(msg.userName)}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-semibold text-white">
                      {msg.userName}
                    </span>
                    <span className="text-xs text-slate-500">
                      {formatDateTime(msg.timestamp)}
                    </span>
                  </div>
                  <div className="bg-slate-800 border border-slate-700/50 rounded-lg px-4 py-3 inline-block max-w-full">
                    <p className="text-slate-200">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input */}
          {!user ? (
            <div className="border-t border-slate-700 bg-slate-900/50 p-8">
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-slate-400 mb-6">
                  🔒 Please sign in to join the conversation. Don&apos;t worry,
                  your data is safe with us.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-bold transition-all disabled:opacity-50"
                  >
                    {isLoading ? "Loading..." : "🔵 Sign in with Google"}
                  </button>

                  <button
                    onClick={handleGithubLogin}
                    disabled={isLoading}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-slate-700 disabled:opacity-50"
                  >
                    {isLoading ? "Loading..." : "⚫ Sign in with GitHub"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
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
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSending}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isSending}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-bold transition-all disabled:opacity-50"
                >
                  {isSending ? "..." : "Send"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
            <h3 className="font-bold text-white mb-2">👁️ Public Chat</h3>
            <p className="text-slate-400 text-sm">
              All messages are visible to everyone. Be respectful!
            </p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
            <h3 className="font-bold text-white mb-2">🛡️ Safe & Secure</h3>
            <p className="text-slate-400 text-sm">
              Your data is protected with industry-standard security
            </p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
            <h3 className="font-bold text-white mb-2">💬 Active Community</h3>
            <p className="text-slate-400 text-sm">
              Join discussions and connect with other visitors
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
