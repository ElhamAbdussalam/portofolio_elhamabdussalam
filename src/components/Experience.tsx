"use client";

import CareerCard from "./CareerCard";
import { experiences } from "@/data/experiences";
import { motion, useScroll, useTransform } from "framer-motion";
import Divider from "./ui/Divider";
import { educations } from "@/data/education";
import EducationCard from "./EducationCard";
import { useRef } from "react";

export default function Career() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects untuk background elements
  const backgroundY1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 md:px-8 lg:px-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements with Parallax */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ opacity }}
      >
        <motion.div
          style={{ y: backgroundY1 }}
          className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: backgroundY2 }}
          className="absolute bottom-1/3 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
        />
      </motion.div>

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
              <motion.h2
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
                whileInView={{ scale: [0.9, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Work Experience
              </motion.h2>
              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>

            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical Timeline Line with Progress */}
              <motion.div
                className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 md:-translate-x-px"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              {/* Career Cards */}
              <motion.div className="space-y-12">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px", amount: 0.3 }}
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: index % 2 === 0 ? -60 : 60,
                        scale: 0.9,
                      },
                      visible: {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: {
                          duration: 0.6,
                          ease: "easeOut",
                          delay: 0.1,
                        },
                      },
                    }}
                    className={`relative ${
                      index % 2 === 0
                        ? "md:pr-[calc(50%+2rem)] md:pl-0"
                        : "md:pl-[calc(50%+2rem)] md:pr-0"
                    }`}
                  >
                    {/* Timeline Dot with Pulse */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="absolute left-8 md:left-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full
                        bg-gradient-to-r from-blue-500 to-purple-600
                        border-4 border-slate-900
                        md:-translate-x-2 z-10
                        shadow-lg shadow-blue-500/50"
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full bg-blue-500/30"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>

                    {/* Card Wrapper with Enhanced Styling */}
                    <div className="ml-16 md:ml-0">
                      <motion.div
                        className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <CareerCard data={exp} />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <Divider />

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
              <motion.h2
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4"
                whileInView={{ scale: [0.9, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Education
              </motion.h2>
              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>

            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical Timeline Line with Progress */}
              <motion.div
                className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 md:-translate-x-px"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              {/* Education Cards */}
              <motion.div className="space-y-12">
                {educations.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px", amount: 0.3 }}
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: index % 2 === 0 ? -60 : 60,
                        scale: 0.9,
                      },
                      visible: {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: {
                          duration: 0.6,
                          ease: "easeOut",
                          delay: 0.1,
                        },
                      },
                    }}
                    className={`relative ${
                      index % 2 === 0
                        ? "md:pr-[calc(50%+2rem)] md:pl-0"
                        : "md:pl-[calc(50%+2rem)] md:pr-0"
                    }`}
                  >
                    {/* Timeline Dot with Pulse */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="absolute left-8 md:left-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full
                        bg-gradient-to-r from-purple-500 to-pink-600
                        border-4 border-slate-900
                        md:-translate-x-2 z-10
                        shadow-lg shadow-purple-500/50"
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full bg-purple-500/30"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>

                    {/* Card Wrapper with Enhanced Styling */}
                    <div className="ml-16 md:ml-0">
                      <motion.div
                        className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10"
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <EducationCard data={edu} />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      <Divider />
    </section>
  );
}
