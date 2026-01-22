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
    <section className="min-h-screen flex items-center justify-center px-4 m-20">
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
            <GradientText
              colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
              animationSpeed={8}
              showBorder={false}
              className="font-bold"
            >
              M Elham Abdussalam
            </GradientText>
          </h1>

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
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin className="w-5 h-5 text-red-500 animate-bounce" />
            <span>Kudus, Central Java,Indonesia</span>
          </div>

          {/* Tech Stack Section */}
          <div
            className={`mt-16 transform transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-8 flex items-center justify-center gap-2">
              <Layers className="w-6 h-6 text-blue-500" />
              Tech Stack
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
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
                      transitionDelay: `${300 + index * 50}ms`,
                    }}
                  >
                    <div className="relative p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>

                      <div className="relative flex flex-col items-center gap-2">
                        <Icon
                          className={`w-8 h-8 ${skill.color} transition-all duration-300 group-hover:rotate-12`}
                          strokeWidth={1.5}
                        />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
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
