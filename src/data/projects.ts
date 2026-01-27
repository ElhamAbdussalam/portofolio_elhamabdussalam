export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  status: "Completed" | "In Progress" | "Maintenance";
  year: string;
  features: string[];
  role: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce platform with payment integration and real-time inventory management.",
    longDescription:
      "A comprehensive e-commerce solution built with modern technologies. Features include user authentication, product management, shopping cart, payment gateway integration with Stripe, order tracking, and admin dashboard for managing inventory and orders. The platform is optimized for performance and SEO.",
    image: "/api/placeholder/800/600",
    category: "Full Stack",
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Stripe",
    ],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/username/project",
    status: "Completed",
    year: "2025",
    features: [
      "User authentication with JWT",
      "Product catalog with search and filters",
      "Shopping cart with real-time updates",
      "Payment integration with Stripe",
      "Order tracking system",
      "Admin dashboard",
    ],
    role: "Full Stack Developer",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates and team features.",
    longDescription:
      "A powerful task management solution designed for teams. Built with React and Firebase for real-time collaboration. Features include drag-and-drop task boards, team workspaces, deadline tracking, file attachments, and activity logs. Mobile-responsive design ensures productivity on any device.",
    image: "/api/placeholder/800/600",
    category: "Frontend",
    technologies: ["React", "Firebase", "Redux", "Material-UI", "WebSocket"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/username/project",
    status: "Completed",
    year: "2024",
    features: [
      "Real-time collaboration",
      "Drag-and-drop interface",
      "Team workspaces",
      "Deadline notifications",
      "File attachments",
      "Activity tracking",
    ],
    role: "Frontend Developer",
  },
  {
    id: 3,
    title: "Weather Forecast App",
    description:
      "Mobile weather application with location-based forecasts and severe weather alerts.",
    longDescription:
      "A beautiful and intuitive weather app built with React Native. Provides accurate weather forecasts, hourly and 7-day predictions, weather maps, and push notifications for severe weather alerts. Features beautiful animations and smooth transitions.",
    image: "/api/placeholder/800/600",
    category: "Mobile",
    technologies: [
      "React Native",
      "TypeScript",
      "Expo",
      "Weather API",
      "Redux",
    ],
    demoUrl: "https://demo.example.com",
    status: "In Progress",
    year: "2025",
    features: [
      "Location-based forecasts",
      "Hourly and 7-day predictions",
      "Weather maps",
      "Severe weather alerts",
      "Beautiful UI animations",
      "Offline mode",
    ],
    role: "Mobile Developer",
  },
  {
    id: 4,
    title: "AI Chat Assistant",
    description:
      "Intelligent chatbot powered by AI for customer support and general queries.",
    longDescription:
      "An AI-powered chatbot built using OpenAI API and modern web technologies. Features natural language processing, context awareness, multi-language support, and integration with various platforms. Includes admin panel for training and monitoring conversations.",
    image: "/api/placeholder/800/600",
    category: "AI/ML",
    technologies: [
      "Python",
      "FastAPI",
      "OpenAI API",
      "React",
      "Docker",
      "Redis",
    ],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/username/project",
    status: "Completed",
    year: "2024",
    features: [
      "Natural language processing",
      "Context-aware responses",
      "Multi-language support",
      "Admin training panel",
      "Analytics dashboard",
      "Platform integrations",
    ],
    role: "AI Developer",
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description:
      "Analytics dashboard for managing multiple social media accounts in one place.",
    longDescription:
      "A comprehensive social media management tool that aggregates data from multiple platforms. Features include scheduled posting, analytics tracking, engagement metrics, and competitor analysis. Built with modern technologies for fast performance and real-time updates.",
    image: "/api/placeholder/800/600",
    category: "Full Stack",
    technologies: [
      "Vue.js",
      "Node.js",
      "MongoDB",
      "Chart.js",
      "Twitter API",
      "Facebook API",
    ],
    demoUrl: "https://demo.example.com",
    status: "Maintenance",
    year: "2024",
    features: [
      "Multi-platform integration",
      "Scheduled posting",
      "Analytics and reporting",
      "Engagement tracking",
      "Competitor analysis",
      "Team collaboration",
    ],
    role: "Full Stack Developer",
  },
  {
    id: 6,
    title: "Portfolio Website Builder",
    description:
      "Drag-and-drop website builder for creating stunning portfolio websites.",
    longDescription:
      "A no-code solution for creating beautiful portfolio websites. Features drag-and-drop interface, customizable templates, SEO optimization, custom domain support, and analytics integration. Perfect for designers, developers, and creatives.",
    image: "/api/placeholder/800/600",
    category: "Frontend",
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
    ],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/username/project",
    status: "In Progress",
    year: "2025",
    features: [
      "Drag-and-drop builder",
      "Customizable templates",
      "SEO optimization",
      "Custom domain support",
      "Analytics integration",
      "Export to code",
    ],
    role: "Frontend Developer",
  },
];
