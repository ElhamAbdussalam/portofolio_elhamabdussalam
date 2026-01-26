"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Home from "@/components/Home";
import About from "@/components/About";
import Career from "@/components/Career";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Lightning from "@/components/ui/Lightning";
import Divider from "@/components/ui/Divider";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { threshold: [0.25, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <Lightning hue={260} xOffset={0} speed={1} intensity={1} size={1} />
      </div>

      {/* CONTENT */}
      <div className="flex min-h-screen bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />

        <main className="flex-1">
          <section id="home" className="min-h-screen">
            <Home />
          </section>

          <Divider />

          <section id="about" className="min-h-screen">
            <About />
          </section>

          <Divider />

          <section id="career" className="min-h-screen">
            <Career />
          </section>

          <Divider />

          <section id="projects" className="min-h-screen">
            <Projects />
          </section>

          <Divider />

          <section id="contact" className="min-h-screen">
            <Contact />
          </section>
        </main>
      </div>
    </div>
  );
}
