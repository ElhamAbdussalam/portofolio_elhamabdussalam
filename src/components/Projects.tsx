"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Search,
  Folder,
  Code,
  Calendar,
  Users,
  CheckCircle,
  X,
  Layers,
  Sparkles,
} from "lucide-react";
import { projects, Project } from "@/data/projects";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Spring physics untuk smooth animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  // Parallax effects
  const backgroundY1 = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "40%"]),
    springConfig,
  );
  const backgroundY2 = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]),
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

  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesSearch;
    })
    .sort((a, b) => {
      const yearA = typeof a.year === "number" ? a.year : parseInt(a.year);
      const yearB = typeof b.year === "number" ? b.year : parseInt(b.year);
      return yearB - yearA;
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "from-emerald-500 to-green-600";
      case "In Progress":
        return "from-blue-500 to-cyan-600";
      case "Maintenance":
        return "from-amber-500 to-orange-600";
      default:
        return "from-slate-500 to-slate-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4" />;
      case "In Progress":
        return <Sparkles className="w-4 h-4" />;
      case "Maintenance":
        return <Layers className="w-4 h-4" />;
      default:
        return <Folder className="w-4 h-4" />;
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
          style={{ y: backgroundY1 }}
          className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
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
          style={{ y: backgroundY2 }}
          className="absolute bottom-1/4 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
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
            Projects
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
          <div className="relative max-w-2xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <motion.input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-lg shadow-black/20"
                whileFocus={{ borderColor: "rgba(59, 130, 246, 0.5)" }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
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
                {/* Project Image */}
                <div className="relative h-48 bg-slate-800 overflow-hidden">
                  {project.image ? (
                    <>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                    </>
                  ) : (
                    <div className="h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Folder className="w-20 h-20 text-blue-400/30" />
                      </motion.div>
                    </div>
                  )}

                  {/* Hover overlay with buttons */}
                  <motion.div
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center gap-3"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all shadow-lg flex items-center gap-2 text-sm cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Sparkles className="w-4 h-4" />
                      View Details
                    </motion.button>
                  </motion.div>

                  {/* Status Badge */}
                  <motion.div
                    className="absolute top-3 left-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${getStatusColor(project.status)} text-white text-xs font-bold shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {getStatusIcon(project.status)}
                      {project.status}
                    </motion.div>
                  </motion.div>

                  {/* Year Badge */}
                  <motion.div
                    className="absolute top-3 right-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className="px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-slate-200 text-xs font-semibold border border-slate-700"
                      whileHover={{ scale: 1.1 }}
                    >
                      {project.year}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category */}
                  <motion.div
                    className="text-xs text-blue-400 font-semibold mb-2 uppercase tracking-wider"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.category}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-lg font-bold text-slate-100 mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {project.title}
                  </motion.h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className="px-2.5 py-1 bg-slate-700/50 text-slate-300 rounded-md text-xs font-medium"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(71, 85, 105, 0.7)",
                        }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2.5 py-1 bg-slate-700/50 text-slate-400 rounded-md text-xs font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <motion.button
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-2 bg-slate-700/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 text-slate-300 hover:text-white rounded-lg font-medium transition-all text-sm cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details
                  </motion.button>
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
        {filteredProjects.length === 0 && (
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
              <Folder className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            </motion.div>
            <p className="text-slate-500 text-lg">
              No projects found matching your search.
            </p>
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Project Image */}
            <div className="relative h-80 overflow-hidden bg-slate-800">
              {selectedProject.image ? (
                <>
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/30" />
                </>
              ) : (
                <div className="h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Folder className="w-32 h-32 text-blue-400/30" />
                  </motion.div>
                </div>
              )}

              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all z-10 border border-white/20 cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>

              {/* Project Header Overlay */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getStatusColor(selectedProject.status)} text-white text-sm font-bold shadow-lg mb-3`}
                  whileHover={{ scale: 1.05 }}
                >
                  {getStatusIcon(selectedProject.status)}
                  {selectedProject.status}
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {selectedProject.title}
                </h2>
                <p className="text-blue-300 text-lg">
                  {selectedProject.category} • {selectedProject.year}
                </p>
              </motion.div>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-20rem)]">
              {/* Info Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {[
                  { icon: Users, label: "Role", value: selectedProject.role },
                  {
                    icon: Calendar,
                    label: "Year",
                    value: selectedProject.year,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
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
                    <p className="text-white font-semibold text-lg">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Description */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Folder className="w-5 h-5 text-blue-400" />
                  About This Project
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {selectedProject.longDescription}
                </p>
              </motion.div>

              {/* Features */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProject.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 bg-slate-800/30 rounded-lg p-3 border border-slate-700/50"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg text-blue-400 font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {tech}
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
