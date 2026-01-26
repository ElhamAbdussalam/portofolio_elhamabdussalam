"use client";

import { Mail, MapPin, Download } from "lucide-react";
import { useEffect, useState } from "react";

// ScrambledText component placeholder
interface ScrambledTextProps {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
}

function ScrambledText({
  children,
  className,
  radius,
  duration,
  speed,
  scrambleChars,
}: ScrambledTextProps) {
  return <p className={className}>{children}</p>;
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center space-y-6">
          {/* Main Title */}
          <h1
            className={`text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
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
              isolation-isolate
              leading-tight
              transition-all duration-1000 delay-200
              ${
                isLoaded
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-10 scale-95"
              }
            `}
          >
            M Elham Abdussalam
          </h2>

          {/* Subtitle */}
          <p
            className={`text-xl italic md:text-2xl text-gray-600 dark:text-gray-300 transition-all duration-1000 delay-300 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Software Engineer ● Full Stack Developer
          </p>

          {/* Description / Scrambled Text */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <ScrambledText
              className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
            >
              Software Engineer | Full Stack Developer specializing in scalable
              and performance-driven web applications. Experienced in React,
              Next.js, TypeScript, Node.js, and Laravel, with a strong focus on
              clean architecture, user-centered design, and continuous
              improvement.
            </ScrambledText>
          </div>

          {/* Location */}
          <div
            className={`flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 transition-all duration-1000 delay-700 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span>Kudus, Central Java, Indonesia</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0% {
            transform: rotate(0deg);
          }
          10% {
            transform: rotate(14deg);
          }
          20% {
            transform: rotate(-8deg);
          }
          30% {
            transform: rotate(14deg);
          }
          40% {
            transform: rotate(-4deg);
          }
          50% {
            transform: rotate(10deg);
          }
          60% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        :global(.animate-wave) {
          animation: wave 2s ease-in-out infinite;
        }

        :global(.animate-gradient) {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
