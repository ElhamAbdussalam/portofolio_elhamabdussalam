"use client";

import { useState, useEffect } from "react";
import { Rocket, Package, Palette, Sparkles, Check } from "lucide-react";

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
];

const TICKS = 60;

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Progress 0 -> 100 (2.5s)
  useEffect(() => {
    const duration = 2500;
    const steps = 100;
    const interval = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= 100) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Exit sequence: curtain terbuka setelah selesai
  useEffect(() => {
    if (progress < 100) return;
    const t1 = setTimeout(() => setIsExiting(true), 1100);
    const t2 = setTimeout(() => setIsLoading(false), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [progress]);

  // Rotate roles
  useEffect(() => {
    const roleTimer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 600);
    return () => clearInterval(roleTimer);
  }, []);

  if (!isLoading) return null;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const litTicks = Math.round((progress / 100) * TICKS);

  // Efek "mau meledak": bergetar makin kencang mulai 70%, meledak di 100%
  const burst = progress >= 100;
  const charge = Math.max(0, Math.min(1, (progress - 70) / 30));

  const PARTICLE_COUNT = 28;
  const particles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
    const rand = (n: number) => {
      const x = Math.sin((i + 1) * n) * 43758.5453;
      return x - Math.floor(x);
    };
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + rand(12.9898) * 0.3;
    const dist = 110 + rand(78.233) * 110;
    return {
      dx: `${Math.cos(angle) * dist}px`,
      dy: `${Math.sin(angle) * dist}px`,
      size: 3 + Math.round(rand(39.346) * 4),
      dur: `${0.7 + rand(11.135) * 0.6}s`,
    };
  });

  const stage =
    progress < 25
      ? { Icon: Rocket, text: "Initializing..." }
      : progress < 50
        ? { Icon: Package, text: "Loading components..." }
        : progress < 75
          ? { Icon: Palette, text: "Preparing UI..." }
          : progress < 100
            ? { Icon: Sparkles, text: "Almost ready..." }
            : { Icon: Check, text: "Welcome!" };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isExiting ? "pointer-events-none" : ""
      }`}
    >
      {/* Curtain panels */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-stone-950 border-b border-stone-800/60 transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting ? "-translate-y-full" : "translate-y-0"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-stone-950 border-t border-stone-800/60 transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Content layer */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Dot grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(rgba(168,162,158,0.18) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 60% 55% at 50% 50%, black 25%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 55% at 50% 50%, black 25%, transparent 100%)",
          }}
        />

        {/* Soft glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-amber-500/[0.06] rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-orange-500/[0.05] rounded-full blur-3xl animate-float-delayed" />
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center px-4">
          {/* Circular progress */}
          <div
            className={`relative mb-10 ${
              charge > 0 && !burst ? "animate-shake" : ""
            }`}
            style={
              {
                "--shake": `${(charge * 3).toFixed(2)}px`,
              } as React.CSSProperties
            }
          >
            <div className="absolute inset-4 rounded-full bg-amber-400/10 blur-2xl animate-pulse-glow" />
            {/* Glow yang makin panas saat mendekati 100% */}
            <div
              className="absolute inset-0 rounded-full bg-amber-300/30 blur-3xl transition-opacity duration-200"
              style={{ opacity: burst ? 0 : charge }}
            />

            <div className={burst ? "animate-ring-burst" : ""}>
              <svg
                className="transform -rotate-90 w-60 h-60"
                viewBox="0 0 160 160"
              >
                {/* Tick marks */}
                {Array.from({ length: TICKS }).map((_, i) => {
                  const angle = (i / TICKS) * Math.PI * 2;
                  const x1 = 80 + Math.cos(angle) * 75;
                  const y1 = 80 + Math.sin(angle) * 75;
                  const x2 = 80 + Math.cos(angle) * (i % 5 === 0 ? 79 : 77.5);
                  const y2 = 80 + Math.sin(angle) * (i % 5 === 0 ? 79 : 77.5);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      className="transition-colors duration-200"
                      stroke={
                        i < litTicks
                          ? "rgba(251,191,36,0.9)"
                          : "rgba(120,113,108,0.35)"
                      }
                    />
                  );
                })}

                {/* Track */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="rgba(120, 113, 108, 0.2)"
                  strokeWidth="3"
                  fill="none"
                />

                {/* Progress */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#fbbf24"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-200 ease-out"
                />
              </svg>
            </div>

            {/* Ledakan */}
            {burst && (
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div
                  className="absolute -inset-10 rounded-full animate-flash"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(253,230,138,0.9) 0%, rgba(251,191,36,0.35) 35%, transparent 70%)",
                  }}
                />
                <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-shockwave" />
                <div
                  className="absolute inset-0 rounded-full border border-stone-200/60 animate-shockwave"
                  style={{ animationDelay: "120ms" }}
                />
                {particles.map((p, i) => (
                  <span
                    key={i}
                    className="absolute left-1/2 top-1/2 rounded-full bg-amber-400 animate-particle"
                    style={
                      {
                        width: p.size,
                        height: p.size,
                        "--dx": p.dx,
                        "--dy": p.dy,
                        "--dur": p.dur,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            )}

            {/* Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                className={`flex items-start font-mono tabular-nums text-stone-100 ${
                  burst ? "animate-number-pop" : "animate-number-pulse"
                }`}
              >
                <span className="text-6xl font-bold leading-none">
                  {progress}
                </span>
                <span className="mt-1 ml-0.5 text-lg text-amber-400">%</span>
              </div>
            </div>
          </div>

          {/* Brand */}
          <div className="text-center animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 leading-tight text-stone-100">
              M Elham <span className="text-amber-400">Abdussalam</span>
            </h1>

            <div className="h-6 overflow-hidden mb-3">
              <p
                key={currentRoleIndex}
                className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500 animate-role-slide"
              >
                {roles[currentRoleIndex]}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-stone-400 text-sm font-medium">
              <stage.Icon className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>{stage.text}</span>
            </div>
          </div>

          {/* Segment indicators */}
          <div className="flex gap-3 mt-6">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-500 ${
                  progress > index * 33
                    ? "w-12 bg-amber-400"
                    : "w-8 bg-stone-800"
                }`}
              />
            ))}
          </div>
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

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }

        @keyframes number-pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
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

        @keyframes shake {
          0%,
          100% {
            transform: translate(0, 0);
          }
          20% {
            transform: translate(calc(var(--shake) * -1), var(--shake));
          }
          40% {
            transform: translate(var(--shake), calc(var(--shake) * -1));
          }
          60% {
            transform: translate(
              calc(var(--shake) * -1),
              calc(var(--shake) * -0.5)
            );
          }
          80% {
            transform: translate(var(--shake), var(--shake));
          }
        }

        @keyframes ring-burst {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          20% {
            transform: scale(0.93);
            opacity: 1;
          }
          100% {
            transform: scale(1.7);
            opacity: 0;
          }
        }

        @keyframes shockwave {
          0% {
            transform: scale(0.5);
            opacity: 0.9;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }

        @keyframes flash {
          0% {
            opacity: 0;
            transform: scale(0.4);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(1.8);
          }
        }

        @keyframes particle {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--dx), var(--dy))
              scale(0.2);
            opacity: 0;
          }
        }

        @keyframes number-pop {
          0% {
            transform: scale(1);
          }
          30% {
            transform: scale(1.35);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-shake {
          animation: shake 0.12s linear infinite;
        }

        .animate-ring-burst {
          animation: ring-burst 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }

        .animate-shockwave {
          animation: shockwave 0.9s ease-out both;
        }

        .animate-flash {
          animation: flash 0.7s ease-out both;
        }

        .animate-particle {
          animation: particle var(--dur) cubic-bezier(0.1, 0.7, 0.3, 1) both;
        }

        .animate-number-pop {
          animation: number-pop 0.5s ease-out both;
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

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-number-pulse {
          animation: number-pulse 2s ease-in-out infinite;
        }

        .animate-role-slide {
          animation: role-slide 600ms ease-in-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-float-delayed,
          .animate-pulse-glow,
          .animate-shake,
          .animate-number-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
