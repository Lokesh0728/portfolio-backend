/**
 * RAG Knowledge Base - Chunked Portfolio Documents
 * 
 * Why Chunking?
 * In RAG, we don't pass the whole book to the model. We divide knowledge into discrete,
 * focused "chunks" so we only retrieve and pay tokens for the specific information
 * relevant to the user's question.
 */

export const PORTFOLIO_CHUNKS = [
  {
    id: 'bio-overview',
    category: 'bio',
    title: 'Lokesh R - Profile & Introduction',
    content: `Lokesh R is a MERN Stack / Full Stack Developer based in Coimbatore, India. He builds modern, scalable web applications with React, Next.js, Node.js, Express, MongoDB, and REST APIs. He specializes in transforming complex Figma designs into responsive, pixel-perfect user interfaces using Tailwind CSS and Framer Motion. He is available for full-time roles, contracts, and remote work worldwide.`,
  },
  {
    id: 'skills-frontend',
    category: 'skills',
    title: 'Frontend Skills & Technologies',
    content: `Frontend Technical Skills: React (90%), Next.js (85%), JavaScript ES6+ (90%), Tailwind CSS (95%), HTML5 & CSS3 (95%). Experience with responsive web design, interactive UI animations with Framer Motion, state management, component architecture, and modern CSS utilities.`,
  },
  {
    id: 'skills-backend',
    category: 'skills',
    title: 'Backend Skills & Database Architecture',
    content: `Backend Technical Skills: Node.js (85%), Express.js (85%), RESTful API design & integration (90%), JWT role-based authentication (80%), and MongoDB database modeling (80%). Experienced in middleware development, rate limiting, and CORS security.`,
  },
  {
    id: 'skills-tools',
    category: 'skills',
    title: 'Tools, Platforms & Currently Exploring',
    content: `Development Tools & Ecosystem: Git, GitHub, VS Code, Postman, Figma, Vercel. Currently exploring and learning: AWS cloud, Docker containerization, TypeScript, and System Design concepts.`,
  },
  {
    id: 'project-hirehub',
    category: 'projects',
    title: 'Project - HireHub Full Stack Job Portal',
    content: `HireHub is a full-stack job portal built with React, Express, MongoDB, and Tailwind CSS. Features role-based authentication for candidates and recruiters, secure JWT sessions, protected API routes, and a dedicated recruiter dashboard for posting and tracking job applications. Live demo: https://hire-hub-seven-beige.vercel.app/login | GitHub: https://github.com/Lokesh0728/HireHub`,
  },
  {
    id: 'project-gloshipping',
    category: 'projects',
    title: 'Project - GLOshipping Logistics Application',
    content: `GLOshipping is a modern logistics web application built with Next.js, Tailwind CSS, and Framer Motion. Features responsive service pages with advanced micro-animations and scalable layout architecture converted directly from intricate Figma designs. GitHub: https://github.com/Lokesh0728`,
  },
  {
    id: 'project-cigar',
    category: 'projects',
    title: 'Project - Custom Cigar & Tobacco Landing Page',
    content: `Custom Cigar & Tobacco is a premium brand landing page engineered with HTML5, JavaScript, and Tailwind CSS. Emphasizes luxury typography, smooth scrolling interactions, and elegant digital presentation for a custom cigar lounge. Live demo: https://custom-cigar-and-tobbaco.vercel.app/ | GitHub: https://github.com/Lokesh0728/custom-cigar-and-tobbaco`,
  },
  {
    id: 'project-invitation',
    category: 'projects',
    title: 'Project - Digital Marriage Invitation Platform',
    content: `Digital Marriage Invitation is an interactive personal web platform built with Next.js, MongoDB, and Tailwind CSS. Dynamically handles guest RSVP data while delivering an elegant, mobile-first responsive layout with personalized animations. Live demo: https://marriageinvitation-main-pxa8.vercel.app/ | GitHub: https://github.com/Lokesh0728/marriageinvitation.main`,
  },
  {
    id: 'project-jewellers',
    category: 'projects',
    title: 'Project - Trending Jewellers E-commerce',
    content: `Trending Jewellers is an interactive e-commerce web application built with React, Tailwind CSS, and REST API integrations. Features dynamic real-time product filtering, interactive image hovers, and responsive slider components. GitHub: https://github.com/Lokesh0728`,
  },
  {
    id: 'experience-xortican',
    category: 'experience',
    title: 'Experience - Frontend Developer at Xorticantechlogic',
    content: `Frontend Developer (Paid Intern) at Xorticantechlogic (May 2026 – Present). Responsibilities include developing scalable frontend architectures, collaborating on real-world client deliverables, and optimizing UI/UX with modern CSS frameworks and Framer Motion.`,
  },
  {
    id: 'experience-xplore',
    category: 'experience',
    title: 'Experience - MERN Stack Intern at Xplore Intellects',
    content: `MERN Stack Developer Intern at Xplore Intellects Pvt Ltd (Jan 2026 – Apr 2026, 3 months). Developed responsive and animated UI components using Next.js & React, collaborated on real-time client projects, and built hands-on expertise in REST API integration and Git collaborative workflows.`,
  },
  {
    id: 'education-kgisl',
    category: 'education',
    title: 'Education - MERN Stack Certification at KGiSL Micro College',
    content: `Completed intensive MERN Stack Development Certification at KGiSL Micro College (June 2025 – Dec 2025). Covered MongoDB, Express.js, React.js, Node.js, state management, REST API design, and production deployment.`,
  },
  {
    id: 'education-degree',
    category: 'education',
    title: 'Education - B.Sc Computer Science Degree',
    content: `Bachelor of Science (B.Sc) in Computer Science from Sri Ramakrishna Mission Vidyalaya College Of Arts And Science (2022 – 2025), Coimbatore. Built foundational knowledge in algorithms, database management, and computer programming.`,
  },
  {
    id: 'contact-details',
    category: 'contact',
    title: 'Contact Information & Social Profiles',
    content: `Contact Lokesh R: Email: lokeshrajesh002@gmail.com | Phone: +91 6382843058 | Location: Coimbatore, India. Social links: GitHub: https://github.com/Lokesh0728 | LinkedIn: https://www.linkedin.com/in/lokesh015dev | Instagram: https://www.instagram.com/lokeymr_cat?igsh=NGhsMGV4NW0wdjk5`,
  },
];
