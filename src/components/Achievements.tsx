"use client";

import React, { useState, useEffect } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  const filteredAchievements = achievements.filter((achievement) => {
    const matchesSearch =
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.organization
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesSearch;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div
          className={`text-center mb-10 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Achievements
          </h2>
          <div
            className={`w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full transition-all duration-1000 delay-200 ${
              isVisible ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-lg shadow-black/20"
            />
          </div>
          {searchQuery && (
            <p className="text-center text-slate-400 mt-4">
              Found{" "}
              <span className="text-blue-400 font-bold">
                {filteredAchievements.length}
              </span>{" "}
              {filteredAchievements.length === 1
                ? "achievement"
                : "achievements"}
            </p>
          )}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 animate-fadeInUp opacity-0"
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
                    className="px-6 py-2 bg-white text-slate-950 rounded-lg font-bold hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:text-white transition-all"
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
                <h3 className="text-lg font-bold text-slate-100 mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {achievement.title}
                </h3>

                {/* Organization */}
                <p className="text-slate-400 text-sm mb-4">
                  {achievement.organization}
                </p>

                {/* Tags */}
                <div className="flex gap-2 mb-4">
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
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full" />
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
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Issue Date */}
                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <span className="text-slate-400 text-sm">Issue Date</span>
                  </div>
                  <p className="text-white font-semibold text-lg">
                    {selectedAchievement.issueDate}
                  </p>
                </div>

                {/* Organization */}
                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-5 h-5 text-blue-400" />
                    <span className="text-slate-400 text-sm">Organization</span>
                  </div>
                  <p className="text-white font-semibold text-lg">
                    {selectedAchievement.organization}
                  </p>
                </div>

                {/* Duration */}
                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-blue-400" />
                    <span className="text-slate-400 text-sm">Duration</span>
                  </div>
                  <p className="text-white font-semibold text-lg">
                    {selectedAchievement.duration}
                  </p>
                </div>

                {/* Category */}
                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Code className="w-5 h-5 text-blue-400" />
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
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  Description
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {selectedAchievement.description}
                </p>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  Skills Acquired
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAchievement.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg text-blue-400 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
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
