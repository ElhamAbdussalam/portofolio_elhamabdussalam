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
import GradientText from "./ui/GradientText";
import ScrambledText from "./ui/ScrambledText";

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
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            <div className="flex items-center justify-center gap-2">
              <span>Hello World!</span>
              <span className="inline-block animate-wave origin-bottom-right">
                👋
              </span>
            </div>
          </h1>
          <h2
            className="
    text-4xl md:text-6xl font-extrabold
    bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-400
    bg-[length:200%_200%]
    bg-clip-text text-transparent
    animate-gradient
    isolation-isolate
    leading-tight
  "
          >
            M Elham Abdussalam
          </h2>

          {/* Subtitle */}
          <p className="text-xl italic md:text-2xl text-gray-600 dark:text-gray-300">
            Full Stack Developer
          </p>
          {/* Description / Scrambled Text */}
          <div className="">
            <ScrambledText
              className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
            >
              Full Stack Developer specializing in scalable and
              performance-driven web applications. Proficient in React, Next.js,
              TypeScript, Node.js, and Laravel, with a strong commitment to
              clean architecture, user-centered design, and continuous
              improvement.
            </ScrambledText>
          </div>

          {/* Location */}
          <div className="flex items-center animate-pulse justify-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin className="w-5 h-5" />
            <span>Kudus, Central Java,Indonesia</span>
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
