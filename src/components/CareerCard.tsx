"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  data: {
    title: string;
    company: string;
    location: string;
    period: string;
    duration: string;
    type: string;
    workMode: string;
    logo: string;
    responsibilities: string[];
  };
};

export default function CareerCard({ data }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 flex flex-col md:flex-row gap-8"
    >
      {/* Logo with animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="shrink-0"
      >
        <div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image src={data.logo} alt={data.company} width={48} height={48} />
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1">
        <motion.h4
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-semibold text-gray-900 dark:text-white"
        >
          {data.title}
        </motion.h4>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1"
        >
          <span className="font-medium">{data.company}</span>
          <span>•</span>
          <span>{data.location}</span>
        </motion.div>

        {/* Meta with stagger animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
        >
          <MetaAnimated label="Period" value={data.period} />
          <MetaAnimated label="Duration" value={data.duration} />
          <MetaAnimated label="Type" value={data.type} />
          <MetaAnimated label="Work Mode" value={data.workMode} />
        </motion.div>

        {/* Toggle Button with arrow animation */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 cursor-pointer"
        >
          {open ? "Hide Details" : "Show Details"}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.1 }}
          >
            ▼
          </motion.span>
        </motion.button>

        {/* Animated Details */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.03,
                    },
                  },
                }}
                className="mt-4"
              >
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {data.responsibilities.map((item, i) => (
                    <motion.li
                      key={i}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={{ duration: 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function MetaAnimated({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <p className="text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-medium text-gray-900 dark:text-white">{value}</p>
    </motion.div>
  );
}
