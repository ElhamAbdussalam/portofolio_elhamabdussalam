"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  MessageSquare,
  Send,
  LogOut,
  Lock,
  Sparkles,
  Hash,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type ChatMessage = {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  message: string;
  timestamp: Date;
  provider: string;
};

type MessageRow = {
  id: string;
  user_id: string;
  user_name: string;
  user_image: string | null;
  message: string;
  created_at: string;
  provider: string;
};

const MAX_LENGTH = 500;

const mapRow = (m: MessageRow): ChatMessage => ({
  id: m.id,
  userId: m.user_id,
  userName: m.user_name,
  userImage: m.user_image ?? undefined,
  message: m.message,
  timestamp: new Date(m.created_at),
  provider: m.provider,
});

export default function ChatRoomSection() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const firstScroll = useRef(true);

  // Fetch awal
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("❌ Fetch messages error:", error);
        return;
      }

      if (data) setMessages((data as MessageRow[]).map(mapRow));
    };

    fetchMessages();
  }, []);

  // Realtime (aktif bila Realtime di tabel "messages" dinyalakan di Supabase)
  useEffect(() => {
    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const row = payload.new as MessageRow;
          setMessages((prev) =>
            prev.some((m) => m.id === row.id) ? prev : [...prev, mapRow(row)],
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: firstScroll.current ? "auto" : "smooth",
    });
    if (messages.length > 0) firstScroll.current = false;
  }, [messages.length]);

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: window.location.href });
  };

  const handleGithubLogin = () => {
    signIn("github", { callbackUrl: window.location.href });
  };

  const handleLogout = () => {
    signOut();
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !session?.user) return;

    setIsSending(true);

    const payload = {
      user_id: session.user.email ?? "unknown",
      user_name: session.user.name ?? "Anonymous",
      user_image: session.user.image ?? null,
      message: newMessage.trim(),
      provider: session.user.email?.includes("gmail") ? "google" : "github",
    };

    const { data, error } = await supabase
      .from("messages")
      .insert(payload)
      .select();

    if (error) {
      console.error("❌ Supabase INSERT error:", error);
      setIsSending(false);
      return;
    }

    setMessages((prev) =>
      prev.some((m) => m.id === data[0].id)
        ? prev
        : [
            ...prev,
            {
              id: data[0].id,
              userId: payload.user_id,
              userName: payload.user_name,
              userImage: payload.user_image ?? undefined,
              message: payload.message,
              timestamp: new Date(data[0].created_at),
              provider: payload.provider,
            },
          ],
    );

    setNewMessage("");
    setIsSending(false);
  };

  const formatDateTime = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const formatTime = (date: Date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes(),
    ).padStart(2, "0")}`;

  const dayLabel = (date: Date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getAvatarColor = (userId: string) => {
    const colors = [
      "bg-amber-400/15 text-amber-300 border-amber-400/30",
      "bg-stone-700 text-stone-200 border-stone-600",
      "bg-orange-400/15 text-orange-300 border-orange-400/30",
      "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
      "bg-rose-400/15 text-rose-300 border-rose-400/30",
      "bg-sky-400/15 text-sky-300 border-sky-400/30",
    ];
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + hash;
    }
    return colors[hash % colors.length];
  };

  const isMyMessage = (userId: string) => {
    return session?.user?.email === userId;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty(
      "--px",
      `${(e.clientX / window.innerWidth - 0.5) * 2}`,
    );
    el.style.setProperty(
      "--py",
      `${(e.clientY / window.innerHeight - 0.5) * 2}`,
    );
  };

  const parallax = (depth: number) => ({
    transform: `translate(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px))`,
    transition: "transform 0.4s ease-out",
  });

  if (status === "loading") {
    return (
      <section className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-[3px] border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500 animate-pulse">
            Loading...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-stone-950 text-stone-100 py-10 px-4 md:px-10 relative overflow-hidden"
    >
      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(168,162,158,0.16) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 35%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 35%, black 20%, transparent 100%)",
        }}
      />

      {/* Cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx, 50%) var(--my, 20%), rgba(251,191,36,0.055), transparent 70%)",
        }}
      />

      {/* Pulsing glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-amber-500/[0.06] rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-2/3 -left-24 w-80 h-80 bg-orange-500/[0.05] rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-400/[0.03] rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-20 left-10" style={parallax(18)}>
          <MessageSquare className="w-6 h-6 text-amber-400/30 animate-float" />
        </div>
        <div className="absolute top-[26%] right-12" style={parallax(-26)}>
          <Sparkles className="w-5 h-5 text-stone-400/30 animate-float delay-1000" />
        </div>
        <div className="absolute top-[58%] left-[3%]" style={parallax(30)}>
          <Send className="w-7 h-7 text-amber-300/25 animate-float delay-2000" />
        </div>
        <div className="absolute top-[78%] right-[4%]" style={parallax(-22)}>
          <Hash className="w-6 h-6 text-stone-400/25 animate-float" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInDown">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 mb-3">
            05 &mdash; Chat Room
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-100 mb-4">
            Chat Room
          </h1>
          <div className="w-20 h-[3px] bg-amber-400 mx-auto rounded-full animate-expandWidth"></div>
        </div>

        {/* User Info Bar */}
        {session?.user && (
          <div className="mb-6 bg-stone-900/60 border border-stone-800 rounded-xl p-4 flex items-center justify-between animate-slideDown hover:border-amber-400/40 transition-all duration-300">
            <div className="flex items-center gap-3">
              {session.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-10 h-10 rounded-full ring-2 ring-amber-400/70 ring-offset-2 ring-offset-stone-950 object-cover animate-scaleIn hover:ring-amber-400 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-stone-950 font-bold animate-scaleIn hover:scale-110 transition-transform duration-300">
                  {getInitials(session.user.name || "U")}
                </div>
              )}
              <div className="animate-fadeInLeft">
                <p className="text-stone-100 font-semibold">
                  {session.user.name || "Anonymous"}
                </p>
                <p className="text-xs text-stone-500">{session.user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-stone-700 bg-stone-900 hover:border-amber-400/60 hover:text-amber-400 text-stone-300 rounded-lg font-medium transition-all flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}

        {/* Chat Container */}
        <div className="bg-stone-900/50 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 animate-fadeInUp hover:border-stone-700 transition-all duration-300">
          {/* Channel bar */}
          <div className="flex items-center justify-between border-b border-stone-800 bg-stone-900/80 px-5 py-3">
            <div className="flex items-center gap-2 font-mono text-sm text-stone-300">
              <Hash className="w-4 h-4 text-amber-400" />
              general
            </div>
            <div className="flex items-center gap-4 font-mono text-xs text-stone-500">
              <span className="tabular-nums">
                {messages.length} message{messages.length === 1 ? "" : "s"}
              </span>
              <span className="inline-flex items-center gap-2 text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Live
              </span>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="chat-scroll p-6 space-y-4 min-h-[500px] max-h-[600px] overflow-y-auto"
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20 animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl border border-stone-700 bg-stone-900 flex items-center justify-center mb-4 animate-bounce">
                  <MessageSquare className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-stone-300 mb-2 animate-fadeInDown">
                  No messages yet
                </h3>
                <p className="text-stone-500 animate-fadeInUp">
                  Be the first to start the conversation!
                </p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isMine = isMyMessage(msg.userId);
                const prev = index > 0 ? messages[index - 1] : null;
                const newDay =
                  !prev ||
                  prev.timestamp.toDateString() !==
                    msg.timestamp.toDateString();
                const grouped =
                  !!prev &&
                  !newDay &&
                  prev.userId === msg.userId &&
                  msg.timestamp.getTime() - prev.timestamp.getTime() <
                    5 * 60 * 1000;

                return (
                  <div key={msg.id} className={grouped ? "-mt-2.5" : ""}>
                    {/* Date separator */}
                    {newDay && (
                      <div className="flex items-center gap-3 my-2 mb-5">
                        <span className="h-px flex-1 bg-stone-800" />
                        <span className="font-mono text-[11px] uppercase tracking-wider text-stone-500">
                          {dayLabel(msg.timestamp)}
                        </span>
                        <span className="h-px flex-1 bg-stone-800" />
                      </div>
                    )}

                    <div
                      className={`flex gap-3 animate-messageSlideIn group ${isMine ? "flex-row-reverse" : ""}`}
                      style={{
                        animationDelay: `${Math.min(index, 10) * 0.05}s`,
                      }}
                    >
                      {/* Avatar */}
                      <div className="flex-shrink-0 w-11">
                        {!grouped && (
                          <>
                            {msg.userImage ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={msg.userImage}
                                alt={msg.userName}
                                className="w-11 h-11 rounded-full ring-2 ring-stone-800 object-cover transition-all group-hover:ring-amber-400/70 group-hover:scale-110 duration-300"
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
                              className={`w-11 h-11 rounded-full border ${getAvatarColor(msg.userId)} flex items-center justify-center font-bold transition-all group-hover:scale-110 group-hover:rotate-6 duration-300 ${msg.userImage ? "hidden" : ""}`}
                            >
                              {getInitials(msg.userName)}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Message Content */}
                      <div
                        className={`flex-1 max-w-[75%] ${isMine ? "flex flex-col items-end" : ""}`}
                      >
                        {/* Header */}
                        {!grouped && (
                          <div
                            className={`flex items-center gap-2 mb-1.5 ${isMine ? "flex-row-reverse" : ""}`}
                          >
                            <span className="font-semibold text-stone-100 text-sm animate-fadeIn">
                              {isMine ? "You" : msg.userName}
                            </span>

                            {/* Provider Badge */}
                            <div className="text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 animate-badgeSlideIn hover:scale-110 transition-transform duration-200 bg-stone-800/70 text-stone-300 border border-stone-700">
                              {msg.provider === "google" ? (
                                <svg
                                  className="w-2.5 h-2.5 animate-spin-slow"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                  />
                                  <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-2.5 h-2.5 animate-pulse"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                              <span>
                                {msg.provider === "google"
                                  ? "Google"
                                  : "GitHub"}
                              </span>
                            </div>

                            <span className="font-mono text-[11px] text-stone-600 animate-fadeIn">
                              {formatDateTime(msg.timestamp)}
                            </span>
                          </div>
                        )}

                        {/* Message Bubble */}
                        <div
                          title={formatDateTime(msg.timestamp)}
                          className={`relative px-4 py-3 rounded-2xl transition-all group-hover:shadow-lg group-hover:shadow-black/30 group-hover:-translate-y-0.5 duration-300 ${
                            isMine
                              ? `bg-amber-400 text-stone-950 animate-bubbleSlideLeft ${grouped ? "" : "rounded-tr-sm"}`
                              : `bg-stone-900 border border-stone-800 text-stone-100 animate-bubbleSlideRight ${grouped ? "" : "rounded-tl-sm"}`
                          }`}
                        >
                          <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                            {msg.message}
                          </p>

                          {/* Waktu saat hover (untuk pesan yang dikelompokkan) */}
                          {grouped && (
                            <span
                              className={`absolute top-1/2 -translate-y-1/2 font-mono text-[10px] text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                                isMine ? "right-full mr-3" : "left-full ml-3"
                              }`}
                            >
                              {formatTime(msg.timestamp)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input Area */}
          {!session ? (
            <div className="border-t border-stone-800 bg-stone-900/70 p-6 animate-fadeInUp">
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-stone-400 mb-5 inline-flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  Sign in to join the chat. Fast, secure, and privacy-friendly.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleGoogleLogin}
                    className="px-6 py-3 bg-white hover:bg-stone-100 text-stone-900 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 animate-fadeInLeft cursor-pointer"
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
                    className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl font-bold transition-all border border-stone-700 hover:border-amber-400/50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 animate-fadeInRight cursor-pointer"
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
            <form
              onSubmit={handleSendMessage}
              className="border-t border-stone-800 bg-stone-900/70 p-4 animate-fadeInUp"
            >
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    maxLength={MAX_LENGTH}
                    className="w-full px-4 py-3 pr-16 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400/60 transition-all duration-200"
                    disabled={isSending}
                    autoComplete="off"
                  />
                  {newMessage.length > MAX_LENGTH * 0.8 && (
                    <span
                      className={`absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[11px] tabular-nums ${
                        newMessage.length >= MAX_LENGTH
                          ? "text-rose-400"
                          : "text-stone-500"
                      }`}
                    >
                      {MAX_LENGTH - newMessage.length}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isSending}
                  className="group/send px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-amber-400/20 hover:-translate-y-0.5 active:scale-95 duration-200 inline-flex items-center gap-2 cursor-pointer"
                >
                  {isSending ? (
                    <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Send</span>
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
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

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bubbleSlideLeft {
          from {
            opacity: 0;
            transform: translateX(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes bubbleSlideRight {
          from {
            opacity: 0;
            transform: translateX(-20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes badgeSlideIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 5rem;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.5s ease-out;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.5s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }

        .animate-messageSlideIn {
          animation: messageSlideIn 0.4s ease-out backwards;
        }

        .animate-bubbleSlideLeft {
          animation: bubbleSlideLeft 0.3s ease-out;
        }

        .animate-bubbleSlideRight {
          animation: bubbleSlideRight 0.3s ease-out;
        }

        .animate-badgeSlideIn {
          animation: badgeSlideIn 0.3s ease-out;
        }

        .animate-expandWidth {
          animation: expandWidth 0.6s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }

        .chat-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgb(68 64 60) transparent;
        }

        .chat-scroll::-webkit-scrollbar {
          width: 8px;
        }

        .chat-scroll::-webkit-scrollbar-thumb {
          background-color: rgb(68 64 60);
          border-radius: 4px;
          transition: background-color 0.3s;
        }

        .chat-scroll::-webkit-scrollbar-thumb:hover {
          background-color: rgb(251 191 36 / 0.6);
        }

        .chat-scroll::-webkit-scrollbar-track {
          background-color: transparent;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-spin-slow {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
