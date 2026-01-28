export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  technologies: string[];
  status: "Completed" | "In Progress" | "Maintenance";
  year: string;
  features: string[];
  role: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-TICKET – Event Ticketing Platform 🎫🎉",
    description:
      "E-TICKET is a modern event ticketing platform that enables seamless event discovery, secure online ticket purchases, and digital QR code ticket management with real-time analytics.",
    longDescription:
      "**E-TICKET** is a modern digital event ticketing platform designed to streamline event discovery, ticket purchasing, and attendance management in one seamless experience. Users can easily browse and search for events, complete fast and secure ticket bookings with integrated Midtrans payments, and receive QR code–based e-tickets for reliable digital entry. For event organizers, the platform offers a real-time dashboard to track ticket sales and attendance efficiently, helping ensure smooth event operations. Built with scalability, security, and performance in mind, E-TICKET delivers a reliable solution for managing events of any size. 🚀",
    image: "/projects-1.png",
    category: "Full Stack",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma ORM",
      "PostgreSQL",
      "Tailwind CSS",
      "RESTful API",
      "JWT Authentication",
      "Midtrans Payment Gateway",
      "QR Code Generation",
      "Server Actions",
      "Zod Validation",
      "Axios / Fetch API",
      "Responsive Web Design",
      "Git & GitHub",
    ],
    status: "Completed",
    year: "2025",
    features: [
      "User authentication & authorization",
      "Event discovery with smart search and filters",
      "Online ticket booking & checkout",
      "Secure payment integration with Midtrans",
      "QR code–based e-ticket generation",
      "Digital ticket delivery",
      "Real-time sales & attendance dashboard",
      "Event management for organizers",
      "Responsive design for all devices",
    ],
    role: "Full Stack Developer",
  },
];
