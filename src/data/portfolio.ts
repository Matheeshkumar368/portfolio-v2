import type { LucideIcon } from 'lucide-react';
import {
  Code2,
  Database,
  Globe,
  ShieldCheck,
  Monitor,
  Network,
  GitBranch,
  Boxes,
} from 'lucide-react';

export type SkillCategory =
  | 'Languages'
  | 'Backend & Frameworks'
  | 'Web Development'
  | 'Databases'
  | 'Security'
  | 'Tools & Operations';

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: LucideIcon;
  note?: string;
}

export const SKILLS: Skill[] = [
  { name: 'Java', category: 'Languages', icon: Code2, note: 'Core language (Java 21)' },
  { name: 'JavaScript', category: 'Languages', icon: Code2 },
  { name: 'Spring Boot', category: 'Backend & Frameworks', icon: Boxes, note: 'v4.0.4' },
  { name: 'Spring Security', category: 'Security', icon: ShieldCheck, note: 'JWT-based auth' },
  { name: 'Spring Data JPA', category: 'Backend & Frameworks', icon: Boxes },
  { name: 'Hibernate', category: 'Backend & Frameworks', icon: Boxes },
  { name: 'JWT Authentication', category: 'Security', icon: ShieldCheck, note: 'Stateless auth' },
  { name: 'React.js', category: 'Web Development', icon: Globe },
  { name: 'Node.js', category: 'Web Development', icon: Globe },
  { name: 'REST APIs', category: 'Web Development', icon: Globe, note: 'Design & consumption' },
  { name: 'MySQL', category: 'Databases', icon: Database, note: 'MySQL 8' },
  { name: 'Git', category: 'Tools & Operations', icon: GitBranch },
  { name: 'Maven', category: 'Tools & Operations', icon: Boxes, note: 'Maven Wrapper' },
  { name: 'Windows', category: 'Tools & Operations', icon: Monitor, note: 'IT Environment' },
  { name: 'Basic Networking', category: 'Tools & Operations', icon: Network, note: 'Network Fundamentals' },
];

export interface ProjectLink {
  label: string;
  url: string | null;
  kind: 'github' | 'demo';
}

export interface ProjectFeature {
  title: string;
  description: string;
  verified: boolean;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  cover: string;
  image: string;
  accent: [string, string];
  problem: string;
  solution: string;
  technologies: string[];
  features: ProjectFeature[];
  links: ProjectLink[];
  context: string;
  status: string;
  contentStatus: 'placeholder' | 'partial' | 'verified';
}

export const PROJECTS: Project[] = [
  {
    id: 'disaster-alert',
    name: 'Disaster Management and Alert System',
    tagline: 'Infosys Springboard 6.0 internship project',
    cover: 'disaster',
    image: '/assets/projects/disaster_map.jpg',
    accent: ['#f9621a', '#1a0a14'],
    problem:
      'During disasters, affected people need a fast, reliable way to report emergencies and receive official alerts, while administrators require a centralized dashboard to track and coordinate incoming reports in real time.',
    solution:
      'A secure backend disaster management application built with Java 21 and Spring Boot, secured via Spring Security and JWT authentication with role-based access for Admins, Responders, and Citizens. Integrates official NDMA disaster alerts and manages reporting operations backed by MySQL 8.',
    technologies: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'MySQL 8', 'Maven'],
    features: [
      {
        title: 'JWT-secured role authentication',
        description:
          'Stateless authentication using Spring Security and JWT tokens, separating Admin, Responder, and Citizen privileges.',
        verified: true,
      },
      {
        title: 'Official NDMA disaster alerts',
        description:
          'Integrated NDMA disaster alerts providing users with verified, official disaster-related notices and advisories.',
        verified: true,
      },
      {
        title: 'Citizen reporting and dispatch',
        description:
          'Robust REST API endpoints enabling citizens to log disaster incidents and allowing emergency teams to respond promptly.',
        verified: true,
      },
      {
        title: 'Relational data operations',
        description:
          'Optimized MySQL 8 database operations ensuring reliable persistence for user accounts, incident reports, and system logs.',
        verified: true,
      },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/Matheeshkumar368/Disaster-Management-Alert-System-', kind: 'github' },
      { label: 'Live demo', url: null, kind: 'demo' },
    ],
    context: 'Infosys Springboard 6.0',
    status: 'Java Spring Boot · REST APIs',
    contentStatus: 'verified',
  },
  {
    id: 'alumni-platform',
    name: 'Alumni Association Platform',
    tagline: 'Academic networking & mentorship platform',
    cover: 'alumni',
    image: '/assets/projects/alumni_network.jpg',
    accent: ['#4db5e8', '#0a1020'],
    problem:
      'Institutional alumni communities and graduating students often lack a unified, secure portal to discover mentors, share career opportunities, and collaborate on industry internships.',
    solution:
      'A comprehensive web platform dedicated to alumni engagement and student mentorship. Designed with React.js on the frontend and Node.js on the backend, using salted bcrypt hashing and JWT tokens for secure authentication.',
    technologies: ['React.js', 'Node.js', 'JWT', 'bcrypt', 'REST APIs', 'MySQL'],
    features: [
      {
        title: 'Alumni directory & search',
        description:
          'Searchable database of graduates classified by graduation year, industry domain, and professional specialization.',
        verified: true,
      },
      {
        title: 'Mentorship inquiry system',
        description:
          'Facilitates direct mentorship requests from current students to alumni mentors with status tracking.',
        verified: true,
      },
      {
        title: 'Job & internship opportunities',
        description:
          'Centralized job board where alumni can post verified career openings and internships for college students.',
        verified: true,
      },
      {
        title: 'Collaborative interface architecture',
        description:
          'Engineered responsive interface structures and project presentation workflows in close team collaboration.',
        verified: true,
      },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/Matheeshkumar368/', kind: 'github' },
      { label: 'Live demo', url: null, kind: 'demo' },
    ],
    context: 'Academic project',
    status: 'Full Stack React & Node',
    contentStatus: 'verified',
  },
  {
    id: 'habitra',
    name: 'Habitra',
    tagline: 'Local-first pixel-art productivity & habit tracker',
    cover: 'habitra',
    image: '/assets/projects/habitra_study.jpg',
    accent: ['#f9621a', '#1a1020'],
    problem:
      'Habit tracking tools often force mandatory cloud logins, expensive subscriptions, and intrusive tracking onto individuals seeking a peaceful, private routine.',
    solution:
      'Habitra is a local-first, offline-capable productivity sanctuary with 100% data persistence stored locally via IndexedDB. Transforms daily habits into an engaging digital world with pixel art, ambient soundscapes, and focus timers.',
    technologies: ['React', 'JavaScript', 'Node.js', 'IndexedDB', 'WebAudio'],
    features: [
      {
        title: 'Living pixel-art environment',
        description:
          'Interactive world with dynamic weather states, time-of-day illumination, and Progress Garden unlockables.',
        verified: true,
      },
      {
        title: 'Local-first zero-telemetry persistence',
        description:
          'All user habits, goals, and timer histories save instantly and securely to client-side IndexedDB.',
        verified: true,
      },
      {
        title: 'Ambient audio studio & focus timer',
        description:
          'Bundled ambient procedural synths and customizable timer sessions tailored for deep work.',
        verified: true,
      },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/Matheeshkumar368/Habitra_PersonalWebsite', kind: 'github' },
      { label: 'Live demo', url: null, kind: 'demo' },
    ],
    context: 'Personal project',
    status: 'Desktop & Web Application',
    contentStatus: 'verified',
  },
];

export interface EducationRecord {
  degree: string;
  institution: string;
  period: string;
  score: string;
  type: string;
  details: string;
  verified: boolean;
}

export const EDUCATION_HISTORY: EducationRecord[] = [
  {
    degree: 'Bachelor of Technology (B.Tech) – Computer Science and Business Systems',
    institution: 'VSB Engineering College, Karur, India (Anna University)',
    period: '2023 – 2027',
    score: 'CGPA: 7.97',
    type: 'Full-time',
    details: 'Rigorous curriculum integrating computer science engineering, Java enterprise systems, database management, and business analytics.',
    verified: true,
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Sakthi Sai Matriculation Higher Secondary School, Ayyalur, Tamil Nadu',
    period: '2022 – 2023',
    score: '78.33%',
    type: 'Full-time',
    details: 'Completed higher secondary education with strong fundamentals in Mathematics, Physics, Chemistry, and Computer Science.',
    verified: true,
  },
  {
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'Sakthi Sai Matriculation Higher Secondary School, Ayyalur, Tamil Nadu',
    period: '2020 – 2021',
    score: '100% (Centum Distinction)',
    type: 'Full-time',
    details: 'Achieved flawless 100% score across all subjects in state board examinations.',
    verified: true,
  },
];

export interface ExperienceRecord {
  title: string;
  organization: string;
  period: string;
  roleType: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  verified: boolean;
}

export const EXPERIENCE_HISTORY: ExperienceRecord[] = [
  {
    title: 'Full Stack Web Development Intern',
    organization: 'Brainery Spot Technology',
    period: 'Internship',
    roleType: 'Technical Internship',
    summary: 'Hands-on practical development of responsive frontend interfaces and backend API integrations.',
    highlights: [
      'Gained foundational knowledge of frontend and backend web development paradigms.',
      'Learned how client-side and server-side components interact reliably in modern web applications.',
      'Constructed responsive user interfaces and handled asynchronous data fetching workflows.',
    ],
    technologies: ['React.js', 'JavaScript', 'HTML5/CSS3', 'REST APIs'],
    verified: true,
  },
  {
    title: 'Digital Marketing with AI Intern',
    organization: 'Brainery Spot Technology',
    period: 'Internship',
    roleType: 'AI & Systems',
    summary: 'Exploration of AI tools, search engine optimization, and automated digital workflows.',
    highlights: [
      'Learned fundamentals of technical SEO, content architecture, and digital audience reach.',
      'Explored the use of AI tools for marketing strategies, analytics dashboards, and content workflows.',
      'Applied systematic optimization techniques to technical documentation and visibility.',
    ],
    technologies: ['SEO Strategies', 'AI Tools', 'Data Analytics'],
    verified: true,
  },
  {
    title: 'Infosys Springboard 6.0 Project Intern',
    organization: 'Infosys Springboard',
    period: 'Internship Program',
    roleType: 'Java Backend Engineering',
    summary: 'Developed the Disaster Management and Alert System with secure Java Spring Boot services.',
    highlights: [
      'Developed a Java and Spring Boot application with JWT-based authentication and role-based access control.',
      'Integrated NDMA disaster alerts to deliver verified alerts to responders and citizens.',
      'Engineered REST APIs and database operations in MySQL with Maven build automation.',
    ],
    technologies: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'MySQL 8', 'Maven'],
    verified: true,
  },
];

export interface CertificationRecord {
  title: string;
  issuer: string;
  date: string;
  credentialNote?: string;
  skills: string[];
  verified: boolean;
}

export const CERTIFICATIONS_LIST: CertificationRecord[] = [
  {
    title: 'TechA Java Full Stack Developer Certification',
    issuer: 'Infosys Springboard',
    date: 'June 2025',
    credentialNote: 'Comprehensive certification covering full-stack Java architecture, Spring microservices, and databases.',
    skills: ['Java 21', 'Spring Boot', 'REST APIs', 'Full Stack Architecture'],
    verified: true,
  },
  {
    title: 'Learning Full Stack Development',
    issuer: 'Infosys Springboard',
    date: 'June 2025',
    credentialNote: 'Advanced coursework in modern client-server architectures and enterprise application patterns.',
    skills: ['Full Stack Development', 'API Design', 'System Integration'],
    verified: true,
  },
  {
    title: 'Salesforce Administrator Explorer',
    issuer: 'FutureSkills Prime / Salesforce',
    date: 'November 2025',
    credentialNote: 'Validation of Salesforce cloud administration, security, user management, and operational workflows.',
    skills: ['Salesforce CRM', 'Cloud Operations', 'Security & Access Control'],
    verified: true,
  },
  {
    title: 'Java Foundation Certification',
    issuer: 'Infosys Springboard',
    date: 'August 2024',
    credentialNote: 'Foundational certification validating core Java, OOP paradigms, collections, and algorithms.',
    skills: ['Core Java', 'OOP', 'Data Structures', 'Problem Solving'],
    verified: true,
  },
];

export const PROFILE = {
  name: 'Matheeshkumar S',
  title: 'Java Developer | IT Operations Enthusiast',
  education: 'B.Tech Computer Science and Business Systems (CSBS)',
  college: 'VSB Engineering College, Karur (Anna University)',
  cgpa: '7.97',
  location: 'Dindigul, Tamil Nadu',
  phone: '+91 9360919787',
  intro:
    'Computer Science and Business Systems undergraduate with foundational knowledge of Java, SQL, operating systems, and application development. Hands-on experience in REST APIs, database management, and JWT-secured microservices, with enthusiasm for IT operations, infrastructure, and technology services.',
  links: {
    github: 'https://github.com/Matheeshkumar368/',
    linkedin: 'https://www.linkedin.com/in/matheeshkumar-s/',
    leetcode: 'https://leetcode.com/u/MATHEESHKUMAR_S/',
    email: 'matheeshkumar2@gmail.com',
    resumeUrl: '/assets/aistudio/Matheeshkumar_Resume_f2e60f73.pdf',
  },
};

export const NAV_SECTIONS = [
  { id: 'about', label: 'About', icon: 'user' as const },
  { id: 'skills', label: 'Skills', icon: 'sparkles' as const },
  { id: 'projects', label: 'Projects', icon: 'folder' as const },
  { id: 'education', label: 'Education', icon: 'graduation' as const },
  { id: 'experience', label: 'Experience', icon: 'briefcase' as const },
  { id: 'certifications', label: 'Certifications', icon: 'award' as const },
  { id: 'resume', label: 'Resume', icon: 'file' as const },
  { id: 'contact', label: 'Contact', icon: 'mail' as const },
] as const;

export type SectionId = (typeof NAV_SECTIONS)[number]['id'];
