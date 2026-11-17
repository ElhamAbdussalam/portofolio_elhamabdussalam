"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, CalendarDays, GraduationCap } from "lucide-react";

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

/** Parse "3.85", "3.85/4.00", "3,85 / 4" -> { value, max } */
function parseGpa(gpa?: string) {
  if (!gpa) return null;
  const nums = gpa.replace(/,/g, ".").match(/\d+(\.\d+)?/g);
  if (!nums) return null;
  const value = parseFloat(nums[0]);
  const max = nums[1] ? parseFloat(nums[1]) : 4;
  if (!isFinite(value) || !isFinite(max) || max <= 0 || value > max)
    return null;
  return { value, max };
}

export default function EducationCard({ data }: Props) {
  const gpa = parseGpa(data.gpa);

  return (
    <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-8">
      {/* Logo */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="shrink-0"
      >
        <div className="w-20 h-20 rounded-xl bg-stone-100 p-2 ring-1 ring-stone-700 ring-offset-2 ring-offset-stone-900 flex items-center justify-center overflow-hidden transition-all duration-300 hover:ring-amber-400">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src={data.logo}
              alt={data.institution}
              width={48}
              height={48}
              className="object-contain"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0 md:pr-6">
        <motion.h4
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl font-semibold tracking-tight text-stone-100"
        >
          {data.title}
        </motion.h4>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm"
        >
          <span className="inline-flex items-center gap-1.5 font-semibold text-amber-400">
            <GraduationCap className="w-4 h-4" />
            {data.institution}
          </span>
          <span className="inline-flex items-center gap-1 text-stone-500">
            <MapPin className="w-3.5 h-3.5" />
            {data.location}
          </span>
        </motion.div>

        {/* Meta */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-stone-800 pt-4"
        >
          <Meta Icon={CalendarDays} label="Period" value={data.period} />

          {data.gpa && (
            <Meta
              Icon={GraduationCap}
              label="GPA"
              value={data.gpa}
              className="col-span-2 md:col-span-2"
            >
              {gpa && (
                <div className="mt-2 h-1.5 w-full max-w-[220px] overflow-hidden rounded-full bg-stone-800">
                  <motion.div
                    className="h-full origin-left rounded-full bg-amber-400"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: gpa.value / gpa.max }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            </Meta>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function Meta({
  Icon,
  label,
  value,
  className = "",
  children,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={`text-sm ${className}`}
    >
      <p className="mb-1 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-stone-500">
        <Icon className="w-3 h-3 text-amber-400/70" />
        {label}
      </p>
      <p className="font-medium text-stone-200">{value}</p>
      {children}
    </motion.div>
  );
}
