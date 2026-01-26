// src/components/About.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import TiltedCard from "./ui/TiltedCard";
import ScrambledText from "./ui/ScrambledText";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-10 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div
            className={`w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full transition-all duration-1000 delay-200 ${
              isVisible ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        {/* About Content */}
        <div className="max-w-6xl mx-auto px-4 mb-20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            {/* LEFT — Profile Image */}
            <div className="grayscale hover:grayscale-0 transition duration-500">
              <TiltedCard
                imageSrc="/profile.png"
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip
                displayOverlayContent
              />
            </div>

            {/* RIGHT — Description */}
            <div
              className={`flex-1 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <ScrambledText
                className="scrambled-text-demo"
                radius={100}
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
              >
                I'm a{" "}
                <span className="italic font-bold text-indigo-500">
                  Software Engineer | Full Stack Developer
                </span>{" "}
                based in Indonesia, focused on building scalable and impactful
                digital solutions. I specialize in developing web applications
                using modern technologies such as{" "}
                <span className="font-semibold">
                  React, Next.js, TypeScript, Node.js, and Laravel
                </span>
                .
                <br />
                <br />
                My main focus is designing software architectures that are not
                only functional, but also clean, maintainable, and scalable to
                support long-term business growth. I believe that high-quality
                code should go hand in hand with performance, clarity, and
                thoughtful system design.
                <br />
                <br />
                Beyond technical skills, I value proactive communication,
                critical thinking, and effective time management. I enjoy
                collaborating in team environments and continuously strive to
                deliver solutions that create real-world value.
              </ScrambledText>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
