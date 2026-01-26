"use client";

import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import ScrambledText from "./ui/ScrambledText";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center space-y-6">
          {/* Main Title */}
          <h1
            className={`text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight
              transition-[opacity,transform,filter] duration-1000 ease-out
              ${
                isLoaded
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 -translate-y-10 blur-sm"
              }`}
          >
            <div className="flex items-center justify-center">
              <span>Hello World!</span>
              <span className="inline-block animate-wave origin-bottom-right">
                👋
              </span>
            </div>
          </h1>

          {/* Name with Gradient */}
          <h2
            className={`
              text-4xl md:text-6xl font-extrabold
              bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-400
              bg-[length:200%_200%]
              bg-clip-text text-transparent
              animate-gradient
              leading-tight
              transition-[opacity,transform,filter] duration-1000 delay-200
              ${
                isLoaded
                  ? "opacity-100 translate-y-0 scale-100 blur-0"
                  : "opacity-0 translate-y-10 scale-95 blur-sm"
              }
            `}
          >
            M Elham Abdussalam
          </h2>

          {/* Subtitle */}
          <p
            className={`text-xl italic md:text-2xl text-gray-600 dark:text-gray-300
              transition-[opacity,transform,filter] duration-1000 delay-300
              ${
                isLoaded
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 translate-y-6 blur-sm"
              }`}
          >
            Software Engineer ● Full Stack Developer
          </p>

          {/* Description */}
          <ScrambledText
            className="scrambled-text-demo"
            radius={100}
            duration={1.2}
            speed={0.5}
            scrambleChars=".:"
          >
            <span className="italic font-bold text-blue-500">
              Software Engineer | Full Stack Developer
            </span>{" "}
            specializing in scalable and performance-driven web applications.
            Experienced in React, Next.js, TypeScript, Node.js, and Laravel,
            with a strong focus on clean architecture, user-centered design, and
            continuous improvement.
          </ScrambledText>

          {/* Location */}
          <div
            className={`flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400
              transition-[opacity,transform,filter] duration-1000 delay-700
              ${
                isLoaded
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 translate-y-6 blur-sm"
              }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="font-semibold">
              Kudus, Central Java, Indonesia
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
