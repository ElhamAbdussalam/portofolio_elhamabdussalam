export interface Achievement {
  id: number;
  title: string;
  organization: string;
  image: string;
  category: string;
  issueDate: string;
  code: string;
  bgColor: string;
  description: string;
  skills: string[];
  duration: string;
  credentialUrl: string;
}

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "Memulai Pemrograman dengan Python",
    organization: "Dicoding Indonesia",
    image: "/sertifikat-1.png",
    category: "Backend",
    issueDate: "June 2025",
    code: "0LZ0RWR4NP65",
    bgColor: "from-emerald-400 to-teal-600",
    description:
      "A comprehensive Python course that covers the language's evolution and core syntax, data handling, expressions, control flow, arrays, matrices, functions, OOP, coding standards, unit testing, and the use of popular libraries for real-world applications.",
    skills: [
      "Python",
      "Data Types & Data Structures",
      "Control Flow",
      "Functions & Modular Programming",
      "Object-Oriented Programming (OOP)",
      "PEP 8 & Code Styling",
      "Unit Testing",
      "Python Libraries",
      "File Handling",
      "Basic Data Processing",
    ],
    duration: "6 months",
    credentialUrl: "https://www.dicoding.com/certificates/0LZ0RWR4NP65",
  },
];
