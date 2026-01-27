"use client";

import React, { useState } from "react";
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

export default function AchievementsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const filteredAchievements = achievements.filter((achievement) => {
    const matchesSearch =
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.organization
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || achievement.type === filterType;
    const matchesCategory =
      filterCategory === "all" || achievement.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Award className="w-8 h-8 text-slate-950" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                Achievements
              </h1>
              <p className="text-slate-400 text-lg mt-1">
                A curated collection of certificates and badges I've earned
                throughout my professional and academic journey.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterType === "all"
                    ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30"
                    : "bg-slate-900/50 text-slate-400 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setFilterType("Professional")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterType === "Professional"
                    ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30"
                    : "bg-slate-900/50 text-slate-400 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                Professional
              </button>
              <button
                onClick={() => setFilterType("Course")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterType === "Course"
                    ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30"
                    : "bg-slate-900/50 text-slate-400 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                Course
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilterCategory("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterCategory === "all"
                    ? "bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/30"
                    : "bg-slate-900/50 text-slate-400 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                All Categories
              </button>
              {[
                "Backend",
                "Frontend",
                "Mobile",
                "Cloud",
                "Design",
                "Freelance",
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterCategory === category
                      ? "bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/30"
                      : "bg-slate-900/50 text-slate-400 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Total Count */}
          <div className="text-slate-400">
            Total:{" "}
            <span className="text-amber-400 font-bold">
              {filteredAchievements.length}
            </span>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 animate-fadeInUp opacity-0"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Certificate Image */}
              <div
                className={`h-48 bg-gradient-to-br ${achievement.bgColor} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center p-6">
                    <Award className="w-16 h-16 text-white/90 mx-auto mb-3" />
                    <div className="text-white/90 font-bold text-sm">
                      Certificate Preview
                    </div>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <button
                    onClick={() => setSelectedAchievement(achievement)}
                    className="px-6 py-2 bg-white text-slate-950 rounded-lg font-bold hover:bg-amber-400 transition-colors"
                  >
                    View Detail →
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Code */}
                <div className="text-xs text-slate-500 font-mono mb-2">
                  {achievement.code}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-100 mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors">
                  {achievement.title}
                </h3>

                {/* Organization */}
                <p className="text-slate-400 text-sm mb-4">
                  {achievement.organization}
                </p>

                {/* Tags */}
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-medium">
                    {achievement.type}
                  </span>
                  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-medium">
                    {achievement.category}
                  </span>
                </div>

                {/* Issue Date */}
                <div className="text-xs text-slate-500 uppercase tracking-wider">
                  Issued on {achievement.issueDate}
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full" />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">
              No achievements found matching your filters.
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scaleIn">
            {/* Modal Header with Certificate Preview */}
            <div
              className={`relative h-64 bg-gradient-to-br ${selectedAchievement.bgColor} overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all z-10 border border-white/20"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Certificate Preview */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Award className="w-24 h-24 text-white/90 mx-auto mb-4 drop-shadow-lg" />
                  <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
                    {selectedAchievement.title}
                  </h2>
                  <p className="text-white/80 text-lg">
                    {selectedAchievement.organization}
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
              {/* Certificate Code & Verification */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-slate-500" />
                  <span className="font-mono text-slate-400">
                    {selectedAchievement.code}
                  </span>
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleShare(selectedAchievement)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Share"
                  >
                    <Share2 className="w-5 h-5 text-slate-300" />
                  </button>
                  <a
                    href={selectedAchievement.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    title="View Certificate"
                  >
                    <ExternalLink className="w-5 h-5 text-slate-300" />
                  </a>
                  <button
                    className="p-2 bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
                    title="Download"
                  >
                    <Download className="w-5 h-5 text-slate-950" />
                  </button>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Issue Date */}
                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-amber-400" />
                    <span className="text-slate-400 text-sm">Issue Date</span>
                  </div>
                  <p className="text-white font-semibold text-lg">
                    {selectedAchievement.issueDate}
                  </p>
                </div>

                {/* Organization */}
                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-5 h-5 text-amber-400" />
                    <span className="text-slate-400 text-sm">Organization</span>
                  </div>
                  <p className="text-white font-semibold text-lg">
                    {selectedAchievement.organization}
                  </p>
                </div>

                {/* Duration */}
                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="text-slate-400 text-sm">Duration</span>
                  </div>
                  <p className="text-white font-semibold text-lg">
                    {selectedAchievement.duration}
                  </p>
                </div>

                {/* Category */}
                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Code className="w-5 h-5 text-amber-400" />
                    <span className="text-slate-400 text-sm">Category</span>
                  </div>
                  <p className="text-white font-semibold text-lg">
                    {selectedAchievement.category}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  Description
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {selectedAchievement.description}
                </p>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-amber-400" />
                  Skills Acquired
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAchievement.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg text-amber-400 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verify Button */}
              <a
                href={selectedAchievement.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold py-4 rounded-xl transition-all text-center shadow-lg shadow-amber-500/20"
              >
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Verify Certificate
                </span>
              </a>
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

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
