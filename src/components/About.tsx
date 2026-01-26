// src/components/About.tsx
"use client";

import { useEffect, useRef, useState } from "react";

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
        <div
          className={`max-w-4xl mx-auto mb-20 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-gray-600 dark:text-gray-300 text-xl leading-relaxed text-justify">
            I'm a{" "}
            <span className="font-bold text-gray-900 dark:text-white italic">
              Software Engineer | Full Stack Developer
            </span>{" "}
            based in Indonesia, focused on building scalable and impactful
            digital solutions. I specialize in developing web applications using
            modern technologies such as React, Next.js, TypeScript, Node.js, and
            Laravel.
            <br />
            <br />
            My main focus is designing software architectures that are not only
            functional, but also clean, maintainable, and scalable to support
            long-term business growth. I believe that high-quality code should
            go hand in hand with performance, clarity, and thoughtful system
            design.
            <br />
            <br />
            Beyond technical skills, I value proactive communication, critical
            thinking, and effective time management. I enjoy collaborating in
            team environments and continuously strive to deliver solutions that
            create real-world value.
          </p>
        </div>
      </div>
    </section>
  );
}
