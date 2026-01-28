"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import TiltedCard from "./ui/TiltedCard";
import ScrambledText from "./ui/ScrambledText";
import Divider from "./ui/Divider";

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

  const techStack = [
    // Frontend
    {
      name: "React",
      icon: "⚛️",
      color: "from-cyan-400 to-blue-500",
      category: "Frontend",
    },
    {
      name: "Next.js",
      icon: "▲",
      color: "from-slate-100 to-slate-400",
      category: "Frontend",
    },
    {
      name: "TypeScript",
      icon: "TS",
      color: "from-blue-400 to-blue-600",
      category: "Frontend",
    },
    {
      name: "JavaScript",
      icon: "JS",
      color: "from-yellow-400 to-yellow-600",
      category: "Frontend",
    },
    {
      name: "Vue.js",
      icon: "V",
      color: "from-green-400 to-emerald-500",
      category: "Frontend",
    },
    {
      name: "Nuxt.js",
      icon: "N",
      color: "from-green-500 to-teal-600",
      category: "Frontend",
    },
    {
      name: "Tailwind CSS",
      icon: "🎨",
      color: "from-cyan-300 to-blue-400",
      category: "Frontend",
    },
    {
      name: "Bootstrap",
      icon: "B",
      color: "from-purple-500 to-purple-700",
      category: "Frontend",
    },
    {
      name: "Sass",
      icon: "S",
      color: "from-pink-400 to-pink-600",
      category: "Frontend",
    },
    {
      name: "Redux",
      icon: "R",
      color: "from-purple-600 to-indigo-600",
      category: "Frontend",
    },
    {
      name: "Zustand",
      icon: "🐻",
      color: "from-amber-600 to-orange-600",
      category: "Frontend",
    },
    {
      name: "React Query",
      icon: "RQ",
      color: "from-red-400 to-rose-500",
      category: "Frontend",
    },
    // Backend
    {
      name: "Node.js",
      icon: "◆",
      color: "from-green-500 to-green-700",
      category: "Backend",
    },
    {
      name: "Express.js",
      icon: "E",
      color: "from-slate-300 to-slate-500",
      category: "Backend",
    },
    {
      name: "NestJS",
      icon: "🐱",
      color: "from-red-500 to-pink-600",
      category: "Backend",
    },
    {
      name: "Laravel",
      icon: "L",
      color: "from-red-400 to-red-600",
      category: "Backend",
    },
    {
      name: "PHP",
      icon: "🐘",
      color: "from-indigo-400 to-purple-500",
      category: "Backend",
    },
    {
      name: "Python",
      icon: "🐍",
      color: "from-blue-500 to-yellow-500",
      category: "Backend",
    },
    {
      name: "FastAPI",
      icon: "⚡",
      color: "from-teal-500 to-green-500",
      category: "Backend",
    },
    {
      name: "GraphQL",
      icon: "GQL",
      color: "from-pink-500 to-rose-600",
      category: "Backend",
    },
    {
      name: "REST API",
      icon: "🔌",
      color: "from-blue-400 to-cyan-500",
      category: "Backend",
    },
    // Database
    {
      name: "PostgreSQL",
      icon: "🐘",
      color: "from-blue-500 to-indigo-600",
      category: "Database",
    },
    {
      name: "MySQL",
      icon: "🐬",
      color: "from-blue-400 to-blue-600",
      category: "Database",
    },
    {
      name: "MongoDB",
      icon: "🍃",
      color: "from-green-500 to-emerald-600",
      category: "Database",
    },
    {
      name: "Redis",
      icon: "◆",
      color: "from-red-500 to-rose-600",
      category: "Database",
    },
    {
      name: "Firebase",
      icon: "🔥",
      color: "from-yellow-500 to-orange-600",
      category: "Database",
    },
    {
      name: "Supabase",
      icon: "⚡",
      color: "from-green-400 to-emerald-500",
      category: "Database",
    },
    {
      name: "Prisma",
      icon: "▲",
      color: "from-slate-600 to-slate-800",
      category: "Database",
    },
    // Tools & DevOps
    {
      name: "Git",
      icon: "⎇",
      color: "from-orange-500 to-red-500",
      category: "Tools",
    },
    {
      name: "GitHub",
      icon: "🐙",
      color: "from-slate-700 to-slate-900",
      category: "Tools",
    },
    {
      name: "Docker",
      icon: "🐋",
      color: "from-blue-400 to-cyan-500",
      category: "Tools",
    },
    {
      name: "Kubernetes",
      icon: "☸️",
      color: "from-blue-500 to-indigo-600",
      category: "Tools",
    },
    {
      name: "AWS",
      icon: "☁️",
      color: "from-orange-400 to-yellow-500",
      category: "Tools",
    },
    {
      name: "Vercel",
      icon: "▲",
      color: "from-slate-900 to-black",
      category: "Tools",
    },
    {
      name: "Netlify",
      icon: "N",
      color: "from-teal-400 to-cyan-500",
      category: "Tools",
    },
    {
      name: "Postman",
      icon: "📮",
      color: "from-orange-400 to-orange-600",
      category: "Tools",
    },
    {
      name: "VS Code",
      icon: "💻",
      color: "from-blue-500 to-blue-700",
      category: "Tools",
    },
    {
      name: "Figma",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      category: "Tools",
    },
    {
      name: "Jest",
      icon: "🃏",
      color: "from-red-600 to-rose-700",
      category: "Tools",
    },
    {
      name: "Cypress",
      icon: "🌲",
      color: "from-green-600 to-teal-600",
      category: "Tools",
    },
    {
      name: "Webpack",
      icon: "W",
      color: "from-blue-400 to-cyan-600",
      category: "Tools",
    },
    {
      name: "Vite",
      icon: "⚡",
      color: "from-purple-500 to-yellow-500",
      category: "Tools",
    },
    {
      name: "npm",
      icon: "📦",
      color: "from-red-500 to-red-700",
      category: "Tools",
    },
    {
      name: "Yarn",
      icon: "🧶",
      color: "from-blue-400 to-blue-600",
      category: "Tools",
    },
    {
      name: "pnpm",
      icon: "📦",
      color: "from-yellow-500 to-orange-500",
      category: "Tools",
    },
    {
      name: "Linux",
      icon: "🐧",
      color: "from-yellow-400 to-amber-500",
      category: "Tools",
    },
    {
      name: "Nginx",
      icon: "🟢",
      color: "from-green-500 to-green-700",
      category: "Tools",
    },
    {
      name: "CI/CD",
      icon: "🔄",
      color: "from-indigo-500 to-purple-600",
      category: "Tools",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-10 px-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-10 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <div
            className={`w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full transition-all duration-1000 delay-200 ${
              isVisible ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        {/* Main Content - Profile & Description */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
            {/* Profile Image */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl" />

                <div className="relative grayscale hover:grayscale-0 transition duration-500">
                  <TiltedCard
                    imageSrc="/profile.webp"
                    containerHeight="320px"
                    containerWidth="320px"
                    imageHeight="320px"
                    imageWidth="320px"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip
                    displayOverlayContent
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div
              className={`flex-1 transition-all duration-1000 delay-400 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 text-justify">
                <ScrambledText
                  className="text-slate-300 text-base md:text-lg leading-relaxed"
                  radius={100}
                  duration={1.2}
                  speed={0.5}
                  scrambleChars=".:"
                >
                  I'm a{" "}
                  <span className="font-bold  text-blue-400 ">
                    Software Engineer | Full Stack Developer
                  </span>
                  based in Indonesia, focused on building scalable and impactful
                  digital solutions. I specialize in developing web applications
                  using modern technologies such as{" "}
                  <span className="font-semibold text-blue-400">
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
                  Beyond technical skills, I value{" "}
                  <span className="text-purple-400 font-semibold">
                    proactive communication
                  </span>
                  ,{" "}
                  <span className="text-pink-400 font-semibold">
                    critical thinking
                  </span>
                  , and{" "}
                  <span className="text-blue-400 font-semibold">
                    effective time management
                  </span>
                  . I enjoy collaborating in team environments and continuously
                  strive to deliver solutions that create real-world value.
                </ScrambledText>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* Tech Stack Section */}
        <div
          className={`mb-20 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 inline-flex items-center gap-3 flex-wrap justify-center">
              <Sparkles className="w-8 h-8 text-purple-400" />
              Tech Stack & Tools
              <Sparkles className="w-8 h-8 text-blue-400" />
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Technologies and tools I use to build amazing digital experiences
            </p>
          </div>

          {/* Single Column Tech Stack Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  animationDelay: `${index * 30}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease-out ${index * 30}ms`,
                }}
              >
                {/* Glow Effect on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`}
                />

                {/* Card */}
                <div className="relative bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group h-full flex flex-col items-center justify-center gap-3 min-h-[110px]">
                  <div
                    className={`text-3xl font-bold bg-gradient-to-br ${tech.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                  >
                    {tech.icon}
                  </div>
                  <div className="text-center">
                    <span className="text-slate-300 text-xs font-medium block">
                      {tech.name}
                    </span>
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-slate-700 shadow-xl z-10">
                    {tech.category}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-b border-r border-slate-700 rotate-45" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack Summary */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">12+</div>
              <div className="text-slate-400 text-sm">Frontend Tech</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">8+</div>
              <div className="text-slate-400 text-sm">Backend Tech</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-4 border border-green-500/20 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">7+</div>
              <div className="text-slate-400 text-sm">Database Tools</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-sm rounded-xl p-4 border border-orange-500/20 text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">20+</div>
              <div className="text-slate-400 text-sm">Dev Tools</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
