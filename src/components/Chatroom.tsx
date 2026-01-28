"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, Loader2, Shield, Eye, Lock } from "lucide-react";
import Image from "next/image";

// Mock user type
interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  provider: "google" | "github";
}

interface Message {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  message: string;
  timestamp: Date;
  provider: "google" | "github";
}

// Mock existing messages for demo
const DEMO_MESSAGES: Message[] = [
  {
    id: "1",
    userId: "user-demo-1",
    userName: "Frenzy Kuzo",
    message: "keren mas",
    timestamp: new Date("2026-01-22T19:18:00"),
    provider: "google",
  },
];

export default function ChatRoomSection() {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>(DEMO_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        id: "user-current",
        name: "M Elham Abdussalam",
        email: "elham@gmail.com",
        image: "/profile.png",
        provider: "google",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleGithubLogin = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        id: "user-current",
        name: "M Elham Abdussalam",
        email: "elham@github.com",
        image: "/profile.png",
        provider: "github",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    setIsSending(true);

    const message: Message = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userImage: user.image,
      message: newMessage.trim(),
      timestamp: new Date(),
      provider: user.provider,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
      setIsSending(false);
    }, 500);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
      .format(date)
      .replace(",", "");
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
    const index = userId
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 py-10 px-10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Chat Room
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mt-6" />
        </div>

        {/* Messages Container */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
          {/* Messages List */}
          <div className="p-6 space-y-6 min-h-[200px] max-h-[300px] overflow-y-auto bg-slate-900/20">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {msg.userImage ? (
                    <Image
                      src={msg.userImage}
                      alt={msg.userName}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full ring-2 ring-slate-700"
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(msg.userId)} flex items-center justify-center text-white font-bold shadow-lg`}
                    >
                      {getInitials(msg.userName)}
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-semibold text-white">
                      {msg.userName}
                    </span>
                    <span className="text-xs text-slate-500">
                      {formatDateTime(msg.timestamp)}
                    </span>
                  </div>
                  <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg px-4 py-3 inline-block max-w-full break-words">
                    <p className="text-slate-200 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {!user ? (
            // Login Required Section
            <div className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm p-4">
              <div className="max-w-2xl mx-auto text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-slate-400" />
                  <p className="text-slate-400">
                    Please sign in to join the conversation. Don&apos;t worry,
                    your data is safe with us.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
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
                        Sign in with google
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleGithubLogin}
                    disabled={isLoading}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 shadow-lg"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
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
                        Sign in with github
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Message Input Form
            <form
              onSubmit={handleSendMessage}
              className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm p-4"
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  disabled={isSending}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isSending}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                >
                  {isSending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span className="hidden sm:inline">Send</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
