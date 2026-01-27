export interface Achievement {
  id: number;
  title: string;
  organization: string;
  image: string;
  type: "Professional" | "Course";
  category: string;
  issueDate: string;
  code: string;
  bgColor: string;
  description: string;
  skills: string[];
  duration: string;
  verifyUrl: string;
  credentialUrl: string;
}

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "Backend Developer Internship - Parto.id",
    organization: "Affan Technology Indonesia",
    image: "/api/placeholder/800/600",
    type: "Professional",
    category: "Backend",
    issueDate: "July 2025",
    code: "196/EKS/HCLGA/ATI/VIII/2025",
    bgColor: "from-emerald-400 to-teal-600",
    description:
      "Successfully completed a comprehensive backend development internship program, working on real-world projects using modern technologies and best practices.",
    skills: ["Node.js", "Express.js", "MongoDB", "RESTful API", "Git", "Agile"],
    duration: "6 months",
    verifyUrl: "https://verify.example.com/196-EKS",
    credentialUrl: "https://certificates.example.com/abc123",
  },
  {
    id: 2,
    title: "E-book Petunjuk Pro: Freelance Web Developer & Kerja Remote",
    organization: "Build With Angga",
    image: "/api/placeholder/800/600",
    type: "Course",
    category: "Freelance",
    issueDate: "September 2025",
    code: "81PZLGL38ZQY",
    bgColor: "from-blue-400 to-indigo-600",
    description:
      "Completed an intensive course on freelance web development and remote work strategies, learning essential skills for building a successful freelance career.",
    skills: [
      "Client Management",
      "Portfolio Building",
      "Pricing Strategy",
      "Remote Work",
      "Marketing",
    ],
    duration: "4 weeks",
    verifyUrl: "https://verify.buildwithangga.com/81PZLGL38ZQY",
    credentialUrl: "https://certificates.buildwithangga.com/81PZLGL38ZQY",
  },
  {
    id: 3,
    title: "Belajar Membuat Aplikasi Android dengan Jetpack Compose",
    organization: "Dicoding Indonesia",
    image: "/api/placeholder/800/600",
    type: "Course",
    category: "Mobile",
    issueDate: "January 2025",
    code: "81PZLGL38ZQY",
    bgColor: "from-purple-400 to-pink-600",
    description:
      "Mastered modern Android app development using Jetpack Compose, including state management, navigation, and Material Design implementation.",
    skills: [
      "Kotlin",
      "Jetpack Compose",
      "Material Design",
      "Android Studio",
      "MVVM",
    ],
    duration: "8 weeks",
    verifyUrl: "https://www.dicoding.com/certificates/81PZLGL38ZQY",
    credentialUrl: "https://www.dicoding.com/certificates/81PZLGL38ZQY",
  },
  {
    id: 4,
    title: "Full Stack Web Development Bootcamp",
    organization: "BangKit Academy",
    image: "/api/placeholder/800/600",
    type: "Professional",
    category: "Frontend",
    issueDate: "March 2025",
    code: "FSWDB2025-456",
    bgColor: "from-orange-400 to-red-600",
    description:
      "Intensive bootcamp covering full-stack web development from front-end to back-end, with hands-on projects and industry mentorship.",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "CI/CD"],
    duration: "12 weeks",
    verifyUrl: "https://verify.bangkit.academy/FSWDB2025-456",
    credentialUrl: "https://certificates.bangkit.academy/FSWDB2025-456",
  },
  {
    id: 5,
    title: "Cloud Computing Fundamentals",
    organization: "Google Cloud",
    image: "/api/placeholder/800/600",
    type: "Course",
    category: "Cloud",
    issueDate: "February 2025",
    code: "GCP-CC-789",
    bgColor: "from-cyan-400 to-blue-600",
    description:
      "Comprehensive introduction to cloud computing concepts and Google Cloud Platform services, including compute, storage, and networking.",
    skills: [
      "Google Cloud Platform",
      "Cloud Architecture",
      "Compute Engine",
      "Cloud Storage",
      "Networking",
    ],
    duration: "6 weeks",
    verifyUrl:
      "https://www.cloudskillsboost.google/public_profiles/verify/GCP-CC-789",
    credentialUrl:
      "https://www.cloudskillsboost.google/public_profiles/GCP-CC-789",
  },
  {
    id: 6,
    title: "UI/UX Design Mastery",
    organization: "Design Academy",
    image: "/api/placeholder/800/600",
    type: "Course",
    category: "Design",
    issueDate: "December 2024",
    code: "UIUX-2024-321",
    bgColor: "from-pink-400 to-rose-600",
    description:
      "Advanced UI/UX design course covering user research, wireframing, prototyping, and usability testing with industry-standard tools.",
    skills: [
      "Figma",
      "User Research",
      "Wireframing",
      "Prototyping",
      "Usability Testing",
      "Design Systems",
    ],
    duration: "10 weeks",
    verifyUrl: "https://verify.designacademy.com/UIUX-2024-321",
    credentialUrl: "https://certificates.designacademy.com/UIUX-2024-321",
  },
];
