"use client";

import CareerCard from "./CareerCard";
import { experiences } from "@/data/experiences";
import { motion } from "framer-motion";
import Divider from "./ui/Divider";
import { educations } from "@/data/education";
import EducationCard from "./EducationCard";
import { Briefcase, GraduationCap, Sparkles, Calendar } from "lucide-react";

export default function Career() {
  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {/* Work Experience Section */}
          <div className="mb-32">
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm mb-4">
                <Briefcase className="w-4 h-4 text-blue-400 animate-pulse" />
                <span className="text-sm font-semibold text-blue-400">
                  My Journey
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Work Experience
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
            </motion.div>

            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform md:-translate-x-1/2" />

              {/* Career Cards */}
              <motion.div className="space-y-12">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    variants={{
                      hidden: { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.6, ease: "easeOut" },
                      },
                    }}
                    className={`relative ${
                      index % 2 === 0
                        ? "md:pr-[50%] md:pl-0"
                        : "md:pl-[50%] md:pr-0"
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-4 border-slate-900 transform -translate-x-1/2 z-10 shadow-lg shadow-blue-500/50" />

                    {/* Card Wrapper with Enhanced Styling */}
                    <div className="ml-16 md:ml-0">
                      <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
                        <CareerCard data={exp} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="my-20"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center">
                <div className="bg-slate-900 px-6 py-3 rounded-full border border-slate-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-400 text-sm font-medium">
                    Education & Learning
                  </span>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education Section */}
          <div>
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm mb-4">
                <GraduationCap className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-sm font-semibold text-purple-400">
                  Academic Background
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Education
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto rounded-full" />
            </motion.div>

            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 transform md:-translate-x-1/2" />

              {/* Education Cards */}
              <motion.div className="space-y-12">
                {educations.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    variants={{
                      hidden: { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.6, ease: "easeOut" },
                      },
                    }}
                    className={`relative ${
                      index % 2 === 0
                        ? "md:pr-[50%] md:pl-0"
                        : "md:pl-[50%] md:pr-0"
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 border-4 border-slate-900 transform -translate-x-1/2 z-10 shadow-lg shadow-purple-500/50" />

                    {/* Card Wrapper with Enhanced Styling */}
                    <div className="ml-16 md:ml-0">
                      <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10">
                        <EducationCard data={edu} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mt-20"
          >
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="group hover:-translate-y-1 transition-transform">
                  <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {experiences.length}+
                  </div>
                  <div className="text-slate-400 text-sm">
                    Years of Experience
                  </div>
                </div>
                <div className="group hover:-translate-y-1 transition-transform">
                  <Briefcase className="w-8 h-8 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {experiences.length}
                  </div>
                  <div className="text-slate-400 text-sm">
                    Companies Worked With
                  </div>
                </div>
                <div className="group hover:-translate-y-1 transition-transform">
                  <GraduationCap className="w-8 h-8 text-pink-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-bold text-pink-400 mb-1">
                    {educations.length}
                  </div>
                  <div className="text-slate-400 text-sm">Academic Degrees</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
