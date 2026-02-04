"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import TiltedCard from "./ui/TiltedCard";
import ScrambledText from "./ui/ScrambledText";
import Divider from "./ui/Divider";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects dengan spring physics untuk smooth motion
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const backgroundY1 = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "40%"]),
    springConfig,
  );
  const backgroundY2 = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]),
    springConfig,
  );
  const backgroundY3 = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "20%"]),
    springConfig,
  );

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.95, 1, 1, 0.95],
  );

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
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="min-h-screen py-10 px-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: backgroundY1 }}
          className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: backgroundY2 }}
          className="absolute bottom-1/3 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: backgroundY3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
            whileInView={{ scale: [0.9, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            About Me
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Main Content - Profile & Description */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -60, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="relative">
                {/* Glow Effect with Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="relative grayscale hover:grayscale-0 transition duration-500"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
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
                </motion.div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="flex-1"
            >
              <motion.div
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 text-justify"
                whileHover={{
                  borderColor: "rgba(96, 165, 250, 0.3)",
                  boxShadow: "0 0 30px rgba(96, 165, 250, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <ScrambledText
                  className="text-slate-300 text-base md:text-lg leading-relaxed"
                  radius={100}
                  duration={1.2}
                  speed={0.5}
                  scrambleChars=".:"
                >
                  I'm a{" "}
                  <span className="font-bold text-blue-400">
                    Software Engineer | Full Stack Developer
                  </span>{" "}
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
              </motion.div>
            </motion.div>
          </div>
        </div>

        <Divider />

        {/* Tech Stack Section */}
        <motion.div
          ref={techStackRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h3
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 inline-flex items-center gap-3 flex-wrap justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-purple-400" />
              </motion.div>
              Tech Stack & Tools
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-blue-400" />
              </motion.div>
            </motion.h3>
            <motion.p
              className="text-slate-400 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Technologies and tools I use to build amazing digital experiences
            </motion.p>
          </motion.div>

          {/* Tech Stack Grid with Staggered Animation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px", amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.02,
                  ease: "easeOut",
                }}
                className="group relative"
              >
                {/* Glow Effect on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} rounded-2xl blur-xl`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Card */}
                <motion.div
                  className="relative bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 group h-full flex flex-col items-center justify-center gap-3 min-h-[110px]"
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className={`text-3xl font-bold bg-gradient-to-br ${tech.color} bg-clip-text text-transparent`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {tech.icon}
                  </motion.div>
                  <div className="text-center">
                    <span className="text-slate-300 text-xs font-medium block">
                      {tech.name}
                    </span>
                  </div>

                  {/* Tooltip on hover */}
                  <motion.div
                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-slate-700 shadow-xl z-10"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    {tech.category}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-b border-r border-slate-700 rotate-45" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack Summary with Counter Animation */}
          <motion.div
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {[
              {
                count: "12+",
                label: "Frontend Tech",
                gradient: "from-blue-500/10 to-cyan-500/10",
                border: "border-blue-500/20",
                text: "text-blue-400",
              },
              {
                count: "8+",
                label: "Backend Tech",
                gradient: "from-purple-500/10 to-pink-500/10",
                border: "border-purple-500/20",
                text: "text-purple-400",
              },
              {
                count: "7+",
                label: "Database Tools",
                gradient: "from-green-500/10 to-emerald-500/10",
                border: "border-green-500/20",
                text: "text-green-400",
              },
              {
                count: "20+",
                label: "Dev Tools",
                gradient: "from-orange-500/10 to-amber-500/10",
                border: "border-orange-500/20",
                text: "text-orange-400",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${item.gradient} backdrop-blur-sm rounded-xl p-4 border ${item.border} text-center`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  borderColor: item.border.replace("/20", "/40"),
                }}
              >
                <motion.div
                  className={`text-2xl font-bold ${item.text} mb-1`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                >
                  {item.count}
                </motion.div>
                <div className="text-slate-400 text-sm">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
