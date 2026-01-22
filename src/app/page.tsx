"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Home from "@/components/Home";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

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
      {
        threshold: [0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />

      <main className="flex-1">
        <section id="home" className="min-h-screen">
          <Home />
        </section>

        <section id="about" className="min-h-screen">
          <About />
        </section>

        <section id="skills" className="min-h-screen">
          <Skills />
        </section>

        <section id="projects" className="min-h-screen">
          <Projects />
        </section>

        <section id="contact" className="min-h-screen">
          <Contact />
        </section>
      </main>
    </div>
  );
}
