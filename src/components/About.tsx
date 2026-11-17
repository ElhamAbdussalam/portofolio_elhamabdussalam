"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  MapPin,
  Code2,
  Layers,
  Rocket,
  Terminal,
  PawPrint,
  RefreshCw,
  Plug,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import TiltedCard from "./ui/TiltedCard";
import ScrambledText from "./ui/ScrambledText";
import Divider from "./ui/Divider";

type Category = "Frontend" | "Backend" | "Database" | "Tools";

type Tech = {
  name: string;
  abbr: string;
  category: Category;
  slug?: string; // nama icon di Devicon
  urls?: string[]; // override sumber logo
  Icon?: LucideIcon; // fallback bila logo tidak tersedia
  dark?: boolean; // logo gelap -> tetap putih saat hover
};

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const techStack: Tech[] = [
  // Frontend
  { name: "React", abbr: "Re", category: "Frontend", slug: "react" },
  {
    name: "Next.js",
    abbr: "Nx",
    category: "Frontend",
    slug: "nextjs",
  },
  { name: "TypeScript", abbr: "TS", category: "Frontend", slug: "typescript" },
  { name: "JavaScript", abbr: "JS", category: "Frontend", slug: "javascript" },
  { name: "Vue.js", abbr: "Vu", category: "Frontend", slug: "vuejs" },
  { name: "Nuxt.js", abbr: "Nu", category: "Frontend", slug: "nuxtjs" },
  {
    name: "Tailwind CSS",
    abbr: "Tw",
    category: "Frontend",
    slug: "tailwindcss",
  },
  { name: "Bootstrap", abbr: "Bs", category: "Frontend", slug: "bootstrap" },
  { name: "Sass", abbr: "Ss", category: "Frontend", slug: "sass" },
  { name: "Redux", abbr: "Rx", category: "Frontend", slug: "redux" },
  { name: "Zustand", abbr: "Zu", category: "Frontend", Icon: PawPrint },
  {
    name: "React Query",
    abbr: "RQ",
    category: "Frontend",
    urls: ["https://cdn.simpleicons.org/reactquery"],
    Icon: RefreshCw,
  },
  // Backend
  { name: "Node.js", abbr: "No", category: "Backend", slug: "nodejs" },
  {
    name: "Express.js",
    abbr: "Ex",
    category: "Backend",
    slug: "express",
    dark: true,
  },
  { name: "NestJS", abbr: "Ns", category: "Backend", slug: "nestjs" },
  { name: "Laravel", abbr: "La", category: "Backend", slug: "laravel" },
  { name: "PHP", abbr: "Ph", category: "Backend", slug: "php" },
  { name: "Python", abbr: "Py", category: "Backend", slug: "python" },
  { name: "FastAPI", abbr: "Fa", category: "Backend", slug: "fastapi" },
  {
    name: "GraphQL",
    abbr: "Gq",
    category: "Backend",
    urls: [
      "https://cdn.simpleicons.org/graphql",
      `${DEVICON}/graphql/graphql-plain.svg`,
    ],
    Icon: Workflow,
  },
  { name: "REST API", abbr: "Rs", category: "Backend", Icon: Plug },
  // Database
  { name: "PostgreSQL", abbr: "Pg", category: "Database", slug: "postgresql" },
  { name: "MySQL", abbr: "My", category: "Database", slug: "mysql" },
  { name: "MongoDB", abbr: "Mo", category: "Database", slug: "mongodb" },
  { name: "Redis", abbr: "Rd", category: "Database", slug: "redis" },
  { name: "Firebase", abbr: "Fb", category: "Database", slug: "firebase" },
  { name: "Supabase", abbr: "Sb", category: "Database", slug: "supabase" },
  {
    name: "Prisma",
    abbr: "Pr",
    category: "Database",
    slug: "prisma",
    dark: true,
  },
  // Tools & DevOps
  { name: "Git", abbr: "Gi", category: "Tools", slug: "git" },
  { name: "GitHub", abbr: "Gh", category: "Tools", slug: "github", dark: true },
  { name: "Docker", abbr: "Dk", category: "Tools", slug: "docker" },
  { name: "Kubernetes", abbr: "K8", category: "Tools", slug: "kubernetes" },
  {
    name: "AWS",
    abbr: "Aw",
    category: "Tools",
    slug: "amazonwebservices",
    dark: true,
  },
  { name: "Vercel", abbr: "Ve", category: "Tools", slug: "vercel", dark: true },
  { name: "Netlify", abbr: "Nl", category: "Tools", slug: "netlify" },
  { name: "Postman", abbr: "Pm", category: "Tools", slug: "postman" },
  { name: "VS Code", abbr: "VS", category: "Tools", slug: "vscode" },
  { name: "Figma", abbr: "Fg", category: "Tools", slug: "figma" },
  {
    name: "Jest",
    abbr: "Je",
    category: "Tools",
    urls: [
      "https://cdn.simpleicons.org/jest",
      `${DEVICON}/jest/jest-plain.svg`,
    ],
    Icon: Terminal,
  },
  {
    name: "Cypress",
    abbr: "Cy",
    category: "Tools",
    slug: "cypressio",
    dark: true,
  },
  { name: "Webpack", abbr: "Wp", category: "Tools", slug: "webpack" },
  { name: "Vite", abbr: "Vi", category: "Tools", slug: "vite" },
  { name: "npm", abbr: "np", category: "Tools", slug: "npm" },
  { name: "Yarn", abbr: "Yn", category: "Tools", slug: "yarn" },
  { name: "pnpm", abbr: "pn", category: "Tools", slug: "pnpm" },
  { name: "Linux", abbr: "Lx", category: "Tools", slug: "linux", dark: true },
  { name: "Nginx", abbr: "Ng", category: "Tools", slug: "nginx" },
  {
    name: "CI/CD",
    abbr: "CI",
    category: "Tools",
    slug: "githubactions",
    dark: true,
    Icon: Workflow,
  },
];

const categories: ("All" | Category)[] = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
];

/** Logo asli teknologi. Putih/monokrom by default, berwarna saat hover. */
function TechLogo({ tech }: { tech: Tech }) {
  const [attempt, setAttempt] = useState(0);

  const urls =
    tech.urls ??
    (tech.slug
      ? ["original", "plain", "original-wordmark"].map(
          (v) => `${DEVICON}/${tech.slug}/${tech.slug}-${v}.svg`,
        )
      : []);

  if (attempt >= urls.length) {
    const Fallback = tech.Icon;
    return Fallback ? (
      <Fallback className="h-6 w-6" />
    ) : (
      <span className="font-mono text-sm font-semibold">{tech.abbr}</span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={urls[attempt]}
      alt={`${tech.name} logo`}
      loading="lazy"
      draggable={false}
      onError={() => setAttempt((a) => a + 1)}
      className={`h-7 w-7 object-contain brightness-0 invert opacity-60 transition duration-300 group-hover:opacity-100 ${
        tech.dark ? "" : "group-hover:brightness-100 group-hover:invert-0"
      }`}
    />
  );
}

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState<"All" | Category>("All");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const countOf = (c: "All" | Category) =>
    c === "All"
      ? techStack.length
      : techStack.filter((t) => t.category === c).length;

  const visibleTech =
    active === "All"
      ? techStack
      : techStack.filter((t) => t.category === active);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--px", `${(x / r.width - 0.5) * 2}`);
    el.style.setProperty(
      "--py",
      `${Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / 600))}`,
    );
  };

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--cx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--cy", `${e.clientY - r.top}px`);
  };

  const parallax = (depth: number) => ({
    transform: `translate(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px))`,
    transition: "transform 0.4s ease-out",
  });

  const reveal = (delay: string, from: string) =>
    `transition-all duration-1000 ease-out ${delay} ${
      isVisible
        ? "opacity-100 translate-x-0 translate-y-0"
        : `opacity-0 ${from}`
    }`;

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen py-10 px-6 md:px-10 bg-stone-950 relative overflow-hidden"
    >
      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(168,162,158,0.16) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 100%)",
        }}
      />

      {/* Cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx, 50%) var(--my, 20%), rgba(251,191,36,0.06), transparent 70%)",
        }}
      />

      {/* Pulsing glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-amber-500/[0.06] rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-2/3 -left-24 w-80 h-80 bg-orange-500/[0.05] rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-400/[0.03] rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Floating icons (parallax wrapper + float inner) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10" style={parallax(18)}>
          <Code2 className="w-6 h-6 text-amber-400/30 animate-float" />
        </div>
        <div className="absolute top-[22%] right-16" style={parallax(-26)}>
          <Sparkles className="w-5 h-5 text-stone-400/30 animate-float delay-1000" />
        </div>
        <div className="absolute top-[48%] left-[5%]" style={parallax(30)}>
          <Rocket className="w-7 h-7 text-amber-300/25 animate-float delay-2000" />
        </div>
        <div className="absolute top-[62%] right-[6%]" style={parallax(-20)}>
          <Terminal className="w-6 h-6 text-stone-400/25 animate-float" />
        </div>
        <div className="absolute bottom-24 left-1/3" style={parallax(24)}>
          <Layers className="w-6 h-6 text-amber-400/25 animate-float delay-1000" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 mb-3">
            01 &mdash; About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-100 mb-4">
            About Me
          </h2>
          <div
            className={`w-20 h-[3px] bg-amber-400 mx-auto rounded-full origin-center transition-transform duration-1000 delay-200 ${
              isVisible ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        {/* Profile & Description */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
            {/* Profile Image */}
            <div className={reveal("delay-300", "-translate-x-10")}>
              <div className="relative">
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-amber-400/40" />
                <span className="absolute -top-3 -left-3 h-5 w-5 border-t-2 border-l-2 border-amber-400" />
                <span className="absolute -bottom-3 -right-3 h-5 w-5 border-b-2 border-r-2 border-amber-400" />

                <div className="relative rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition duration-500">
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
            <div className={`flex-1 ${reveal("delay-400", "translate-x-10")}`}>
              <div className="relative bg-stone-900/50 rounded-2xl p-8 border border-stone-800 text-justify">
                <span className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full bg-amber-400" />

                <ScrambledText
                  className="text-stone-400 text-base md:text-lg leading-relaxed"
                  radius={100}
                  duration={1.2}
                  speed={0.5}
                  scrambleChars=".:"
                >
                  I&apos;m a{" "}
                  <span className="font-bold text-amber-400">
                    Software Engineer | Full Stack Developer
                  </span>{" "}
                  based in Indonesia, focused on building scalable and impactful
                  digital solutions. I specialize in developing web applications
                  using modern technologies such as{" "}
                  <span className="font-semibold text-stone-100">
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
                  <span className="text-amber-400 font-semibold">
                    proactive communication
                  </span>
                  ,{" "}
                  <span className="text-amber-400 font-semibold">
                    critical thinking
                  </span>
                  , and{" "}
                  <span className="text-amber-400 font-semibold">
                    effective time management
                  </span>
                  . I enjoy collaborating in team environments and continuously
                  strive to deliver solutions that create real-world value.
                </ScrambledText>
              </div>

              {/* Quick facts */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { Icon: MapPin, text: "Kudus, Central Java" },
                  { Icon: Code2, text: "Software Engineer" },
                  { Icon: Layers, text: "Full Stack" },
                ].map(({ Icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-2 rounded-full border border-stone-800 bg-stone-900/60 px-3 py-1.5 text-xs font-medium text-stone-400 transition-colors hover:border-amber-400/50 hover:text-amber-400"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* Tech Stack Section */}
        <div className={`mb-20 ${reveal("delay-500", "translate-y-10")}`}>
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-100 mb-3 inline-flex items-center gap-3 flex-wrap justify-center">
              <Sparkles className="w-7 h-7 text-amber-400" />
              Tech Stack &amp; Tools
              <Sparkles className="w-7 h-7 text-amber-400" />
            </h3>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              Technologies and tools I use to build amazing digital experiences
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((c) => {
              const isActive = active === c;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-amber-400 bg-amber-400 text-stone-950 -translate-y-0.5"
                      : "border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-600 hover:text-stone-100"
                  }`}
                >
                  {c}
                  <span
                    className={`font-mono text-[11px] tabular-nums ${
                      isActive ? "text-stone-800" : "text-stone-600"
                    }`}
                  >
                    {countOf(c)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {visibleTech.map((tech, index) => (
              <div
                key={`${active}-${tech.name}`}
                onMouseMove={handleCardMove}
                className="about-rise group relative overflow-hidden rounded-xl border border-stone-800 bg-stone-900/50 p-4 min-h-[116px] flex flex-col items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/40 hover:shadow-xl hover:shadow-black/40"
                style={{ animationDelay: `${index * 25}ms` }}
              >
                {/* Cursor spotlight */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(120px circle at var(--cx, 50%) var(--cy, 50%), rgba(251,191,36,0.14), transparent 70%)",
                  }}
                />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-lg border border-stone-700 bg-stone-950 text-stone-300 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:border-amber-400/60 group-hover:text-amber-400">
                  <TechLogo tech={tech} />
                </div>

                <div className="relative text-center">
                  <span className="block text-xs font-medium text-stone-300">
                    {tech.name}
                  </span>
                  <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-stone-600 transition-colors group-hover:text-amber-400/70">
                    {tech.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes about-rise {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
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

        .about-rise {
          animation: about-rise 0.5s ease-out both;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-rise,
          .animate-float {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
