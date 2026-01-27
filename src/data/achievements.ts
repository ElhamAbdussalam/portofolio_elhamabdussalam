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
    duration: "3 months",
    credentialUrl: "https://www.dicoding.com/certificates/0LZ0RWR4NP65",
  },
  {
    id: 2,
    title: "Belajar Back-End Pemula dengan JavaScript",
    organization: "Dicoding Indonesia",
    image: "/sertifikat-2.png",
    category: "Backend",
    issueDate: "May 2025",
    code: "ERZREOGLQXYV",
    bgColor: "from-emerald-400 to-teal-600",
    description:
      "An introductory back-end course that covers the fundamentals of server-side development, Node.js basics, building and deploying RESTful APIs, and testing web services using Postman.",
    skills: [
      "Back-End Development",
      "Client–Server Architecture",
      "HTTP Protocol",
      "RESTful API Design",
      "Node.js",
      "Node.js Core Modules",
      "Modular Programming",
      "Node Package Manager (NPM)",
      "Event-Driven Programming",
      "File System & Streams",
      "Building Web Services",
      "Hapi Framework",
      "API Development",
      "API Deployment",
      "Amazon EC2",
      "SSH & Server Management",
      "Postman",
      "API Testing",
      "Automated API Testing",
    ],
    duration: "3 months",
    credentialUrl: "https://www.dicoding.com/certificates/ERZREOGLQXYV",
  },
  {
    id: 3,
    title: "Belajar Membuat Front-End Web untuk Pemula",
    organization: "Dicoding Indonesia",
    image: "/sertifikat-3.png",
    category: "Frontend",
    issueDate: "Jan 2025",
    code: "GRX53KODKZ0M",
    bgColor: "from-emerald-400 to-teal-600",
    description:
      "An in-depth front-end module focusing on Browser Object Model (BOM), Document Object Model (DOM) manipulation, event handling for interactive web experiences, and client-side data storage using Web Storage APIs.",
    skills: [
      "JavaScript",
      "Browser Object Model (BOM)",
      "Document Object Model (DOM)",
      "DOM Manipulation",
      "Event Handling",
      "Interactive Web Development",
      "Client-Side Scripting",
      "Web Storage API",
      "Local Storage",
      "Session Storage",
      "State Management (Client-Side)",
    ],
    duration: "3 months",
    credentialUrl: "https://www.dicoding.com/certificates/GRX53KODKZ0M",
  },
];
