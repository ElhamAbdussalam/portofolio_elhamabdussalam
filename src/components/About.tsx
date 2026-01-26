// src/components/About.tsx
"use client";

import Image from "next/image";
import Divider from "./ui/Divider";

export default function About() {
  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </div>

        {/* About Content */}
        <div className="max-w-4xl mx-auto mb-20">
          <p className="text-gray-600 dark:text-gray-300 text-xl leading-relaxed text-justify ">
            I'm a{" "}
            <span className="font-bold text-gray-900 dark:text-white italic">
              Software Engineer | Full Stack Developer
            </span>{" "}
            based in Indonesia, focused on building scalable and impactful
            digital solutions. I specialize in developing web applications using
            modern technologies such as React, Next.js, TypeScript, Node.js, and
            Laravel.
            <br />
            <br />
            My main focus is designing software architectures that are not only
            functional, but also clean, maintainable, and scalable to support
            long-term business growth. I believe that high-quality code should
            go hand in hand with performance, clarity, and thoughtful system
            design.
            <br />
            <br />
            Beyond technical skills, I value proactive communication, critical
            thinking, and effective time management. I enjoy collaborating in
            team environments and continuously strive to deliver solutions that
            create real-world value.
          </p>
        </div>

        {/* Career Section */}
        <div>
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white ">
              Career
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1 italic">
              My professional journey
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mt-4" />
          </div>

          {/* Career Card */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Image
                  src="/company/aws.png"
                  alt="Company Logo"
                  width={48}
                  height={48}
                />
              </div>
            </div>

            {/* Career Info */}
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                Backend Developer
              </h4>

              <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span className="font-medium">Amazon Web Services</span>
                <span>•</span>
                <span>Remote</span>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Period</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Jul 2025 – Dec 2025
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400">Duration</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    6 Months
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400">Type</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Internship
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400">Work Mode</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Remote
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
