// src/components/About.tsx
"use client";

import { Code2, Briefcase, GraduationCap, Heart } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Years Experience", value: "3+", icon: Briefcase },
    { label: "Projects Completed", value: "20+", icon: Code2 },
    { label: "Happy Clients", value: "15+", icon: Heart },
    { label: "Certifications", value: "5+", icon: GraduationCap },
  ];

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Icon className="w-8 h-8 text-blue-500 mb-3 mx-auto" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="w-full aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-1">
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                <span className="text-8xl font-bold text-gray-400">EA</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
          </div>

          {/* Text Side */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Muhammad Elham Abdussalam
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a passionate Full Stack Developer with expertise in building
              modern web applications. I love turning complex problems into
              simple, beautiful, and intuitive designs.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              With a strong foundation in both frontend and backend development,
              I create seamless digital experiences that not only look great but
              also perform exceptionally. My goal is to write clean,
              maintainable code that makes a difference.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with
              the developer community.
            </p>

            {/* Skills Highlight */}
            <div className="pt-4">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                What I Do
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Develop responsive and performant web applications
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Build RESTful APIs and microservices architecture
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Implement modern UI/UX designs with attention to detail
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Optimize application performance and user experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
