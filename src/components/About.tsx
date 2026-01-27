"use client";

import { useEffect, useRef, useState } from "react";
import {
  Code2,
  Rocket,
  Users,
  Target,
  Award,
  Sparkles,
  TrendingUp,
  Heart,
} from "lucide-react";
import TiltedCard from "./ui/TiltedCard";
import ScrambledText from "./ui/ScrambledText";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    {
      icon: Code2,
      value: "50+",
      label: "Projects Completed",
      color: "text-blue-400",
    },
    {
      icon: Award,
      value: "15+",
      label: "Certifications",
      color: "text-purple-400",
    },
    {
      icon: Users,
      value: "30+",
      label: "Happy Clients",
      color: "text-pink-400",
    },
    {
      icon: TrendingUp,
      value: "3+",
      label: "Years Experience",
      color: "text-blue-400",
    },
  ];

  const skills = [
    {
      name: "Frontend Development",
      level: 95,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Backend Development",
      level: 90,
      color: "from-purple-500 to-pink-500",
    },
    { name: "UI/UX Design", level: 85, color: "from-pink-500 to-rose-500" },
    {
      name: "Database Management",
      level: 88,
      color: "from-blue-500 to-purple-500",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Quality First",
      description:
        "Writing clean, maintainable code that stands the test of time",
      color: "blue",
    },
    {
      icon: Rocket,
      title: "Innovation",
      description: "Embracing new technologies and creative problem-solving",
      color: "purple",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working effectively in teams to achieve shared goals",
      color: "pink",
    },
    {
      icon: Heart,
      title: "User-Centric",
      description: "Creating experiences that users love and businesses need",
      color: "blue",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-500/40",
      purple:
        "from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-500/40",
      pink: "from-pink-500/10 to-rose-500/10 border-pink-500/20 hover:border-pink-500/40",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: "text-blue-400",
      purple: "text-purple-400",
      pink: "text-pink-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-sm font-semibold text-blue-400">
              Get to know me
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <div
            className={`w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full transition-all duration-1000 delay-200 ${
              isVisible ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        {/* Main Content - Profile & Description */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
            {/* Profile Image */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl" />

                <div className="relative grayscale hover:grayscale-0 transition duration-500">
                  <TiltedCard
                    imageSrc="/profile.png"
                    containerHeight="320px"
                    containerWidth="320px"
                    imageHeight="320px"
                    imageWidth="320px"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip
                    displayOverlayContent
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div
              className={`flex-1 transition-all duration-1000 delay-400 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                <ScrambledText
                  className="text-slate-300 text-base md:text-lg leading-relaxed"
                  radius={100}
                  duration={1.2}
                  speed={0.5}
                  scrambleChars=".:"
                >
                  I'm a{" "}
                  <span className="font-bold  text-blue-400 ">
                    Software Engineer | Full Stack Developer
                  </span>
                  based in Indonesia, focused on building scalable and impactful
                  digital solutions. I specialize in developing web applications
                  using modern technologies such as{" "}
                  <span className="font-semibold text-blue-400">
                    React, Next.js, TypeScript, Node.js, and Laravel
                  </span>
                  .
                  <br />
                  <br />
                  My main focus is designing software architectures that are not
                  only functional, but also clean, maintainable, and scalable to
                  support long-term business growth. I believe that high-quality
                  code should go hand in hand with performance, clarity, and
                  thoughtful system design.
                  <br />
                  <br />
                  Beyond technical skills, I value{" "}
                  <span className="text-purple-400 font-semibold">
                    proactive communication
                  </span>
                  ,{" "}
                  <span className="text-pink-400 font-semibold">
                    critical thinking
                  </span>
                  , and{" "}
                  <span className="text-blue-400 font-semibold">
                    effective time management
                  </span>
                  . I enjoy collaborating in team environments and continuously
                  strive to deliver solutions that create real-world value.
                </ScrambledText>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-all hover:-translate-y-1 text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon
                className={`w-8 h-8 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform`}
              />
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div
          className={`mb-20 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Technical Skills
          </h3>
          <div className="max-w-3xl mx-auto space-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 font-medium">
                    {skill.name}
                  </span>
                  <span className="text-blue-400 font-bold">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-3 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/50">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                      transitionDelay: `${600 + index * 100}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Grid */}
        <div
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            What I Believe In
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${getColorClasses(value.color)} backdrop-blur-sm rounded-2xl p-6 border transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-${value.color}-500/10`}
                style={{ animationDelay: `${700 + index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center flex-shrink-0 border border-slate-700/50`}
                  >
                    <value.icon
                      className={`w-6 h-6 ${getIconColor(value.color)}`}
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {value.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
