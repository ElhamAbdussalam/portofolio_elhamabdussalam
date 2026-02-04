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
} from "lucide-react";
import { achievements, Achievement } from "@/data/achievements";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function AchievementsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Spring physics untuk smooth animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  // Parallax effects
  const backgroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "30%"]),
    springConfig,
  );

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.95, 1, 1, 0.95],
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Get unique categories from all achievements
  const allCategories = achievements.flatMap((a) =>
    Array.isArray(a.category) ? a.category : [a.category],
  );
  const categories = ["all", ...Array.from(new Set(allCategories))];

  const filteredAchievements = achievements.filter((achievement) => {
    const achievementCategories = Array.isArray(achievement.category)
      ? achievement.category
      : [achievement.category];

    const matchesSearch =
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.organization
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      achievementCategories.some((cat) =>
        cat.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "all" ||
      achievementCategories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const handleShare = (achievement: Achievement) => {
    if (navigator.share) {
      navigator.share({
        title: achievement.title,
        text: `Check out my achievement: ${achievement.title}`,
        url: achievement.credentialUrl,
      });
    } else {
      navigator.clipboard.writeText(achievement.credentialUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity, scale }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 relative overflow-hidden"
    >
      {/* Background Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full bg-blue-500/5 rounded-full"
          />
        </motion.div>
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }}
          className="absolute bottom-1/3 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
        >
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="w-full h-full bg-purple-500/5 rounded-full"
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-10 py-10 relative z-10">
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
            Achievements
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative max-w-2xl mx-auto mb-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <motion.input
                type="text"
                placeholder="Search achievements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-lg shadow-black/20"
                whileFocus={{ borderColor: "rgba(59, 130, 246, 0.5)" }}
              />
            </motion.div>
          </div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-slate-800/50 text-slate-300 hover:bg-slate-700 border border-slate-700"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category === "all" ? "All Categories" : category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px", amount: 0.1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
            >
              <motion.div
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Certificate Image */}
                <div className="relative h-48 overflow-hidden bg-slate-800">
                  {achievement.image ? (
                    <>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={achievement.image}
                          alt={achievement.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                    </>
                  ) : (
                    <div
                      className={`h-full bg-gradient-to-br ${achievement.bgColor} flex items-center justify-center`}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Award className="w-16 h-16 text-white/50" />
                      </motion.div>
                    </div>
                  )}

                  {/* Hover overlay with button */}
                  <motion.div
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      onClick={() => setSelectedAchievement(achievement)}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-bold transition-all shadow-lg cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details →
                    </motion.button>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Code */}
                  <motion.div
                    className="text-xs text-slate-500 font-mono mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {achievement.code}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-lg font-bold text-slate-100 mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {achievement.title}
                  </motion.h3>

                  {/* Organization */}
                  <p className="text-slate-400 text-sm mb-4">
                    {achievement.organization}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(Array.isArray(achievement.category)
                      ? achievement.category
                      : [achievement.category]
                    ).map((cat, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-xs font-medium"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(71, 85, 105, 0.7)",
                        }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {cat}
                      </motion.span>
                    ))}
                  </div>

                  {/* Issue Date */}
                  <div className="text-xs text-slate-500 uppercase tracking-wider">
                    Issued on {achievement.issueDate}
                  </div>
                </div>

                {/* Decorative corner */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BookOpen className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            </motion.div>
            <p className="text-slate-500 text-lg">
              No achievements found matching your search.
            </p>
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedAchievement && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setSelectedAchievement(null)}
        >
          <motion.div
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Certificate Image */}
            <div className="relative h-80 overflow-hidden bg-slate-800">
              {selectedAchievement.image ? (
                <>
                  <Image
                    src={selectedAchievement.image}
                    alt={selectedAchievement.title}
                    fill
                    className="object-contain p-8"
                  />
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-slate-900/30" />
                </>
              ) : (
                <div
                  className={`h-full bg-gradient-to-br ${selectedAchievement.bgColor} flex items-center justify-center`}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Award className="w-32 h-32 text-white/50" />
                  </motion.div>
                </div>
              )}

              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all z-10 border border-white/20 cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>

              {/* Title Overlay */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {selectedAchievement.title}
                </h2>
                <p className="text-slate-300 text-lg">
                  {selectedAchievement.organization}
                </p>
              </motion.div>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-20rem)]">
              {/* Certificate Code & Actions */}
              <motion.div
                className="flex items-center justify-between mb-6 pb-6 border-b border-slate-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-slate-500" />
                  <span className="font-mono text-slate-400 text-sm">
                    {selectedAchievement.code}
                  </span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </motion.div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleShare(selectedAchievement)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                    title="Share"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 className="w-5 h-5 text-slate-300" />
                  </motion.button>
                  <motion.a
                    href={selectedAchievement.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                    title="View Certificate"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink className="w-5 h-5 text-slate-300" />
                  </motion.a>
                  {selectedAchievement.image && (
                    <motion.a
                      href={selectedAchievement.image}
                      download
                      className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-colors"
                      title="Download"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Download className="w-5 h-5 text-white cursor-pointer" />
                    </motion.a>
                  )}
                </div>
              </motion.div>

              {/* Info Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {[
                  {
                    icon: Calendar,
                    label: "Issue Date",
                    value: selectedAchievement.issueDate,
                  },
                  {
                    icon: Building2,
                    label: "Organization",
                    value: selectedAchievement.organization,
                  },
                  {
                    icon: Award,
                    label: "Duration",
                    value: selectedAchievement.duration,
                  },
                  {
                    icon: Code,
                    label:
                      Array.isArray(selectedAchievement.category) &&
                      selectedAchievement.category.length > 1
                        ? "Categories"
                        : "Category",
                    value: selectedAchievement.category,
                    isArray: true,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      borderColor: "rgba(59, 130, 246, 0.3)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className="w-5 h-5 text-blue-400" />
                      <span className="text-slate-400 text-sm">
                        {item.label}
                      </span>
                    </div>
                    {item.isArray ? (
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(item.value)
                          ? item.value
                          : [item.value]
                        ).map((cat, idx) => (
                          <span
                            key={idx}
                            className="text-white font-semibold text-sm px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-white font-semibold text-lg">
                        {item.value as string}
                      </p>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Description */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  Description
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {selectedAchievement.description}
                </p>
              </motion.div>

              {/* Skills */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  Skills Acquired
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAchievement.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg text-blue-400 font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
