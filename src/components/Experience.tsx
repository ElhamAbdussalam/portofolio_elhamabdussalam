"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, Sparkles, BookOpen } from "lucide-react";
import CareerCard from "./CareerCard";
import EducationCard from "./EducationCard";
import Divider from "./ui/Divider";
import { experiences } from "@/data/experiences";
import { educations } from "@/data/education";

/* ---------- Section header ---------- */
function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 mb-3">
        {eyebrow}
      </p>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-100 mb-4">
        {title}
      </h2>
      <motion.div
        className="w-20 h-[3px] bg-amber-400 mx-auto rounded-full origin-center"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
      />
    </motion.div>
  );
}

/* ---------- Timeline (garis tergambar mengikuti scroll) ---------- */
function Timeline<T extends { id: string | number }>({
  items,
  renderCard,
}: {
  items: T[];
  renderCard: (item: T) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--cx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--cy", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} className="relative">
      {/* Track + progress line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-stone-800">
        <motion.div
          className="h-full w-full origin-top bg-amber-400"
          style={{ scaleY }}
        />
      </div>

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`group relative ${
              index % 2 === 0
                ? "md:pr-[calc(50%+2rem)] md:pl-0"
                : "md:pl-[calc(50%+2rem)] md:pr-0"
            }`}
          >
            {/* Timeline dot */}
            <motion.div
              className="absolute left-8 md:left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
                delay: 0.2,
              }}
            >
              <span className="absolute inset-0 rounded-full bg-amber-400/50 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
              <span className="relative block h-4 w-4 rounded-full border-2 border-amber-400 bg-stone-950 ring-4 ring-stone-950 transition-colors duration-300 group-hover:bg-amber-400" />
            </motion.div>

            {/* Card */}
            <div className="ml-16 md:ml-0">
              <div
                onMouseMove={handleCardMove}
                className="relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-xl hover:shadow-black/40"
              >
                {/* Cursor spotlight */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(200px circle at var(--cx, 50%) var(--cy, 50%), rgba(251,191,36,0.08), transparent 70%)",
                  }}
                />
                {/* Accent bar */}
                <span className="absolute left-0 top-6 bottom-6 w-[3px] origin-center scale-y-0 rounded-full bg-amber-400 transition-transform duration-300 group-hover:scale-y-100" />
                {/* Index */}
                <span className="absolute right-4 top-3 font-mono text-[11px] tabular-nums text-stone-600 transition-colors duration-300 group-hover:text-amber-400/80">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative">{renderCard(item)}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
export default function Career() {
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty(
      "--px",
      `${(e.clientX / window.innerWidth - 0.5) * 2}`,
    );
    el.style.setProperty(
      "--py",
      `${(e.clientY / window.innerHeight - 0.5) * 2}`,
    );
  };

  const parallax = (depth: number) => ({
    transform: `translate(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px))`,
    transition: "transform 0.4s ease-out",
  });

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen py-20 px-4 md:px-8 lg:px-10 bg-stone-950 relative overflow-hidden"
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
            "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
        }}
      />

      {/* Cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx, 50%) var(--my, 10%), rgba(251,191,36,0.055), transparent 70%)",
        }}
      />

      {/* Pulsing glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-amber-500/[0.06] rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 -right-24 w-80 h-80 bg-orange-500/[0.05] rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-400/[0.03] rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-[6%] left-8" style={parallax(18)}>
          <Briefcase className="w-6 h-6 text-amber-400/30 animate-float" />
        </div>
        <div className="absolute top-[28%] right-10" style={parallax(-26)}>
          <Sparkles className="w-5 h-5 text-stone-400/30 animate-float delay-1000" />
        </div>
        <div className="absolute top-[55%] left-[4%]" style={parallax(30)}>
          <GraduationCap className="w-7 h-7 text-amber-300/25 animate-float delay-2000" />
        </div>
        <div className="absolute top-[78%] right-[6%]" style={parallax(-22)}>
          <BookOpen className="w-6 h-6 text-stone-400/25 animate-float" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Work Experience */}
        <div className="mb-32">
          <SectionHeader eyebrow="02 — Experience" title="Work Experience" />
          <Timeline
            items={experiences}
            renderCard={(exp) => <CareerCard data={exp} />}
          />
        </div>

        <Divider />

        {/* Education */}
        <div>
          <SectionHeader eyebrow="03 — Education" title="Education" />
          <Timeline
            items={educations}
            renderCard={(edu) => <EducationCard data={edu} />}
          />
        </div>
      </div>

      <Divider />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
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
          .animate-float {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
