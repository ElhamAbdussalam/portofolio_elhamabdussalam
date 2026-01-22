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
import ThemeToggle from "./ThemeToggle";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Award },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/ElhamAbdussalam",
      label: "GitHub",
      external: true,
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/m-elham-abdussalam/",
      label: "LinkedIn",
      external: true,
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/muh.elham_/",
      label: "Instagram",
      external: true,
    },
    {
      icon: Mail,
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=abdussalamelham@gmail.com",
      label: "Email",
      external: true,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:scale-110"
      >
        <div className="relative w-6 h-6">
          <Menu
            className={`absolute w-6 h-6 transition-all duration-300 ${
              isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
            }`}
          />
          <X
            className={`absolute w-6 h-6 transition-all duration-300 ${
              isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-80 z-40 p-6 flex flex-col
        bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
        border-r border-gray-200 dark:border-gray-700 shadow-2xl lg:shadow-none
        transform transition-all duration-500 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Profile Section */}
        <div className="text-center mb-6 animate-fadeIn">
          {/* Avatar */}
          <div className="relative w-32 h-32 mx-auto mb-4 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-sm opacity-60 animate-spin-slow group-hover:opacity-90 transition-opacity" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/profile.png"
                  alt="Avatar"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Status dot */}
            <div className="absolute bottom-1.5 right-1.5 w-4 h-4 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 animate-pulse" />
          </div>

          {/* Name */}
          <h2 className="text-xl font-bold mb-0.5 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Muhammad Elham
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Full Stack Developer
          </p>

          {/* Status + Theme */}
          <div className="flex justify-center items-center gap-3 mb-3">
            <span className="px-3 py-1.5 text-[11px] font-semibold rounded-full text-white bg-gradient-to-r from-green-600 to-emerald-500 shadow-md shadow-green-500/40">
              • Available for Work
            </span>
            <ThemeToggle />
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-3 min-h-[48px]">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <div
                  key={social.label}
                  className="flex flex-col items-center group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <a
                    href={social.href}
                    {...(social.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-6"
                  >
                    <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </a>
                  <span className="mt-1 text-[10px] font-medium text-gray-500 dark:text-gray-400 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                    {social.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-gradient-to-r from-transparent via-gray-300/70 dark:via-gray-600/70 to-transparent" />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-3 px-1">
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
                    className={`relative w-full flex items-center gap-4 px-5 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-[1.01]"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:translate-x-1"
                    }`}
                  >
                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
                    )}

                    <div
                      className={`relative z-10 transition-transform duration-300 ${
                        isActive
                          ? "animate-bounce-slow"
                          : "group-hover:rotate-6"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="relative z-10 flex-1 text-left">
                      {item.label}
                    </span>

                    {isActive && (
                      <span className="relative z-10 w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Divider */}
        <div className="my-5 h-px bg-gradient-to-r from-transparent via-gray-300/70 dark:via-gray-600/70 to-transparent" />

        {/* Footer */}
        <div className="text-center space-y-1 pb-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} M Elham Abdussalam
          </p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500">
            Built with ❤️ using Next.js
          </p>
        </div>
      </aside>
    </>
  );
}
