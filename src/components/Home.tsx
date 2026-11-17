"use client";

import {
  MapPin,
  Sparkles,
  Code2,
  Rocket,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ScrambledText from "./ui/ScrambledText";

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
];

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Laravel",
  "Tailwind CSS",
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--px", `${(x / r.width - 0.5) * 2}`);
    el.style.setProperty("--py", `${(y / r.height - 0.5) * 2}`);
  };

  const reveal = (delay: string) =>
    `transition-all duration-1000 ease-out ${delay} ${
      isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;

  const parallax = (depth: number) => ({
    transform: `translate(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px))`,
    transition: "transform 0.4s ease-out",
  });

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center px-4 pt-10 pb-28 bg-stone-950 relative overflow-hidden"
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
            "radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 100%)",
        }}
      />

      {/* Cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx, 50%) var(--my, 40%), rgba(251,191,36,0.07), transparent 70%)",
        }}
      />

      {/* Soft background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-72 h-72 bg-amber-500/[0.06] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-orange-500/[0.05] rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating Icons (parallax wrapper + float inner) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10" style={parallax(18)}>
          <Code2 className="w-6 h-6 text-amber-400/30 animate-float" />
        </div>
        <div className="absolute top-40 right-20" style={parallax(-26)}>
          <Sparkles className="w-5 h-5 text-stone-400/30 animate-float delay-1000" />
        </div>
        <div className="absolute bottom-40 left-1/4" style={parallax(34)}>
          <Rocket className="w-7 h-7 text-amber-300/25 animate-float delay-2000" />
        </div>
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <div className="text-center space-y-8">
          {/* Eyebrow */}
          <div className={`flex justify-center ${reveal("delay-0")}`}>
            <span className="inline-flex items-center gap-2 rounded-full border border-stone-800 bg-stone-900/60 px-3 py-1 text-xs font-medium text-stone-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Portfolio &mdash; {new Date().getFullYear()}
            </span>
          </div>

          {/* Title */}
          <h1
            className={`text-5xl md:text-7xl font-bold text-stone-100 tracking-tight leading-tight
              transition-[opacity,transform,filter] duration-1000 ease-out delay-100
              ${
                isLoaded
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 -translate-y-10 blur-sm"
              }`}
          >
            <span className="flex items-center justify-center gap-3">
              <span>Hello World!</span>
              <span className="inline-block animate-wave origin-bottom-right text-6xl md:text-7xl">
                👋
              </span>
            </span>
          </h1>

          {/* Name */}
          <h2
            className={`text-5xl md:text-7xl font-extrabold tracking-tight text-stone-100 ${reveal(
              "delay-200",
            )}`}
          >
            M Elham{" "}
            <span className="relative inline-block text-amber-400">
              Abdussalam
              <span
                className={`absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-amber-400/70 transition-transform duration-1000 delay-700 ${
                  isLoaded ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </span>
          </h2>

          {/* Rotating Role */}
          <div className={`h-8 ${reveal("delay-300")}`}>
            <p className="text-xl md:text-2xl font-semibold text-stone-300">
              <span className="inline-flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-400" />
                <span
                  key={currentRole}
                  className="inline-block animate-fadeInSlide text-amber-400"
                >
                  {roles[currentRole]}
                </span>
              </span>
            </p>
          </div>

          {/* Description */}
          <div className={`max-w-3xl mx-auto ${reveal("delay-400")}`}>
            <ScrambledText
              className="text-stone-400 text-base md:text-lg leading-relaxed"
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
            >
              Crafting{" "}
              <span className="text-amber-400 font-semibold">scalable</span> and{" "}
              <span className="text-amber-400 font-semibold">
                performance-driven
              </span>{" "}
              web applications 🚀 that solve real-world problems and deliver
              meaningful user experiences. Experienced in{" "}
              <span className="text-stone-100 font-medium">React,</span>{" "}
              <span className="text-stone-100 font-medium">Next.js,</span>{" "}
              <span className="text-stone-100 font-medium">TypeScript,</span>{" "}
              <span className="text-stone-100 font-medium">Node.js,</span> and{" "}
              <span className="text-stone-100 font-medium">Laravel,</span> with
              a strong focus on clean architecture, user-centered design, and
              continuous improvement ✨.
            </ScrambledText>
          </div>

          {/* CTA */}
          <div
            className={`flex flex-wrap items-center justify-center gap-3 ${reveal(
              "delay-500",
            )}`}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-stone-950 transition-all duration-300 hover:bg-amber-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/20 active:translate-y-0"
            >
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-lg border border-stone-700 bg-stone-900/60 px-5 py-2.5 text-sm font-semibold text-stone-200 transition-all duration-300 hover:border-amber-400/60 hover:text-amber-400 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get in touch
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Location */}
          <div
            className={`flex items-center justify-center gap-3 ${reveal(
              "delay-700",
            )}`}
          >
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900/60 backdrop-blur-sm border border-stone-800 transition-all hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-400/5">
              <MapPin className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-sm font-medium text-stone-300">
                Kudus, Central Java, Indonesia
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tech stack marquee */}
      <div
        aria-hidden
        className={`absolute bottom-6 inset-x-0 overflow-hidden transition-opacity duration-1000 delay-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="marquee flex w-max gap-10">
          {[...stack, ...stack, ...stack, ...stack].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.2em] text-stone-600"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-amber-400/50" />
            </span>
          ))}
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

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fadeInSlide {
          animation: fadeInSlide 0.5s ease-out forwards;
        }

        .marquee {
          animation: marquee 40s linear infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-wave,
          .animate-float,
          .marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
