"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  data: {
    title: string; // Degree
    institution: string;
    gpa?: string; // GPA (opsional)
    location: string;
    period: string;
    logo: string;
  };
};

export default function EducationCard({ data }: Props) {
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
            <Image src={data.logo} alt={data.title} width={48} height={48} />
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
          {data.title}
        </h4>

        <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
          <span className="font-medium">{data.institution}</span>
          <span>•</span>
          <span>{data.location}</span>
        </div>

        {/* Meta */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <Meta label="Period" value={data.period} />
          {data.gpa && <Meta label="GPA" value={data.gpa} />}
        </div>
      </div>
    </motion.div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-medium text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}
