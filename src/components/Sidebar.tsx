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
import { useState } from "react";
import Image from "next/image";
import TextType from "./ui/TextType";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-slate-800 border border-slate-700 shadow-lg hover:border-blue-500/50 transition-all"
      >
        <div className="relative w-6 h-6">
          <Menu
            className={`absolute w-6 h-6 text-white transition ${
              isOpen ? "opacity-0 rotate-90" : "opacity-100"
            }`}
          />
          <X
            className={`absolute w-6 h-6 text-white transition ${
              isOpen ? "opacity-100" : "opacity-0 -rotate-90"
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-80 z-40 p-6 flex flex-col
        bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
        border-r border-slate-700/50
        transform transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        shadow-2xl lg:shadow-none`}
      >
        {/* Profile */}
        <div className="text-center">
          {/* Avatar */}
          <div className="relative w-36 h-36 mx-auto mb-4 group animate-float">
            {/* Glow Ring */}
            <div
              className="absolute inset-0 rounded-full
    bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
    blur-md opacity-60 animate-slow-spin group-hover:opacity-90 transition"
            />

            {/* Avatar Wrapper */}
            <div
              className="relative w-full h-full rounded-full p-[6px]
    bg-gradient-to-br from-blue-500 to-purple-600
    transition-transform duration-500
    group-hover:scale-105 group-hover:rotate-1"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 ring-2 ring-slate-900">
                <Image
                  src="/profile.webp"
                  alt="Avatar"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  priority
                />
              </div>
            </div>

            {/* Status Dot */}
            <div
              className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5
    bg-emerald-500 rounded-full border-2 border-slate-900
    animate-pulse"
            />
          </div>

          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            <TextType
              text={["M Elham Abdussalam"]}
              typingSpeed={150}
              variableSpeed={0}
              onSentenceComplete={() => {}}
              showCursor
              cursorCharacter="_"
            />
          </div>

          {/* Social */}
          <div className="flex justify-center gap-2">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;

              return (
                <div
                  key={social.label}
                  className="relative flex flex-col items-center group"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Icon Button */}
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
            w-10 h-10 flex items-center justify-center rounded-xl
            bg-slate-800/50 border border-slate-700/50
            text-slate-400
            transition-all duration-300 ease-out
            group-hover:scale-110 group-hover:-rotate-6
            hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600
            hover:text-white hover:border-transparent
            shadow-sm hover:shadow-lg hover:shadow-blue-500/20
          "
                  >
                    <Icon className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" />
                  </a>

                  {/* Label (muncul saat hover) */}
                  <span
                    className="
            mt-1 text-[11px] font-medium
            text-slate-500
            opacity-0 translate-y-1
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-200
            pointer-events-none
          "
                  >
                    {social.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-3 mb-3 ">
          <ul className="space-y-1">
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
                    onClick={() => {
                      handleNavigate(item.path);
                    }}
                    className={`
              group relative w-full flex items-center gap-4 px-5 h-12 rounded-xl
              text-sm font-medium transition-all duration-300 ease-out cursor-pointer
              ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
                  : "text-slate-300 hover:bg-slate-800/50 hover:translate-x-1"
              }
            `}
                  >
                    {/* Hover background layer */}
                    {!isActive && (
                      <span
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0
                group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10
                transition-all duration-300"
                      />
                    )}

                    {/* Icon */}
                    <Icon
                      className={`
                relative z-10 w-5 h-5 shrink-0 transition-transform duration-300
                ${isActive ? "animate-bounce-slow" : "group-hover:rotate-6"}
              `}
                    />

                    {/* Label */}
                    <span className="relative z-10 flex-1 text-left">
                      {item.label}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <span className="relative z-10 w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} M Elham Abdussalam
        </div>
      </aside>
    </>
  );
}
