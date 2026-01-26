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
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import TextType from "./ui/TextType";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "career", label: "Career", icon: Award },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "contact", label: "Contact", icon: Mail },
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

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
      >
        <div className="relative w-6 h-6">
          <Menu
            className={`absolute w-6 h-6 transition ${
              isOpen ? "opacity-0 rotate-90" : "opacity-100"
            }`}
          />
          <X
            className={`absolute w-6 h-6 transition ${
              isOpen ? "opacity-100" : "opacity-0 -rotate-90"
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`lg:hidden fixed inset-0 bg-black/60 z-40 transition ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-80 z-40 p-6 flex flex-col
        bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
        border-r border-gray-200 dark:border-gray-700
        transform transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
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
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <Image
                  src="/profile.png"
                  alt="Avatar"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
            </div>

            {/* Status Dot */}
            <div
              className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5
    bg-green-500 rounded-full border-2 border-white dark:border-gray-800
    animate-pulse"
            />
          </div>

          {/* <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            M Elham Abdussalam
          </h2> */}
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
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
            bg-gray-200 dark:bg-gray-700
            text-gray-700 dark:text-gray-300
            transition-all duration-300 ease-out
            group-hover:scale-110 group-hover:-rotate-6
            hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600
            hover:text-white
            shadow-sm hover:shadow-lg
          "
                  >
                    <Icon className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" />
                  </a>

                  {/* Label (muncul saat hover) */}
                  <span
                    className="
            mt-1 text-[11px] font-medium
            text-gray-600 dark:text-gray-400
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
        <nav className="flex-1 mt-3">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <li
                  key={item.id}
                  className="animate-slideIn"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      setIsOpen(false);
                    }}
                    className={`
              group relative w-full flex items-center gap-4 px-5 h-12 rounded-xl
              text-sm font-medium transition-all duration-300 ease-out
              ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:translate-x-1"
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
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} M Elham Abdussalam
        </div>
      </aside>
    </>
  );
}
