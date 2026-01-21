// src/components/Projects.tsx
"use client";

import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce platform with payment integration, inventory management, and admin dashboard.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Real-time collaborative task management application with team features and notifications.",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Social Media Dashboard",
      description:
        "Analytics dashboard for social media metrics with data visualization and reporting features.",
      tags: ["Next.js", "Chart.js", "Tailwind", "Express"],
      gradient: "from-green-500 to-teal-500",
    },
    {
      id: 4,
      title: "Mobile Fitness Tracker",
      description:
        "Cross-platform mobile app for tracking workouts, nutrition, and fitness goals.",
      tags: ["React Native", "Firebase", "TypeScript"],
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "Blog CMS",
      description:
        "Content management system with markdown support, SEO optimization, and multi-user capabilities.",
      tags: ["Next.js", "Prisma", "PostgreSQL", "Vercel"],
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      id: 6,
      title: "Weather App",
      description:
        "Beautiful weather application with location-based forecasts and interactive maps.",
      tags: ["React", "OpenWeather API", "Mapbox"],
      gradient: "from-sky-500 to-blue-500",
    },
  ];

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and
            expertise
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image Placeholder */}
              <div
                className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-6xl font-bold opacity-20 group-hover:opacity-30 transition-opacity">
                    {String(project.id).padStart(2, "0")}
                  </div>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <ExternalLink className="w-5 h-5 text-gray-800" />
                  </button>
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <Github className="w-5 h-5 text-gray-800" />
                  </button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
            View All Projects on GitHub
          </button>
        </div>
      </div>
    </section>
  );
}
