// src/components/Skills.tsx
"use client";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 90, color: "from-blue-400 to-blue-600" },
        { name: "Next.js", level: 85, color: "from-gray-700 to-gray-900" },
        { name: "TypeScript", level: 88, color: "from-blue-500 to-blue-700" },
        { name: "Tailwind CSS", level: 92, color: "from-cyan-400 to-cyan-600" },
        { name: "Vue.js", level: 75, color: "from-green-400 to-green-600" },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 85, color: "from-green-500 to-green-700" },
        { name: "Express.js", level: 88, color: "from-gray-600 to-gray-800" },
        { name: "NestJS", level: 80, color: "from-red-500 to-red-700" },
        { name: "PostgreSQL", level: 82, color: "from-blue-600 to-blue-800" },
        { name: "MongoDB", level: 85, color: "from-green-600 to-green-800" },
      ],
    },
    {
      title: "Mobile",
      skills: [
        {
          name: "React Native",
          level: 80,
          color: "from-blue-400 to-purple-600",
        },
        { name: "Kotlin", level: 70, color: "from-purple-500 to-purple-700" },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", level: 90, color: "from-orange-500 to-orange-700" },
        { name: "Docker", level: 75, color: "from-blue-400 to-blue-600" },
        { name: "AWS", level: 70, color: "from-yellow-600 to-orange-600" },
        { name: "Figma", level: 85, color: "from-purple-500 to-pink-600" },
      ],
    },
  ];

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional skills and technologies I work with
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Icons (Optional) */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Technologies I Love
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              "⚛️ React",
              "📘 TypeScript",
              "🔷 Next.js",
              "🎨 Tailwind",
              "💚 Node.js",
              "🍃 MongoDB",
              "🐘 PostgreSQL",
              "🐳 Docker",
              "☁️ AWS",
              "📱 React Native",
            ].map((tech) => (
              <div
                key={tech}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 font-medium hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300 hover:scale-105 cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
