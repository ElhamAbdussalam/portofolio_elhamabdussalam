// src/components/Skills.tsx
"use client";

import CareerCard from "./CareerCard";
import { experiences } from "@/data/experiences";
import { motion } from "framer-motion";

export default function Career() {
  return (
    <section className="min-h-screen py-20 px-4">
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
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Career
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 italic">
            My professional journey
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Career Cards */}
        <motion.div className="space-y-12">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              <CareerCard data={exp} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
