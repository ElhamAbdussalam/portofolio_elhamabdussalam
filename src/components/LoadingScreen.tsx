"use client";

import { useState, useEffect } from "react";

export default function LoadingScreenAdvanced() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  if (!isLoading) return null;

  // Calculate circle progress
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-opacity duration-700 ${
        progress === 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Circular progress */}
        <div className="relative mb-8">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl animate-pulse" />

          {/* SVG Circle */}
          <svg className="transform -rotate-90 w-48 h-48" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="rgba(100, 116, 139, 0.2)"
              strokeWidth="8"
              fill="none"
            />

            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-200 ease-out"
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {progress}
            </div>
            <div className="text-sm text-slate-400 mt-1">%</div>
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            M Elham Abdussalam
          </h1>
          <p className="text-slate-400 text-sm">
            {progress < 25 && "🚀 Initializing..."}
            {progress >= 25 && progress < 50 && "📦 Loading components..."}
            {progress >= 50 && progress < 75 && "🎨 Preparing UI..."}
            {progress >= 75 && progress < 100 && "✨ Almost ready..."}
            {progress === 100 && "✅ Welcome!"}
          </p>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 mt-8">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                progress > index * 33
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-125"
                  : "bg-slate-700"
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
      `}</style>
    </div>
  );
}
