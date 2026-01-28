"use client";

import { MapPin, Sparkles, Code2, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import ScrambledText from "./ui/ScrambledText";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);

  const roles = [
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Code2 className="absolute top-20 left-10 w-6 h-6 text-blue-400/20 animate-float" />
        <Sparkles className="absolute top-40 right-20 w-5 h-5 text-purple-400/20 animate-float delay-1000" />
        <Rocket className="absolute bottom-32 left-1/4 w-7 h-7 text-pink-400/20 animate-float delay-2000" />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <div className="text-center space-y-8">
          {/* Main Title with Wave */}
          <h1
            className={`text-5xl md:text-7xl font-bold text-white leading-tight mt-10
              transition-[opacity,transform,filter] duration-1000 ease-out delay-100
              ${
                isLoaded
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 -translate-y-10 blur-sm"
              }`}
          >
            <div className="flex items-center justify-center gap-3">
              <span>Hello World!</span>
              <span className="inline-block animate-wave origin-bottom-right text-6xl md:text-7xl">
                👋
              </span>
            </div>
          </h1>

          {/* Name with Gradient */}
          <h2
            className={`text-5xl md:text-7xl font-extrabold
              bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
              bg-[length:200%_200%]
              bg-clip-text text-transparent animate-gradient
              transition-all duration-1000 delay-200
              ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
          >
            M Elham Abdussalam
          </h2>

          {/* Rotating Role */}
          <div
            className={`h-8 transition-all duration-1000 delay-300
              ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
          >
            <p className="text-xl md:text-2xl font-semibold text-slate-300">
              <span className="inline-flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                <span
                  key={currentRole}
                  className="inline-block animate-fadeInSlide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                >
                  {roles[currentRole]}
                </span>
              </span>
            </p>
          </div>

          {/* Description with Scrambled Text */}
          <div
            className={`max-w-3xl mx-auto transition-all duration-1000 delay-400
              ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
          >
            <ScrambledText
              className="text-slate-300 text-base md:text-lg leading-relaxed"
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
            >
              Crafting{" "}
              <span className="text-blue-400 font-semibold">scalable</span> and{" "}
              <span className="text-purple-400 font-semibold">
                performance-driven
              </span>{" "}
              web applications <span className="text-pink-400">🚀</span> that
              solve real-world problems and deliver meaningful user experiences.
              Experienced in{" "}
              <span className="text-blue-400 font-medium">React,</span>{" "}
              <span className="text-purple-400 font-medium">Next.js,</span>{" "}
              <span className="text-pink-400 font-medium">TypeScript,</span>{" "}
              <span className="text-blue-400 font-medium">Node.js,</span> and{" "}
              <span className="text-purple-400 font-medium">Laravel,</span> with
              a strong focus on clean architecture, user-centered design, and
              continuous improvement<span className="text-pink-400">✨</span>.
            </ScrambledText>
          </div>

          {/* Location */}
          <div
            className={`flex items-center justify-center gap-3
              transition-all duration-1000 delay-700
              ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
          >
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/10">
              <MapPin className="w-4 h-4 text-blue-400 animate-pulse" />
              <span className="text-sm font-medium text-slate-300">
                Kudus, Central Java, Indonesia
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(20deg);
          }
          75% {
            transform: rotate(-10deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-gradient {
          animation: gradient 8s ease infinite;
        }

        .animate-fadeInSlide {
          animation: fadeInSlide 0.5s ease-out forwards;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
