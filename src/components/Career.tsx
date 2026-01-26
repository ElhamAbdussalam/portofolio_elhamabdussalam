// src/components/Skills.tsx
"use client";

import CareerCard from "./CareerCard";
import { experiences } from "@/data/experiences";

export default function Career() {
  return (
    <section className="min-h-screen py-20 px-4">
      {/* Career Section */}
      <div>
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white ">
            Career
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 italic">
            My professional journey
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mt-4" />
        </div>

        {/* Career Card */}
        <div className="space-y-12">
          {experiences.map((exp) => (
            <CareerCard key={exp.id} data={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
