"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Search,
  Award,
  BookOpen,
  Code,
  Briefcase,
  X,
  Download,
  Share2,
  ExternalLink,
  Calendar,
  Building2,
  Hash,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Trophy,
  Medal,
  Check,
} from "lucide-react";
import { achievements, Achievement } from "@/data/achievements";

const catsOf = (a: Achievement): string[] =>
  Array.isArray(a.category) ? a.category : [a.category];

export default function AchievementsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Categories
  const categories = [
    "all",
    ...Array.from(new Set(achievements.flatMap(catsOf))),
  ];

  const countOf = (c: string) =>
    c === "all"
      ? achievements.length
      : achievements.filter((a) => catsOf(a).includes(c)).length;

  const q = searchQuery.toLowerCase();
  const filteredAchievements = achievements.filter((achievement) => {
    const cats = catsOf(achievement);

    const matchesSearch =
      achievement.title.toLowerCase().includes(q) ||
      achievement.organization.toLowerCase().includes(q) ||
      cats.some((cat) => cat.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === "all" || cats.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const currentIndex = selectedAchievement
    ? filteredAchievements.findIndex((a) => a.id === selectedAchievement.id)
    : -1;

  const goTo = (dir: 1 | -1) => {
    const n = filteredAchievements.length;
    if (n < 2 || currentIndex < 0) return;
    setSelectedAchievement(filteredAchievements[(currentIndex + dir + n) % n]);
  };

  const handleShare = async (achievement: Achievement) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: achievement.title,
          text: `Check out my achievement: ${achievement.title}`,
          url: achievement.credentialUrl,
        });
      } catch {
        /* dibatalkan user */
      }
    } else {
      await navigator.clipboard.writeText(achievement.credentialUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Keyboard: "/" fokus search, Esc tutup modal, panah kiri/kanan pindah sertifikat
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing =
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable);

      if (selectedAchievement) {
        if (e.key === "Escape") setSelectedAchievement(null);
        if (e.key === "ArrowRight") goTo(1);
        if (e.key === "ArrowLeft") goTo(-1);
        return;
      }
      if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAchievement, filteredAchievements.length, currentIndex]);

  // Kunci scroll saat modal terbuka
  useEffect(() => {
    if (!selectedAchievement) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selectedAchievement]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = rootRef.current;
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

  const modalCats = selectedAchievement ? catsOf(selectedAchievement) : [];

  return (
    <div
      ref={rootRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-stone-950 text-stone-100 relative overflow-hidden"
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
            "radial-gradient(ellipse 80% 60% at 50% 25%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 25%, black 20%, transparent 100%)",
        }}
      />

      {/* Cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx, 50%) var(--my, 15%), rgba(251,191,36,0.055), transparent 70%)",
        }}
      />

      {/* Pulsing glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-amber-500/[0.06] rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-2/3 -left-24 w-80 h-80 bg-orange-500/[0.05] rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-400/[0.03] rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-20 left-10" style={parallax(18)}>
          <Trophy className="w-6 h-6 text-amber-400/30 animate-float" />
        </div>
        <div className="absolute top-[24%] right-14" style={parallax(-26)}>
          <Sparkles className="w-5 h-5 text-stone-400/30 animate-float delay-1000" />
        </div>
        <div className="absolute top-[50%] left-[4%]" style={parallax(30)}>
          <Medal className="w-7 h-7 text-amber-300/25 animate-float delay-2000" />
        </div>
        <div className="absolute top-[72%] right-[5%]" style={parallax(-22)}>
          <Award className="w-6 h-6 text-stone-400/25 animate-float" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 mb-3">
            04 &mdash; Achievements
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-100 mb-4">
            Achievements
          </h2>
          <div
            className={`w-20 h-[3px] bg-amber-400 mx-auto rounded-full origin-center transition-transform duration-1000 delay-200 ${
              isVisible ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        {/* Search + Filter */}
        <div className="mb-10">
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-14 py-4 bg-stone-900/60 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <kbd className="hidden md:inline-flex absolute right-4 top-1/2 -translate-y-1/2 h-6 min-w-6 items-center justify-center rounded border border-stone-700 bg-stone-900 px-1.5 font-mono text-xs text-stone-500">
                /
              </kbd>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-amber-400 bg-amber-400 text-stone-950 -translate-y-0.5"
                      : "border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-600 hover:text-stone-100"
                  }`}
                >
                  {category === "all" ? "All Categories" : category}
                  <span
                    className={`font-mono text-[11px] tabular-nums ${
                      isActive ? "text-stone-800" : "text-stone-600"
                    }`}
                  >
                    {countOf(category)}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-center font-mono text-xs text-stone-500">
            Showing {filteredAchievements.length} of {achievements.length}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement, index) => (
            <div
              key={`${selectedCategory}-${achievement.id}`}
              onMouseMove={handleCardMove}
              className="group relative bg-stone-900/50 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1 animate-fadeInUp opacity-0"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Cursor spotlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(180px circle at var(--cx, 50%) var(--cy, 50%), rgba(251,191,36,0.08), transparent 70%)",
                }}
              />

              {/* Certificate Image */}
              <div className="relative h-48 overflow-hidden bg-stone-900">
                {achievement.image ? (
                  <>
                    <Image
                      src={achievement.image}
                      alt={achievement.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
                  </>
                ) : (
                  <div className="h-full bg-stone-900 flex items-center justify-center">
                    <Award className="w-16 h-16 text-amber-400/40" />
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 z-20 bg-stone-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setSelectedAchievement(achievement)}
                    className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-lg font-semibold transition-all translate-y-2 group-hover:translate-y-0 hover:scale-105 shadow-lg cursor-pointer"
                  >
                    View Details →
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-5">
                <div className="text-xs text-stone-500 font-mono mb-2">
                  {achievement.code}
                </div>

                <h3 className="text-lg font-bold text-stone-100 mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors">
                  {achievement.title}
                </h3>

                <p className="text-stone-400 text-sm mb-4">
                  {achievement.organization}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {catsOf(achievement).map((cat, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-stone-800/70 border border-stone-700/60 text-stone-300 rounded-full text-xs font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="font-mono text-[11px] text-stone-500 uppercase tracking-wider">
                  Issued on {achievement.issueDate}
                </div>
              </div>

              {/* Corner bracket */}
              <span className="pointer-events-none absolute top-3 right-3 z-20 h-4 w-4 border-t-2 border-r-2 border-amber-400/0 transition-colors duration-300 group-hover:border-amber-400" />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-stone-700 mx-auto mb-4" />
            <p className="text-stone-500 text-lg mb-4">
              No achievements found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-5 py-2 rounded-lg border border-stone-700 text-sm font-medium text-stone-300 hover:border-amber-400/60 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 bg-stone-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="relative bg-stone-900 border border-stone-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-black/60 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header image */}
            <div className="relative h-80 overflow-hidden bg-stone-950">
              {selectedAchievement.image ? (
                <>
                  <Image
                    src={selectedAchievement.image}
                    alt={selectedAchievement.title}
                    fill
                    className="object-contain p-8"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-stone-900/20" />
                </>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <Award className="w-32 h-32 text-amber-400/40" />
                </div>
              )}

              {/* Counter */}
              {currentIndex >= 0 && (
                <div className="absolute top-4 left-4 z-10 rounded-full border border-stone-700 bg-stone-950/70 px-3 py-1 font-mono text-xs tabular-nums text-stone-300">
                  {String(currentIndex + 1).padStart(2, "0")} /{" "}
                  {String(filteredAchievements.length).padStart(2, "0")}
                </div>
              )}

              {/* Close */}
              <button
                onClick={() => setSelectedAchievement(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-10 h-10 bg-stone-950/70 hover:bg-amber-400 hover:text-stone-950 text-stone-200 rounded-full flex items-center justify-center transition-all z-10 border border-stone-700 hover:border-amber-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next */}
              {filteredAchievements.length > 1 && (
                <>
                  <button
                    onClick={() => goTo(-1)}
                    aria-label="Previous"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-stone-700 bg-stone-950/70 text-stone-200 flex items-center justify-center transition-all hover:bg-amber-400 hover:text-stone-950 hover:border-amber-400 hover:-translate-x-0.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => goTo(1)}
                    aria-label="Next"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-stone-700 bg-stone-950/70 text-stone-200 flex items-center justify-center transition-all hover:bg-amber-400 hover:text-stone-950 hover:border-amber-400 hover:translate-x-0.5 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-stone-900 via-stone-900/80 to-transparent">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-100 mb-1">
                  {selectedAchievement.title}
                </h2>
                <p className="text-amber-400 text-lg font-medium">
                  {selectedAchievement.organization}
                </p>
              </div>
            </div>

            {/* Modal content */}
            <div
              key={selectedAchievement.id}
              className="p-8 overflow-y-auto max-h-[calc(90vh-20rem)] animate-fadeInUp"
            >
              {/* Code & actions */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-stone-500" />
                  <span className="font-mono text-stone-400 text-sm">
                    {selectedAchievement.code}
                  </span>
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleShare(selectedAchievement)}
                    className="relative p-2 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
                    title="Share"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Share2 className="w-5 h-5 text-stone-300" />
                    )}
                    {copied && (
                      <span className="absolute -top-9 right-0 whitespace-nowrap rounded-md border border-stone-700 bg-stone-950 px-2 py-1 text-xs text-stone-200">
                        Link copied
                      </span>
                    )}
                  </button>
                  <a
                    href={selectedAchievement.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
                    title="View Certificate"
                  >
                    <ExternalLink className="w-5 h-5 text-stone-300" />
                  </a>
                  {selectedAchievement.image && (
                    <a
                      href={selectedAchievement.image}
                      download
                      className="p-2 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                      title="Download"
                    >
                      <Download className="w-5 h-5 text-stone-950" />
                    </a>
                  )}
                </div>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <InfoBox Icon={Calendar} label="Issue Date">
                  <p className="text-stone-100 font-semibold text-lg">
                    {selectedAchievement.issueDate}
                  </p>
                </InfoBox>

                <InfoBox Icon={Building2} label="Organization">
                  <p className="text-stone-100 font-semibold text-lg">
                    {selectedAchievement.organization}
                  </p>
                </InfoBox>

                <InfoBox Icon={Award} label="Duration">
                  <p className="text-stone-100 font-semibold text-lg">
                    {selectedAchievement.duration}
                  </p>
                </InfoBox>

                <InfoBox
                  Icon={Code}
                  label={modalCats.length > 1 ? "Categories" : "Category"}
                >
                  <div className="flex flex-wrap gap-2">
                    {modalCats.map((cat, idx) => (
                      <span
                        key={idx}
                        className="text-amber-400 font-semibold text-sm px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-lg"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </InfoBox>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-stone-100 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  Description
                </h3>
                <p className="text-stone-400 leading-relaxed">
                  {selectedAchievement.description}
                </p>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-stone-100 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-amber-400" />
                  Skills Acquired
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAchievement.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 border border-stone-700 bg-stone-800/50 rounded-lg text-stone-300 font-medium transition-colors hover:border-amber-400/50 hover:text-amber-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-6 hidden md:block font-mono text-[11px] text-stone-600">
                ← → navigate &nbsp;·&nbsp; esc close
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
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

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
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
    </div>
  );
}

function InfoBox({
  Icon,
  label,
  children,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-stone-800/40 rounded-xl p-5 border border-stone-800 transition-colors hover:border-amber-400/30">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-amber-400" />
        <span className="font-mono text-[11px] uppercase tracking-wider text-stone-500">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
