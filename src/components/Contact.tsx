"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Sparkles,
  Globe,
  Code,
  Palette,
  Smartphone,
  Database,
  Zap,
  Calendar,
  Copy,
  Check,
  ArrowUpRight,
  Clock,
  Send,
} from "lucide-react";

const EMAIL = "abdussalamelham@gmail.com";
// Gmail compose (mailto: tidak berfungsi bila perangkat belum punya aplikasi email default)
const GMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`;

// Sesuaikan jam kerja di sini (zona waktu WIB / Asia/Jakarta). null = libur.
const SCHEDULE: { day: string; hours: [string, string] | null }[] = [
  { day: "Mon", hours: ["09:00", "24:00"] },
  { day: "Tue", hours: ["09:00", "24:00"] },
  { day: "Wed", hours: ["09:00", "24:00"] },
  { day: "Thu", hours: ["09:00", "24:00"] },
  { day: "Fri", hours: ["09:00", "24:00"] },
  { day: "Sat", hours: ["09:00", "24:00"] },
  { day: "Sun", hours: null },
];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const getWib = () => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));
  const second = get("second");
  return {
    day: get("weekday"),
    minutes: hour * 60 + minute,
    clock: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${second}`,
  };
};

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [wib, setWib] = useState<ReturnType<typeof getWib> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setWib(getWib());
    const t = setInterval(() => setWib(getWib()), 1000);
    return () => clearInterval(t);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard tidak tersedia */
    }
  };

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

  const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--cx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--cy", `${e.clientY - r.top}px`);
  };

  const parallax = (depth: number) => ({
    transform: `translate(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px))`,
    transition: "transform 0.4s ease-out",
  });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: EMAIL,
      href: GMAIL_URL,
      copy: true,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kudus, Central Java, Indonesia",
      href: "https://www.google.com/maps/search/?api=1&query=Kudus%2C+Central+Java",
    },
    {
      icon: Globe,
      label: "Languages",
      value: "Indonesian, English",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/ElhamAbdussalam",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/m-elham-abdussalam/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/muh.elham_/",
      label: "Instagram",
    },
    {
      icon: Mail,
      href: GMAIL_URL,
      label: "Email",
    },
  ];

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Full-stack web applications with modern technologies",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile solutions",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces",
    },
    {
      icon: Database,
      title: "Backend Systems",
      description: "Scalable and secure server architectures",
    },
  ];

  // Status ketersediaan (WIB)
  const today = wib ? SCHEDULE.find((s) => s.day === wib.day) : null;
  const isOpen =
    !!wib &&
    !!today?.hours &&
    wib.minutes >= toMinutes(today.hours[0]) &&
    wib.minutes < toMinutes(today.hours[1]);

  const reveal = (from: object) => ({
    hidden: { opacity: 0, ...from },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  });

  const cardBase =
    "relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-xl hover:shadow-black/40";

  const spotlight = (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(200px circle at var(--cx, 50%) var(--cy, 50%), rgba(251,191,36,0.09), transparent 70%)",
      }}
    />
  );

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
            "radial-gradient(400px circle at var(--mx, 50%) var(--my, 20%), rgba(251,191,36,0.055), transparent 70%)",
        }}
      />

      {/* Pulsing glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-amber-500/[0.06] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-orange-500/[0.05] rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/[0.03] rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-20 left-10" style={parallax(18)}>
          <Mail className="w-6 h-6 text-amber-400/30 animate-float" />
        </div>
        <div className="absolute top-40 right-20" style={parallax(-26)}>
          <Sparkles className="w-5 h-5 text-stone-400/30 animate-float delay-1000" />
        </div>
        <div className="absolute bottom-40 left-[6%]" style={parallax(30)}>
          <Send className="w-7 h-7 text-amber-300/25 animate-float delay-2000" />
        </div>
        <div className="absolute bottom-24 right-[8%]" style={parallax(-22)}>
          <Zap className="w-6 h-6 text-stone-400/25 animate-float" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            variants={reveal({ y: 30 })}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 mb-3">
              06 &mdash; Contact
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-stone-100 mb-4">
              Get In Touch
            </h2>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto">
              Interested in collaborating? I&apos;m always open to discussing
              new projects and creative ideas.
            </p>
            <div
              className={`w-20 h-[3px] bg-amber-400 mx-auto rounded-full mt-6 origin-center transition-transform duration-1000 delay-300 ${
                isVisible ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left */}
            <motion.div variants={reveal({ x: -40 })} className="space-y-8">
              {/* Contact info */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight text-stone-100 mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  Contact Information
                </h3>

                {contactInfo.map((info, index) => {
                  const external = info.href.startsWith("http");
                  const inert = info.href === "#";
                  return (
                    <div
                      key={index}
                      onMouseMove={handleCardMove}
                      className={`group flex items-center gap-2 pr-4 ${cardBase}`}
                    >
                      {spotlight}
                      <a
                        href={info.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        onClick={(e) => inert && e.preventDefault()}
                        className={`relative flex flex-1 min-w-0 items-center gap-4 p-5 ${
                          inert ? "cursor-default" : ""
                        }`}
                      >
                        <div className="w-12 h-12 shrink-0 rounded-xl bg-stone-950 flex items-center justify-center border border-stone-700 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:border-amber-400/60">
                          <info.icon className="w-6 h-6 text-amber-400" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-mono text-[11px] uppercase tracking-wider text-stone-500">
                            {info.label}
                          </div>
                          <div className="text-stone-100 font-semibold truncate">
                            {info.value}
                          </div>
                        </div>
                      </a>

                      {info.copy && (
                        <button
                          onClick={copyEmail}
                          aria-label="Copy email"
                          className="relative shrink-0 rounded-lg border border-stone-700 bg-stone-900 p-2 text-stone-400 transition-all hover:border-amber-400/60 hover:text-amber-400 active:scale-95 cursor-pointer"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          {copied && (
                            <span className="absolute -top-9 right-0 whitespace-nowrap rounded-md border border-stone-700 bg-stone-950 px-2 py-1 text-xs text-stone-200">
                              Copied
                            </span>
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Social */}
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-stone-100 mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  Connect With Me
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <div key={index} className="group relative">
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-14 h-14 rounded-xl bg-stone-900/60 border border-stone-800 flex items-center justify-center text-stone-400 transition-all duration-300 hover:bg-amber-400 hover:border-amber-400 hover:text-stone-950 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-400/20"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <social.icon className="w-6 h-6" />
                      </motion.a>
                      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-stone-800 px-2 py-0.5 text-[11px] font-medium text-stone-200 opacity-0 transition-all duration-200 group-hover:opacity-100">
                        {social.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick response */}
              <div
                className={`group p-6 ${cardBase}`}
                onMouseMove={handleCardMove}
              >
                {spotlight}
                <span className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-amber-400" />
                <h4 className="relative text-lg font-bold text-stone-100 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Quick Response
                </h4>
                <p className="relative text-stone-400 text-sm leading-relaxed">
                  I typically respond within 24 hours. For urgent matters, feel
                  free to reach out via email or social media directly.
                </p>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div variants={reveal({ x: 40 })} className="space-y-8">
              {/* Services */}
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-stone-100 mb-6 flex items-center gap-2">
                  <Code className="w-6 h-6 text-amber-400" />
                  What I Can Help With
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      onMouseMove={handleCardMove}
                      className={`group p-5 ${cardBase}`}
                      whileHover={{ scale: 1.03 }}
                    >
                      {spotlight}
                      <span className="absolute right-4 top-3 font-mono text-[11px] tabular-nums text-stone-600 transition-colors group-hover:text-amber-400/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="relative w-12 h-12 rounded-xl bg-stone-950 flex items-center justify-center border border-stone-700 mb-4 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:border-amber-400/60">
                        <service.icon className="w-6 h-6 text-amber-400" />
                      </div>
                      <h4 className="relative text-stone-100 font-bold mb-2">
                        {service.title}
                      </h4>
                      <p className="relative text-stone-400 text-sm">
                        {service.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Weekly availability */}
              <div className="rounded-2xl border border-stone-800 bg-stone-900/50 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <h3 className="text-2xl font-bold tracking-tight text-stone-100 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-amber-400" />
                    Weekly Availability
                  </h3>

                  {wib && (
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
                        isOpen
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-stone-700 bg-stone-900 text-stone-400"
                      }`}
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        {isOpen && (
                          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                        )}
                        <span
                          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                            isOpen ? "bg-emerald-400" : "bg-stone-500"
                          }`}
                        />
                      </span>
                      {isOpen ? "Available now" : "Away right now"}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {SCHEDULE.map((s) => {
                    const isToday = wib?.day === s.day;
                    return (
                      <div
                        key={s.day}
                        className={`rounded-xl border px-1 py-3 text-center transition-colors ${
                          isToday
                            ? "border-amber-400/60 bg-amber-400/10"
                            : "border-stone-800 bg-stone-950/60"
                        }`}
                      >
                        <div
                          className={`font-mono text-[11px] uppercase tracking-wider ${
                            isToday ? "text-amber-400" : "text-stone-500"
                          }`}
                        >
                          {s.day}
                        </div>
                        <div
                          className={`mt-1.5 text-[11px] leading-tight ${
                            s.hours ? "text-stone-300" : "text-stone-600"
                          }`}
                        >
                          {s.hours ? (
                            <>
                              {s.hours[0]}
                              <br />
                              {s.hours[1]}
                            </>
                          ) : (
                            "Off"
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {wib && (
                  <p className="mt-4 flex items-center gap-2 font-mono text-xs text-stone-500">
                    <Clock className="w-3.5 h-3.5 text-amber-400/80" />
                    <span className="tabular-nums">{wib.clock}</span> WIB
                    &middot; Kudus
                  </p>
                )}

                <div className="mt-4 p-3 border border-stone-800 bg-stone-950/60 rounded-xl">
                  <p className="text-stone-400 text-sm text-center">
                    <Mail className="inline w-4 h-4 mr-2 -mt-0.5 text-amber-400" />
                    Feel free to email anytime &mdash; I&apos;ll respond during
                    business hours
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut", delay: 0.4 },
              },
            }}
            className="mt-16 text-center"
          >
            <div className="mx-auto h-px w-24 bg-amber-400/60 mb-8" />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-500 mb-4">
              Have a project in mind?
            </p>
            <a
              href={GMAIL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative z-20 inline-flex items-center gap-3 rounded-xl bg-amber-400 px-8 py-4 text-lg font-semibold text-stone-950 transition-all duration-300 hover:bg-amber-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-400/20 active:translate-y-0"
            >
              Let&apos;s work together
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>
        </motion.div>
      </div>

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
