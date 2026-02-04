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
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse animate-drift" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000 animate-drift-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000 animate-spin-slow" />

        {/* Additional animated orbs */}
        <div className="absolute top-10 right-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl animate-bounce-slow" />
        <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Code2 className="absolute top-20 left-10 w-6 h-6 text-blue-400/20 animate-float animate-rotate-slow" />
        <Sparkles className="absolute top-40 right-20 w-5 h-5 text-purple-400/20 animate-float delay-1000 animate-twinkle" />
        <Rocket className="absolute bottom-32 left-1/4 w-7 h-7 text-pink-400/20 animate-float delay-2000 animate-tilt" />

        {/* Additional floating icons */}
        <Code2 className="absolute bottom-40 right-1/3 w-5 h-5 text-cyan-400/20 animate-float animate-pulse-slow" />
        <Sparkles className="absolute top-1/3 left-1/3 w-4 h-4 text-pink-400/20 animate-float delay-500 animate-twinkle" />
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
              <span className="animate-text-shimmer">Hello World!</span>
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
              hover:scale-105 hover:animate-glow
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
                <Code2 className="w-5 h-5 text-blue-400 animate-pulse-glow" />
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
              <span className="text-blue-400 font-semibold animate-highlight">
                scalable
              </span>{" "}
              and{" "}
              <span className="text-purple-400 font-semibold animate-highlight delay-200">
                performance-driven
              </span>{" "}
              web applications{" "}
              <span className="text-pink-400 inline-block animate-bounce-subtle">
                🚀
              </span>{" "}
              that solve real-world problems and deliver meaningful user
              experiences. Experienced in{" "}
              <span className="text-blue-400 font-medium hover:animate-wiggle">
                React,
              </span>{" "}
              <span className="text-purple-400 font-medium hover:animate-wiggle">
                Next.js,
              </span>{" "}
              <span className="text-pink-400 font-medium hover:animate-wiggle">
                TypeScript,
              </span>{" "}
              <span className="text-blue-400 font-medium hover:animate-wiggle">
                Node.js,
              </span>{" "}
              and{" "}
              <span className="text-purple-400 font-medium hover:animate-wiggle">
                Laravel,
              </span>{" "}
              with a strong focus on clean architecture, user-centered design,
              and continuous improvement
              <span className="text-pink-400 inline-block animate-twinkle">
                ✨
              </span>
              .
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
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105 animate-fade-in-up">
              <MapPin className="w-4 h-4 text-blue-400 animate-pulse animate-pin-bounce" />
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

        @keyframes drift {
          0%,
          100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(20px, -20px);
          }
          50% {
            transform: translate(40px, 10px);
          }
          75% {
            transform: translate(10px, 30px);
          }
        }

        @keyframes drift-reverse {
          0%,
          100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(-30px, 20px);
          }
          50% {
            transform: translate(-50px, -10px);
          }
          75% {
            transform: translate(-20px, -30px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes tilt {
          0%,
          100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        @keyframes text-shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes glow {
          0%,
          100% {
            filter: drop-shadow(0 0 5px rgba(147, 197, 253, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(147, 197, 253, 0.8));
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 1;
            filter: drop-shadow(0 0 2px currentColor);
          }
          50% {
            opacity: 0.6;
            filter: drop-shadow(0 0 8px currentColor);
          }
        }

        @keyframes highlight {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
            text-shadow: 0 0 10px currentColor;
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(3deg);
          }
          75% {
            transform: rotate(-3deg);
          }
        }

        @keyframes pin-bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
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

        .animate-drift {
          animation: drift 20s ease-in-out infinite;
        }

        .animate-drift-reverse {
          animation: drift-reverse 25s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 8s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-tilt {
          animation: tilt 3s ease-in-out infinite;
        }

        .animate-text-shimmer {
          background: linear-gradient(90deg, #fff 0%, #93c5fd 50%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          animation: text-shimmer 3s linear infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-highlight {
          animation: highlight 3s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }

        .animate-pin-bounce {
          animation: pin-bounce 2s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-500 {
          animation-delay: 0.5s;
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
