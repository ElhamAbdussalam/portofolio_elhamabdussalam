"use client";

import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = [
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
  ];

  useEffect(() => {
    const duration = 2500; // 2.5 seconds
    const steps = 100;
    const interval = duration / steps;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Rotate roles every 600ms
  useEffect(() => {
    const roleTimer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 600);

    return () => clearInterval(roleTimer);
  }, [roles.length]);

  if (!isLoading) return null;

  // Calculate circle progress
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 transition-opacity duration-700 ${
        progress === 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Circular progress */}
        <div className="relative mb-10">
          {/* Outer glow ring - enhanced */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-2xl animate-pulse-glow" />

          {/* SVG Circle */}
          <svg className="transform -rotate-90 w-56 h-56" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="rgba(100, 116, 139, 0.15)"
              strokeWidth="6"
              fill="none"
            />

            {/* Progress circle with gradient */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-200 ease-out filter drop-shadow-lg"
            />

            {/* Gradient definition - enhanced */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content - enhanced */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl font-black bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-number-pulse">
              {progress}
            </div>
          </div>
        </div>

        {/* Brand name - enhanced */}
        <div className="text-center animate-fadeIn">
          {/* Name with gradient */}
          <h1 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            M Elham Abdussalam
          </h1>

          {/* Subtitle - rotating roles */}
          <div className="h-6 overflow-hidden mb-2">
            <p
              key={currentRoleIndex}
              className="text-slate-500 text-sm font-medium tracking-wide animate-role-slide"
            >
              {roles[currentRoleIndex]}
            </p>
          </div>

          {/* Status text with icon - enhanced */}
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm font-medium">
            <span className="animate-bounce">
              {progress < 25 && "🚀"}
              {progress >= 25 && progress < 50 && "📦"}
              {progress >= 50 && progress < 75 && "🎨"}
              {progress >= 75 && progress < 100 && "✨"}
              {progress === 100 && "✅"}
            </span>
            <span>
              {progress < 25 && "Initializing..."}
              {progress >= 25 && progress < 50 && "Loading components..."}
              {progress >= 50 && progress < 75 && "Preparing UI..."}
              {progress >= 75 && progress < 100 && "Almost ready..."}
              {progress === 100 && "Welcome!"}
            </span>
          </div>
        </div>

        {/* Enhanced dot indicators */}
        <div className="flex gap-3 mt-6">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                progress > index * 33
                  ? "w-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
                  : "w-8 bg-slate-700"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
          }
        }

        @keyframes float-slow-2 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-25px) rotate(-5deg) scale(1.1);
          }
        }

        @keyframes float-delayed-2 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-15px) translateX(10px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes number-pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes role-slide {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slow-2 {
          animation: float-slow-2 10s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-float-delayed-2 {
          animation: float-delayed-2 7s ease-in-out infinite;
          animation-delay: 3s;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-number-pulse {
          animation: number-pulse 2s ease-in-out infinite;
        }

        .animate-role-slide {
          animation: role-slide 600ms ease-in-out;
        }
      `}</style>
    </div>
  );
}
