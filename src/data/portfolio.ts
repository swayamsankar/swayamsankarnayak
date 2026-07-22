import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";


export type Service = { number: string; title: string; description: string };
export type WebProject = { title: string; category: string; image: string; url: string };
export type TechProject = {
  title: string;
  description: string;
  stack: string[];
  live: string;
  repo: string;
};
export type GalleryItem = {
  title: string;
  category: string;
  image: string;
  orientation?: "portrait" | "landscape" | "square";
};
export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
};

export const services: Service[] = [
  { number: "01", title: "Branding", description: "Identity systems that make you unmistakable." },
  { number: "02", title: "Web Design", description: "Sites engineered to convert, not just impress." },
  { number: "03", title: "Development", description: "Fast, typed, production-ready front-ends." },
  { number: "04", title: "UI / UX", description: "Interfaces users actually enjoy returning to." },
  { number: "05", title: "Motion", description: "Movement that guides attention, not distracts." },
];

export const webProjects: WebProject[] = [
  { title: "ProductPulse", category: "Analytics & Experimentation", image: "/assets/web-productpulse.png", url: "https://github.com/swayamsankar/ProductPulse-Product-Analytics-Experimentation-Platform" },
  { title: "Thrilling Frames", category: "Photography Event Booking", image: "/assets/web-thrillingframes.png", url: "#" },
  { title: "Gastronome", category: "Restaurant Website", image: "/assets/web-gastronome.png", url: "https://github.com/swayamsankar/restaurant-website" },
];


export const techProjects: TechProject[] = [
  {
    title: "Expense Intelligence AI",
    description:
      "Full-stack MERN + AI smart expense tracker with a React/Vite frontend and Node/Express/MongoDB Atlas backend. Features total spent/income tracking, savings goals, spending trend charts, category breakdown, budget risk score, and AI-powered expense categorization, financial insights, and risk prediction via OpenAI.",
    stack: ["React", "Node", "Express", "MongoDB", "AI", "Vite", "Recharts"],
    live: "#",
    repo: "https://github.com/swayamsankar/Expense_Intelligence_Ai",
  },
  {
    title: "QuizKit — Full Stack Quiz Platform",
    description:
      "Full-stack quiz platform with a Spring Boot backend and React frontend. Features JWT authentication, role-based access control, quiz attempts with scoring, result history, profile management, and an admin panel for dynamic question management.",
    stack: ["Java", "Spring Boot", "SQL", "JWT", "Figma"],
    live: "#",
    repo: "https://github.com/swayamsankar/quizkit_Web",
  },
  {
    title: "ProductPulse — Analytics & Experimentation",
    description:
      "Full-stack product analytics platform with JWT auth, funnel & retention analysis, feature adoption tracking, A/B experiments, and CSV event ingestion — powered by an AI-assisted insights layer.",
    stack: ["React", "TypeScript", "Node", "JWT", "MongoDB", "Figma", "AI"],
    live: "https://github.com/swayamsankar/ProductPulse-Product-Analytics-Experimentation-Platform",
    repo: "https://github.com/swayamsankar/ProductPulse-Product-Analytics-Experimentation-Platform",
  },
  {
    title: "Restaurant Website",
    description:
      "A full-stack restaurant platform with a Node.js/Express backend and MySQL database. Users can explore the menu, register and log in securely with JWT, place food orders, make table reservations, and view their personal profile — connected to a static HTML/CSS/JS frontend.",
    stack: ["HTML", "CSS", "JS", "Node", "SQL", "Express", "AI"],
    live: "#",
    repo: "https://github.com/swayamsankar/restaurant-website",
  },
  {
    title: "TaskSway — Kinetic Productivity Sanctuary",
    description:
      "Full-stack daily task management and productivity tracker with performance analytics, streak tracking, deep work sessions, JWT authentication, task CRUD, daily score calculations, and dark/light mode — built with React, Node, Express, and MongoDB.",
    stack: ["React", "Node", "Express", "MongoDB", "JWT", "AI"],
    live: "#",
    repo: "https://github.com/swayamsankar/Daily_Task_Tracker",
  },
  {
    title: "Factify — AI Fake News & Email Detection",
    description:
      "Deep learning system that classifies news articles as Real/Fake and detects Spam/Phishing emails with up to 98.7% accuracy. Built with a Hybrid LSTM–GRU architecture, Transformer models (mBERT/XLM-R), Explainable AI (LIME/SHAP), and a Flask web interface with Docker CI/CD.",
    stack: ["Python", "Deep Learning", "AI/ML", "Flask", "JWT", "AI"],
    live: "#",
    repo: "https://github.com/swayamsankar/Factify",
  },
];


export const galleryItems: GalleryItem[] = [
  { title: "CraveBox — Hot & Spicy", category: "Food & Packaging", image: "/assets/gallery-food-cravebox.png", orientation: "square" },
  { title: "Quick Bites Delivery", category: "Food & Packaging", image: "/assets/gallery-food-quickbites.png", orientation: "square" },
  { title: "Online Sale Campaign", category: "Food & Packaging", image: "/assets/gallery-food-onlinesale.png", orientation: "square" },
  { title: "Green Brew Café Label", category: "Food & Packaging", image: "/assets/gallery-pkg-greenbrew.png", orientation: "landscape" },
  { title: "Borcelle Energy Boost", category: "Branding", image: "/assets/gallery-brand-borcelle.png", orientation: "square" },
  { title: "AirPods Pro 3", category: "Branding", image: "/assets/gallery-brand-airpods.png", orientation: "landscape" },
  { title: "Lamarzorro Brewer", category: "Branding", image: "/assets/gallery-brand-lamarzorro.png", orientation: "portrait" },
  { title: "Smartphone New Arrival", category: "Branding", image: "/assets/gallery-brand-smartphone.png", orientation: "portrait" },
  { title: "Flavor Fusion Restaurant", category: "Logo", image: "/assets/gallery-logo-flavorfusion.png", orientation: "square" },
  { title: "Naturish Eats", category: "Logo", image: "/assets/gallery-logo-naturish.png", orientation: "square" },
  { title: "Gudu Shoes", category: "Logo", image: "/assets/gallery-logo-gudu.png", orientation: "square" },
  { title: "Oasis Collective", category: "Logo", image: "/assets/gallery-logo-oasis.png", orientation: "square" },
  { title: "ProductPulse Site", category: "Website", image: "/assets/web-productpulse.png", orientation: "landscape" },
  { title: "Thrilling Frames", category: "Website", image: "/assets/web-thrillingframes.png", orientation: "landscape" },
  { title: "Gastronome", category: "Website", image: "/assets/web-gastronome.png", orientation: "landscape" },
];

export const testimonials: Testimonial[] = [
  {
    name: "Tushar Mallick",
    role: "Student, C.V. Raman Global University",
    quote:
      "Swayam built a clean, responsive website with an intuitive user interface. He was quick to address feedback, implement improvements, and ensure a smooth user experience throughout the development process.",
    rating: 5,
    initials: "TM",
  },
  {
    name: "Sandip Rout",
    role: "Student, GIET University",
    quote:
      "I tested Swayam's Expense Tracker application and found it easy to use, responsive, and well-designed. The analytics features were useful, and his attention to detail made the overall experience seamless.",
    rating: 5,
    initials: "SR",
  },
  {
    name: "Sanket Dass",
    role: "Digital Creator",
    quote:
      "Swayam demonstrates great attention to detail and creates clean, responsive designs. His projects are visually appealing, user-friendly, and reflect a strong understanding of modern web development.",
    rating: 5,
    initials: "SD",
  },
  {
    name: "Aditya Nayak",
    role: "Working in Real Estate",
    quote:
      "The animations are smooth, the interface feels polished, and the responsive design works exceptionally well across devices. It's clear that Swayam focuses on both functionality and user experience.",
    rating: 5,
    initials: "AN",
  },
];

export const galleryCategories = ["All", "Food & Packaging", "Branding", "Logo", "Website"];
