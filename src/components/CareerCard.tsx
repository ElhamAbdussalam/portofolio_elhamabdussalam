"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  CalendarDays,
  Hourglass,
  Briefcase,
  Laptop,
  ChevronDown,
} from "lucide-react";

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
    <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-8">
      {/* Logo */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="shrink-0"
      >
        <div className="group/logo w-20 h-20 rounded-xl bg-stone-100 p-2 ring-1 ring-stone-700 ring-offset-2 ring-offset-stone-900 flex items-center justify-center overflow-hidden transition-all duration-300 hover:ring-amber-400">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src={data.logo}
              alt={data.company}
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
          <span className="font-semibold text-amber-400">{data.company}</span>
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
          className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-stone-800 pt-4"
        >
          <Meta Icon={CalendarDays} label="Period" value={data.period} />
          <Meta Icon={Hourglass} label="Duration" value={data.duration} />
          <Meta Icon={Briefcase} label="Type" value={data.type} />
          <Meta Icon={Laptop} label="Work Mode" value={data.workMode} />
        </motion.div>

        {/* Toggle */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          whileTap={{ scale: 0.96 }}
          className="group/btn mt-5 inline-flex items-center gap-2 text-sm font-medium text-amber-400 cursor-pointer"
        >
          <span className="relative">
            {open ? "Hide Details" : "Show Details"}
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-amber-400 transition-transform duration-300 group-hover/btn:scale-x-100" />
          </span>
          <span className="rounded border border-stone-700 px-1.5 font-mono text-[10px] tabular-nums text-stone-400">
            {data.responsibilities.length}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </motion.button>

        {/* Details */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                }}
                className="mt-4 space-y-2.5 border-l border-stone-800 pl-4 text-sm text-stone-400"
              >
                {data.responsibilities.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start gap-3 leading-relaxed"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-amber-400/80" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Meta({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="text-sm"
    >
      <p className="mb-1 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-stone-500">
        <Icon className="w-3 h-3 text-amber-400/70" />
        {label}
      </p>
      <p className="font-medium text-stone-200">{value}</p>
    </motion.div>
  );
}
