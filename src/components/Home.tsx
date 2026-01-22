// src/components/Home.tsx
"use client";

import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  Instagram,
  Code2,
  Boxes,
  FileCode,
  Server,
  Terminal,
  Layout,
  Database,
  Package,
  GitBranch,
  Layers,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = [
    { icon: Code2, name: "React", color: "text-blue-400" },
    { icon: Boxes, name: "Next.js", color: "text-gray-900 dark:text-white" },
    { icon: FileCode, name: "TypeScript", color: "text-blue-600" },
    { icon: Server, name: "Node.js", color: "text-green-600" },
    { icon: Terminal, name: "Laravel", color: "text-red-500" },
    { icon: Layout, name: "Tailwind", color: "text-cyan-500" },
    { icon: Database, name: "MongoDB", color: "text-green-500" },
    { icon: Database, name: "PostgreSQL", color: "text-blue-700" },
    { icon: Package, name: "Docker", color: "text-blue-500" },
    { icon: GitBranch, name: "Git", color: "text-orange-600" },
  ];
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center space-y-6">
          {/* Greeting */}
          <div className="inline-block">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
              👋 Welcome to my portfolio
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              M Elham Abdussalam
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            Full Stack Developer
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Full Stack Developer specializing in scalable and performance-driven
            web applications. Proficient in React, Next.js, TypeScript, Node.js,
            and Laravel, with a strong commitment to clean architecture,
            user-centered design, and continuous improvement.
          </p>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin className="w-5 h-5 text-red-500 animate-bounce" />
            <span>Kudus, Central Java,Indonesia</span>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6 flex items-center justify-center gap-2">
              <Layers className="w-5 h-5" />
              Tech Stack
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 max-w-3xl mx-auto">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className={`group relative transform transition-all duration-500 hover:scale-110 hover:-translate-y-2 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{
                      transitionDelay: `${600 + index * 50}ms`,
                    }}
                  >
                    <div className="relative p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>

                      <div className="relative flex flex-col items-center gap-2">
                        <Icon
                          className={`w-8 h-8 ${skill.color} transition-all duration-300 group-hover:rotate-12 group-hover:scale-110`}
                          strokeWidth={1.5}
                        />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=abdussalamelham@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <Mail className="w-5 h-5 mr-2" />
              Get in Touch
            </a>

            <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300">
              <Download className="w-5 h-5 inline mr-2" />
              Download CV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
