"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Sparkles,
  Globe,
  Code,
  Palette,
  Smartphone,
  Database,
  Zap,
  Calendar,
} from "lucide-react";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "abdussalamelham@gmail.com",
      href: "mailto:abdussalamelham@gmail.com",
      color: "blue",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kudus, Central Java, Indonesia",
      href: "https://maps.google.com",
      color: "purple",
    },
    {
      icon: Globe,
      label: "Languages",
      value: "Indonesian, English",
      href: "#",
      color: "blue",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/ElhamAbdussalam",
      label: "GitHub",
      color: "hover:text-blue-400",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/m-elham-abdussalam/",
      label: "LinkedIn",
      color: "hover:text-purple-400",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/yourusername",
      label: "Instagram",
      color: "hover:text-blue-400",
    },
    {
      icon: Mail,
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=abdussalamelham@gmail.com",
      label: "Email",
      color: "hover:text-purple-400",
    },
  ];

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Full-stack web applications with modern technologies",
      color: "blue",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile solutions",
      color: "purple",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces",
      color: "pink",
    },
    {
      icon: Database,
      title: "Backend Systems",
      description: "Scalable and secure server architectures",
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
    <section className="min-h-screen py-10 px-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Get In Touch
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Interested in collaborating? I'm always open to discussing new
              projects and creative ideas.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Info & Social */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -40 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="space-y-8"
            >
              {/* Contact Info Cards */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                  Contact Information
                </h3>
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      info.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={`flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br ${getColorClasses(info.color)} backdrop-blur-sm border transition-all hover:-translate-y-1 hover:shadow-xl group ${info.href === "#" ? "cursor-default" : ""}`}
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => info.href === "#" && e.preventDefault()}
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center border border-slate-700/50 group-hover:scale-110 transition-transform">
                      <info.icon
                        className={`w-6 h-6 ${getIconColor(info.color)}`}
                      />
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm">{info.label}</div>
                      <div className="text-white font-semibold">
                        {info.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  Connect With Me
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center hover:border-blue-500/50 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 group"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      title={social.label}
                    >
                      <social.icon
                        className={`w-6 h-6 text-slate-400 ${social.color} transition-colors`}
                      />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Response Time Card */}
              <div className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Quick Response
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  I typically respond within 24 hours. For urgent matters, feel
                  free to reach out via email or social media directly.
                </p>
              </div>
            </motion.div>

            {/* Right Side - Services & Availability */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 40 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="space-y-8"
            >
              {/* Services */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Code className="w-6 h-6 text-pink-400" />
                  What I Can Help With
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      className={`p-5 rounded-2xl bg-gradient-to-br ${getColorClasses(service.color)} backdrop-blur-sm border transition-all hover:-translate-y-1 hover:shadow-xl group`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center border border-slate-700/50 mb-4 group-hover:scale-110 transition-transform">
                        <service.icon
                          className={`w-6 h-6 ${getIconColor(service.color)}`}
                        />
                      </div>
                      <h4 className="text-white font-bold mb-2">
                        {service.title}
                      </h4>
                      <p className="text-slate-400 text-sm">
                        {service.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Weekly Availability */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  Weekly Availability
                </h3>
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <p className="text-blue-400 text-sm text-center">
                    📧 Feel free to email anytime - I'll respond during business
                    hours
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut", delay: 0.4 },
              },
            }}
            className="mt-16 text-center"
          ></motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
