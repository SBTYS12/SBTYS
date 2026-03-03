export interface Project {
  id: number;
  name: string;
  technologies: string[];  
  description: string;
  videoUrl?: string;           
  images?: string[];            
  thumbnailUrl?: string | null;
}

export interface Resume {
  id: number;
  name: string;
  role: string;
  description: string;
  skills: string[];
  resumeUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Meet with agents",
    technologies: ["Next.js", "React", "Tailwind CSS", "Node.js", "Drizzle ORM","Neon Database","Stream Video SDK","Stream Chat SDK","OpenAI ","Better Auth"],
    description: "This project is an AI-powered video call platform that enables real-time meetings enhanced with intelligent AI agents. During meetings, AI agents generate transcripts, summaries, and provide contextual insights, allowing users to review key points and interact with an AI Q&A post-meeting. The platform also supports secure authentication, subscription management, and a fully responsive user interface for seamless experience across devices. It demonstrates the integration of AI, real-time communication, and full-stack web development in a production-ready application.",
    videoUrl: "/projects/MeetAI.mp4",
    thumbnailUrl: "https://github.com/SBTYS12/Meet-with-agents",
  },
  {
    id: 2,
    name: "Projects Management",
    technologies: ["Next.js", "React", "Node.js", "MongoDB", "Docker", "HTML & CSS"],
    description: "A full-stack project management application built with the MERN stack. The platform enables users to create dedicated workspaces, manage multiple projects, and collaborate with team members in real time. Each project contains structured tasks with priority levels, deadlines, status tracking, and progress indicators to ensure efficient workflow management. Interactive dashboards and productivity charts provide clear insights into team performance, helping organizations monitor activity, identify bottlenecks, and improve overall efficiency.",
    videoUrl: "/projects/ManagmentProject.mp4",
    thumbnailUrl: "https://github.com/SBTYS12/Project-management",
  },
  {
    id: 3,
    name: "G-Food-Delivery",
    technologies: ["React JS", "Express", "Node.js", "MongoDB", "Stripe", "HTML & CSS"],
    description: "This project is a complete food ordering web application, allowing users to browse a menu, add items to their cart, and place orders online with integrated payment. The app includes both a customer-facing front-end and an admin dashboard to manage products and track orders. Users can create accounts, log in securely, track order statuses, and pay online via Stripe. The application is fully responsive, providing a smooth experience on both desktop and mobile devices.",
    images: ["/projects/G-Delivery-food/1.png", "/projects/G-Delivery-food/2.png", "/projects/G-Delivery-food/3.png", "/projects/G-Delivery-food/4.png", "/projects/G-Delivery-food/5.png", "/projects/G-Delivery-food/6.png", "/projects/G-Delivery-food/7.png", "/projects/G-Delivery-food/8.png", "/projects/G-Delivery-food/9.png", "/projects/G-Delivery-food/10.png"],
    thumbnailUrl: "https://github.com/SBTYS12/Food-Delivery-",
  }
];

export const resumes: Resume[] = [
  {
    id: 1,
    name: "Sinda Ben Samir",
    role: "Data & AI Engineer",
    description: "Passionate about extracting insights from data and building predictive models.",
    skills: ["Python", "Pandas", "TensorFlow", "PyTorch", "SQL", "Power BI","Langchain"],
    resumeUrl: "/resumes/CV_BENSAMIR_sinda.pdf",
  },
  {
    id: 2,
    name: "Tesnim Younes",
    role: "AI & Software Engineer",
    description: "Specialized in scalable backend architectures and intelligent software solutions.",
    skills: ["FastAPI", "Next.js", "React", "Node.js", "MongoDB", "Docker", "HTML & CSS", "javascript"],
    resumeUrl: "/resumes/cv_Younes_Tesnime.pdf",
  }
];
