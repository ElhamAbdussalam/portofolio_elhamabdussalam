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
    image: "/sertifikat-9.png",
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
];
