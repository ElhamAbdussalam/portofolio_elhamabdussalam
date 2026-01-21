// src/components/Home.tsx
"use client";

import { Github, Linkedin, Mail, MapPin, Download } from "lucide-react";

export default function Home() {
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
              Muhammad Elham
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            Full Stack Developer
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Passionate about building exceptional digital experiences. I
            specialize in creating scalable web applications using modern
            technologies like React, Next.js, TypeScript, and Node.js.
          </p>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin className="w-5 h-5" />
            <span>Indonesia</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
              <Mail className="w-5 h-5 inline mr-2" />
              Get in Touch
            </button>
            <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300">
              <Download className="w-5 h-5 inline mr-2" />
              Download CV
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 pt-8">
            <a
              href="#"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Animated Scroll Indicator */}
          <div className="pt-12 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
