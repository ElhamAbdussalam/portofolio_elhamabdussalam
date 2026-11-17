// src/components/Sidebar.tsx
"use client";

import {
  Home,
  User,
  Award,
  FolderGit2,
  Mail,
  Menu,
  X,
  Github,
  Linkedin,
  Instagram,
  Briefcase,
  MessageSquare,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TextType from "./ui/TextType";
import { usePathname, useRouter } from "next/navigation";

// Ubah ke false kalau tidak ingin menampilkan badge status
const SHOW_AVAILABILITY = true;
const AVAILABILITY_LABEL = "Open to work";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const asideRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { id: "home", label: "Home", icon: Home, path: "/home" },
    { id: "about", label: "About", icon: User, path: "/about" },
    {
      id: "experience",
      label: "Experience",
      icon: Briefcase,
      path: "/experience",
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Award,
      path: "/achievements",
    },
    { id: "projects", label: "Projects", icon: FolderGit2, path: "/projects" },
    { id: "chat", label: "Chat Room", icon: MessageSquare, path: "/chat" },
    { id: "contact", label: "Contact", icon: Mail, path: "/contact" },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/ElhamAbdussalam",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/m-elham-abdussalam/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/muh.elham_/",
      label: "Instagram",
    },
    {
      icon: Mail,
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=abdussalamelham@gmail.com",
      label: "Email",
    },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  // Jam live (WIB)
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("id-ID", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  // Shortcut keyboard: tekan 1-7 untuk pindah halaman
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable)
      )
        return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= menuItems.length) {
        router.push(menuItems[n - 1].path);
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // Spotlight yang mengikuti kursor
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = asideRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <>
      <style>{`
        @keyframes sb-shine {
          0%   { transform: translateX(-120%) skewX(-20deg); }
          60%, 100% { transform: translateX(260%) skewX(-20deg); }
        }
        @keyframes sb-rise {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sb-shine { animation: sb-shine 4.5s ease-in-out infinite; }
        .sb-rise  { animation: sb-rise 0.6s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .sb-shine, .sb-rise { animation: none; }
        }
      `}</style>

      {/* Mobile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 shadow-lg hover:border-amber-400/60 active:scale-95 transition-all"
      >
        <div className="relative w-6 h-6">
          <Menu
            className={`absolute w-6 h-6 transition duration-300 ${
              isOpen ? "opacity-0 rotate-90" : "opacity-100"
            }`}
          />
          <X
            className={`absolute w-6 h-6 transition duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 -rotate-90"
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`lg:hidden fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        ref={asideRef}
        onMouseMove={handleMouseMove}
        className={`fixed lg:sticky top-0 left-0 h-screen w-80 z-40 p-8 flex flex-col overflow-hidden
        bg-stone-950 border-r border-stone-800
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 lg:opacity-100 transition-opacity"
          style={{
            background:
              "radial-gradient(260px circle at var(--mx, 50%) var(--my, 20%), rgba(251,191,36,0.07), transparent 70%)",
          }}
        />

        {/* Profile */}
        <div className="relative text-center">
          {/* Avatar */}
          <div className="relative w-36 h-36 mx-auto mb-5 group animate-float">
            {/* Dashed orbit ring */}
            <div className="absolute -inset-2 rounded-full border border-dashed border-amber-400/40 animate-slow-spin group-hover:border-amber-400/80 transition-colors" />

            {/* Photo */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-stone-900 ring-1 ring-stone-700 transition-all duration-500 group-hover:ring-amber-400 group-hover:scale-105 group-hover:rotate-1">
              <Image
                src="/profile.webp"
                alt="Avatar"
                width={144}
                height={144}
                className="w-full h-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-110"
                priority
              />
            </div>

            {/* Status Dot */}
            <span className="absolute bottom-2 right-2 flex w-3.5 h-3.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
              <span className="relative inline-flex w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-stone-950" />
            </span>
          </div>

          <div className="text-xl font-semibold tracking-tight text-stone-100 mb-3">
            <TextType
              text={["M Elham Abdussalam"]}
              typingSpeed={150}
              variableSpeed={0}
              onSentenceComplete={() => {}}
              showCursor
              cursorCharacter="_"
            />
          </div>

          {/* Availability badge */}
          {SHOW_AVAILABILITY && (
            <div className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-stone-800 bg-stone-900/70 px-3 py-1 text-[11px] font-medium text-stone-300 sb-rise">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {AVAILABILITY_LABEL}
              {/* Shine sweep */}
              <span
                aria-hidden
                className="sb-shine pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent"
              />
            </div>
          )}

          <div className="h-px w-10 mx-auto my-5 bg-amber-400/70" />

          {/* Social */}
          <div className="flex justify-center gap-2">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;

              return (
                <div
                  key={social.label}
                  className="relative flex flex-col items-center group animate-slideIn"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center rounded-xl
                      bg-stone-900/60 border border-stone-800 text-stone-400
                      transition-all duration-300 ease-out
                      group-hover:scale-110 group-hover:-rotate-6 group-hover:-translate-y-0.5
                      hover:text-stone-950 hover:bg-amber-400 hover:border-amber-400
                      hover:shadow-lg hover:shadow-amber-400/20"
                  >
                    <Icon className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" />
                  </a>

                  {/* Tooltip */}
                  <span
                    className="pointer-events-none absolute top-full mt-1.5 whitespace-nowrap
                      rounded-md bg-stone-800 px-2 py-0.5 text-[11px] font-medium text-stone-200
                      opacity-0 -translate-y-1 transition-all duration-200
                      group-hover:opacity-100 group-hover:translate-y-0"
                  >
                    {social.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 mt-8 mb-4">
          <ul className="space-y-0.5">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <li
                  key={item.id}
                  className="animate-slideIn"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <button
                    onClick={() => handleNavigate(item.path)}
                    className={`
                      group relative w-full flex items-center gap-4 pl-5 pr-4 h-11 rounded-lg
                      text-sm font-medium cursor-pointer transition-all duration-300 ease-out
                      ${
                        isActive
                          ? "bg-stone-900 text-amber-400"
                          : "text-stone-400 hover:text-stone-100 hover:bg-stone-900/60 hover:translate-x-1"
                      }
                    `}
                  >
                    {/* Left accent bar: tumbuh saat aktif, setengah saat hover */}
                    <span
                      className={`absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-amber-400 origin-center transition-transform duration-300 ${
                        isActive
                          ? "scale-y-100"
                          : "scale-y-0 group-hover:scale-y-50"
                      }`}
                    />

                    <Icon
                      className={`w-[18px] h-[18px] shrink-0 transition-transform duration-300 ${
                        isActive
                          ? "animate-bounce-slow"
                          : "group-hover:rotate-6 group-hover:scale-110"
                      }`}
                    />

                    <span className="flex-1 text-left">{item.label}</span>

                    {/* Active dot / keyboard hint */}
                    {isActive ? (
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60 animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                      </span>
                    ) : (
                      <kbd
                        className="hidden lg:inline-flex h-5 min-w-5 items-center justify-center rounded
                          border border-stone-700 bg-stone-900 px-1 font-mono text-[10px] text-stone-500
                          opacity-0 -translate-x-1 transition-all duration-200
                          group-hover:opacity-100 group-hover:translate-x-0"
                      >
                        {index + 1}
                      </kbd>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="relative space-y-1 text-center">
          <div className="font-mono text-xs tabular-nums text-stone-400 min-h-4">
            {time && (
              <>
                {time} <span className="text-amber-400/80">WIB</span>
              </>
            )}
          </div>
          <div className="text-xs text-stone-600">
            &copy; {new Date().getFullYear()} M Elham Abdussalam
          </div>
        </div>
      </aside>
    </>
  );
}
