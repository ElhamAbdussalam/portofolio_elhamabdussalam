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
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

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
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <div className="relative w-6 h-6">
          <Menu
            className={`w-6 h-6 absolute transition-all duration-300 ${isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}
          />
          <X
            className={`w-6 h-6 absolute transition-all duration-300 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`}
          />
        </div>
      </button>

      {/* Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-80 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-2xl lg:shadow-none flex flex-col z-40 transform transition-all duration-500 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Profile Section */}
          <div className="text-center mb-6 animate-fadeIn">
            {/* Avatar */}
            <div className="relative w-32 h-32 mx-auto mb-4 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin-slow opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 animate-pulse-slow">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 transition-all duration-300 group-hover:scale-110">
                  <Image
                    src="/profile.png"
                    alt="Muhammad Elham"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 animate-pulse" />
            </div>

            {/* Name & Title */}
            <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              M Elham Abdussalam
            </h2>
            <p className="text-md text-gray-600 italic dark:text-gray-400 mb-3">
              Full Stack Developer
            </p>

            {/* Status & Theme Toggle */}
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-semibold rounded-full shadow-lg shadow-green-500/40">
                • Available
              </span>
              <ThemeToggle />
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <div
                    key={social.label}
                    className="relative group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-6"
                      title={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-4" />

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <li
                    key={item.id}
                    className="animate-slideIn"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <button
                      onClick={() => {
                        onNavigate(item.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 group relative overflow-hidden ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/40 scale-[1.02]"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:translate-x-1"
                      }`}
                    >
                      {!isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
                      )}
                      <div
                        className={`relative z-10 transition-transform duration-300 ${isActive ? "animate-bounce-slow" : "group-hover:rotate-6"}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="relative z-10 flex-1 text-left">
                        {item.label}
                      </span>
                      {isActive && (
                        <span className="relative z-10 w-2 h-2 bg-white rounded-full animate-pulse" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="text-center pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              © {new Date().getFullYear()} M Elham Abdussalam
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Built with ❤️ using Next.js
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
