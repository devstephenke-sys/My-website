import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowUpRight,
  MapPin,
  Clock,
  Sparkles,
  Phone,
  BookOpen,
  BrainCircuit,
  Database,
  Home as HomeIcon,
  User,
  Wrench,
  Briefcase,
  Send,
  Download,
  Award,
  TrendingUp,
  MessageSquare,
  FileText,
  GraduationCap,
  Layers,
  Rocket,
  HeartHandshake,
  LineChart,
  School,
  Leaf,
  Cpu,
  Globe2,
  Workflow,
  Lightbulb
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const GITHUB = "https://github.com/devstephenke-sys";
const LINKEDIN = "https://www.linkedin.com/in/stephen-mwangi-bb39713a8/";
const EMAIL = "devstephen.ke@gmail.com";
const PHONE = "+254 745 534 836";

// --- Shared Components ---

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="w-full"
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <h2 className="text-4xl md:text-6xl font-serif italic tracking-tight mb-4">{title}</h2>
    {subtitle && <p className="text-xl text-brand-text-dim max-w-2xl font-light">{subtitle}</p>}
  </div>
);

const BentoCard = ({
  children,
  className,
  title,
  subtitle,
  icon: Icon
}: {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: any;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    className={cn("glass glass-hover p-6 flex flex-col gap-4 relative group", className)}
  >
    {(title || Icon) && (
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-brand-text-dim" />}
          {title && <h3 className="text-xs font-mono uppercase tracking-widest text-brand-text-dim">{title}</h3>}
        </div>
        {subtitle && <span className="text-[10px] font-mono text-brand-text-dim/50 uppercase">{subtitle}</span>}
      </div>
    )}
    {children}
  </motion.div>
);

const Tag = ({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "emerald" | "amber" | "violet" }) => {
  const tones: Record<string, string> = {
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    violet: "bg-violet-500/10 border-violet-500/20 text-violet-400"
  };
  return (
    <span className={cn("text-[10px] font-mono px-2 py-1 rounded-full border", tones[tone])}>
      {children}
    </span>
  );
};

const ProjectCard = ({
  title,
  description,
  tags,
  link,
  kind,
  highlights
}: {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  kind: string;
  highlights?: string[];
}) => {
  const inner = (
    <div className="glass glass-hover p-6 flex flex-col gap-4 h-full group/project">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">{kind}</span>
          <h4 className="font-medium text-lg mt-1 group-hover/project:text-blue-300 transition-colors">{title}</h4>
        </div>
        {link && <ArrowUpRight className="w-4 h-4 text-brand-text-dim group-hover/project:translate-x-0.5 group-hover/project:-translate-y-0.5 transition-transform shrink-0" />}
      </div>
      <p className="text-sm text-brand-text-dim leading-relaxed flex-grow">{description}</p>
      {highlights && highlights.length > 0 && (
        <ul className="space-y-1.5">
          {highlights.map((h, i) => (
            <li key={i} className="text-xs text-brand-text-dim flex gap-2">
              <span className="text-blue-400">▸</span> {h}
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap gap-2 pt-2">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">{inner}</a>
  ) : (
    inner
  );
};

// --- Data ---

const experiences = [
  {
    role: "E-learning Developer",
    org: "Don Bosco Tech Africa (DBTA)",
    period: "Jan 2026 – Present",
    location: "Nairobi, Kenya · Full-time",
    current: true,
    points: [
      "Develop and manage digital learning platforms and technology-enabled training solutions supporting TVET institutions and programmes.",
      "Design and develop interactive digital and blended-learning materials for technical and vocational education.",
      "Support LMS administration, learning content development, platform improvement and digital learning implementation.",
      "Work with institutional and programme data to support reporting, monitoring and evidence-based decision-making.",
      "Collaborate with stakeholders to translate training and operational requirements into practical digital solutions."
    ]
  },
  {
    role: "Data Analyst",
    org: "Don Bosco Tech Africa (DBTA)",
    period: "Aug 2025 – Present",
    location: "Kenya · Hybrid",
    current: true,
    points: [
      "Perform data cleaning, validation, organisation and management to improve data quality and reliability.",
      "Analyse institutional and programme datasets to identify patterns, trends and actionable insights.",
      "Develop data visualisations, dashboards and analytical reports to support programme monitoring and management decisions.",
      "Apply Python-based analytical workflows and explore AI/ML modelling techniques for data-driven solutions.",
      "Transform raw data into structured information for reporting and institutional planning."
    ]
  },
  {
    role: "Founder & ICT Digital Solutions Consultant",
    org: "Nuru Systems & Consultancy",
    period: "Jan 2026 – Present",
    location: "Nairobi County · Self-employed · Hybrid",
    current: true,
    points: [
      "Founded a digital solutions consultancy helping organisations and businesses use technology to improve operations, communication and decision-making.",
      "Provide ICT consultancy, web development, database management, data analytics and digital transformation support.",
      "Design and develop institutional websites, management systems, dashboards, evaluation platforms and customised digital applications.",
      "Support hosting, deployment, system planning, workflow automation and technology adoption."
    ]
  },
  {
    role: "Senior Software Engineer",
    org: "Kussala Institute",
    period: "Jan 2026 – Aug 2026",
    location: "Nairobi County · Part-time · Remote",
    current: false,
    points: [
      "Developed the Kussala Institute digital platform and institutional website to strengthen the organisation's online presence.",
      "Designed a responsive, user-friendly platform communicating the institute's mission, programmes, initiatives, partnerships and impact.",
      "Structured content to make institutional information accessible to learners, refugees, migrants, partners and the wider community."
    ]
  },
  {
    role: "Senior Web Designer",
    org: "St. John's Yambio Campus — Catholic University of South Sudan",
    period: "Jan 2026 – Aug 2026",
    location: "Remote",
    current: false,
    points: [
      "Designed and developed a modern, responsive institutional website for St. John's Yambio Campus.",
      "Created a digital platform presenting academic programmes, admissions, campus news, events, departments and student resources.",
      "Focused on usability, accessibility, institutional communication and professional online representation."
    ]
  },
  {
    role: "E-learning Intern",
    org: "Don Bosco Tech Africa (DBTA)",
    period: "Feb 2025 – Dec 2025",
    location: "Kilimani, Adams, Nairobi · On-site",
    current: false,
    points: [
      "Supported the development, organisation and management of digital learning content.",
      "Assisted with e-learning platform activities, instructional technology and digital training support.",
      "Contributed to data-related and digital learning workflows, including data engineering support.",
      "Worked with the team to improve the accessibility, organisation and delivery of learning resources."
    ]
  }
];

const projects = [
  {
    title: "Smart Farmer Management System",
    kind: "Personal Project",
    description:
      "A digital agriculture management platform concept designed to centralise farmer, farm, crop and production information. Supports farmer registration, farm profiles, crop management, production records, input and inventory tracking, task management, harvest records, market information, weather monitoring, dashboards and reporting.",
    tags: ["Agriculture", "Dashboards", "Data Systems", "Python"],
    highlights: ["Improves recordkeeping and operational efficiency", "Data-informed agricultural decision-making"]
  },
  {
    title: "TVET Management Information System",
    kind: "Institutional MIS",
    description:
      "A digital management system initiative designed to centralise TVET centre information and institutional operations. The foundation includes structured data models, user roles, access controls and centre management capabilities, with planned modules covering staff, trades, partnerships, enrolments and student records.",
    tags: ["FastAPI", "PostgreSQL", "RBAC", "Institutional Systems"],
    highlights: ["Multi-level user roles and access controls", "Scales across TVET centres and countries"]
  },
  {
    title: "JSO Quality Manual Evaluation System",
    kind: "Digital Evaluation Platform",
    description:
      "A digital evaluation platform supporting structured assessment of institutional performance against quality indicators. Incorporates evaluation workflows, evidence management, role-based access, achievement-level calculations, dashboards and consolidated reporting across multiple organisational levels.",
    tags: ["Evaluation", "Dashboards", "Role-Based Access", "Reporting"]
  },
  {
    title: "DBTA GP2 Employer & Industry Survey Analysis",
    kind: "Data Science & Analytics",
    description:
      "Analysed employer and industry survey data covering 159 organisations across 10 countries. Work included data cleaning, analysis, visualisation and reporting to identify recruitment patterns, employer engagement, curriculum alignment, skills gaps and opportunities for stronger TVET-industry partnerships.",
    tags: ["Python", "Pandas", "Survey Analysis", "TVET"],
    link: "https://dbtagp2jsosurveyanalysis-2huah8psohhxgibwp4dprm.streamlit.app/"
  },
  {
    title: "Institutional Data Dashboards",
    kind: "Analytics & Decision Support",
    description:
      "Data dashboards and reporting solutions that organise institutional information and improve visibility of programme and centre-level data. Applied data preparation, analytical workflows and visualisation techniques to support evidence-based management.",
    tags: ["Streamlit", "Data Visualisation", "Reporting"]
  },
  {
    title: "DataVault — Mobile Data Research Platform",
    kind: "Research & Software Development",
    description:
      "An exploratory software project investigating the technical concepts behind transferable, storable and reusable mobile internet data. The prototype research explores simulated operator environments, service interfaces, device simulation and API-based system components.",
    tags: ["Research", "APIs", "Simulation", "Networking"]
  },
  {
    title: "Duka Ledger — WhatsApp Business Ledger",
    kind: "Software Development",
    description:
      "A digital business-recordkeeping concept exploring WhatsApp-based sales and ledger management. Investigates message-based data capture, automated parsing and structured business record management to simplify transaction recording for small businesses.",
    tags: ["WhatsApp API", "NLP", "Webhooks", "SME Tools"]
  },
  {
    title: "YuvalRE — Real Estate SaaS",
    kind: "Independent Platform",
    description:
      "A multi-tenant real estate SaaS platform with PostgreSQL + PostGIS, Redis and Docker. Features organisation-based data isolation, authentication and authorisation, property listings, buyer/seller workflows, leads and inquiries, and viewing/deal management.",
    tags: ["PostgreSQL", "PostGIS", "Redis", "Docker", "SaaS"]
  },
  {
    title: "Kussala Institute Digital Platform",
    kind: "Institutional Website",
    description:
      "A responsive digital platform for Kussala Institute for Strategic Leadership and Peacebuilding, communicating the institute's mission, programmes, initiatives, partnerships and impact to learners, refugees, migrants and partners.",
    tags: ["React", "Web Development", "Institutional"]
  },
  {
    title: "St. John's Yambio Campus Website",
    kind: "Institutional Website",
    description:
      "A modern, responsive institutional website for St. John's Yambio Campus of the Catholic University of South Sudan — academic programmes, admissions, news, events, departments and student resources, with a pathway toward future MIS capabilities.",
    tags: ["Web Development", "Higher Education", "South Sudan"]
  },
  {
    title: "Electrical Simulation & Virtual Lab",
    kind: "EdTech Concept",
    description:
      "An independent initiative exploring a web-based electrical learning and simulation environment where learners can interact with electrical components, construct circuits, perform experiments and understand electrical principles through virtual practical activities.",
    tags: ["EdTech", "Simulation", "Interactive Learning"]
  }
];

const skillGroups = [
  {
    title: "Data Science & AI",
    icon: BrainCircuit,
    items: ["Python", "Pandas", "NumPy", "EDA", "Machine Learning", "Predictive Modelling", "Neural Networks", "LLM Integration", "Data Visualisation"]
  },
  {
    title: "Data Engineering",
    icon: Database,
    items: ["Data Modelling", "Database Design", "Data Warehousing", "ETL Workflows", "SQL", "MySQL", "PostgreSQL", "SQLite"]
  },
  {
    title: "Software Engineering",
    icon: Wrench,
    items: ["Python", "PHP", "Laravel", "JavaScript", "React", "Next.js", "FastAPI", "Flask", "REST APIs", "System Architecture"]
  },
  {
    title: "E-learning Technology",
    icon: BookOpen,
    items: ["Moodle", "LearnDash", "Articulate Storyline", "Articulate Rise", "Instructional Design", "Digital Learning Content", "AI-assisted Learning"]
  },
  {
    title: "Dashboards & Analytics",
    icon: LineChart,
    items: ["Streamlit", "Data Visualisation", "Analytical Reporting", "Dashboard Development", "Excel", "Power BI"]
  },
  {
    title: "Web & ICT Solutions",
    icon: Globe2,
    items: ["HTML", "CSS", "Bootstrap", "Responsive Design", "WordPress", "Website Deployment", "ICT Consultancy", "Digital Transformation", "Workflow Automation", "Git", "GitHub", "Docker", "Jupyter", "VS Code"]
  }
];

const education = [
  {
    title: "Bachelor's Degree in Computer Science",
    org: "Rongo University, Kenya",
    period: "Sep 2019 – Dec 2022",
    note: "Academic foundation in computing, software development, information systems, programming, databases and computer science principles."
  },
  {
    title: "Certificate in Data Modeling, Warehousing & Database Administration",
    org: "Coursera",
    period: "Jan 2025 – Aug 2025",
    note: "Grade: 84 — data cleaning, Python analysis and modelling, feature prediction, visualisation, dashboards, Kaggle community participation."
  }
];

const certifications = [
  { name: "Data Modeling, Warehousing & Database Administration", org: "Coursera", year: "2025" },
  { name: "IBM Data Analysis Professional Certificate", org: "IBM", year: "2024" },
  { name: "Computer Packages Certificate", org: "Awake Computers", year: "—" }
];

const strengths = [
  { title: "Analytical Thinking", desc: "Turning complex datasets into meaningful information.", icon: LineChart },
  { title: "Technical Problem-Solving", desc: "Building practical solutions to real organisational challenges.", icon: Wrench },
  { title: "Digital Innovation", desc: "Applying emerging technologies to improve existing systems.", icon: Lightbulb },
  { title: "Communication & Collaboration", desc: "Working with teams and stakeholders to deliver useful solutions.", icon: HeartHandshake },
  { title: "Independent Execution", desc: "Taking ownership of projects from planning to implementation.", icon: Rocket },
  { title: "Continuous Learning", desc: "Continuously developing capabilities in AI, data and software.", icon: GraduationCap }
];

const interests = [
  "Artificial Intelligence & Machine Learning",
  "Data Science & Analytics",
  "Digital Transformation",
  "Education Technology",
  "TVET & Skills Development",
  "Learning Management Systems",
  "Smart Agriculture",
  "Information Systems",
  "Institutional Data Management",
  "Applied Software Engineering"
];

// --- Pages ---

const Home = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageWrapper>
      <div className="flex flex-col gap-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-blue-400 bg-blue-500/5 px-3 py-1 rounded-full border border-blue-500/10">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-tighter">Open to opportunities</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-mono uppercase tracking-tighter">Founder, Nuru Systems & Consultancy</span>
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif italic tracking-tight leading-none">
              Stephen <br /> Njuguna <span className="text-brand-text-dim">Mwangi</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-text-dim max-w-3xl font-light leading-relaxed">
              Data Scientist · E-learning Developer · Software Engineer · ICT Digital Solutions Consultant
            </p>
            <p className="text-lg text-brand-text-dim max-w-2xl font-light leading-relaxed">
              Technology, intelligence and digital systems — <span className="text-white">designed to make an impact.</span>
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`mailto:${EMAIL}`}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Hire Me
              </a>
              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download CV
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-2 text-right">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-text-dim">
              <MapPin className="w-3 h-3" /> Nairobi, Kenya
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-text-dim">
              <Clock className="w-3 h-3" /> {time.toLocaleTimeString()}
            </div>
            <div className="text-xs font-mono text-brand-text-dim/60 mt-4 max-w-[220px]">
              INTELLIGENCE. INNOVATION. IMPACT.
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BentoCard title="At a Glance" icon={Sparkles} className="h-full">
            <p className="text-lg text-brand-text-dim leading-relaxed">
              Computer Science graduate working at the intersection of <span className="text-white">data science</span>,{" "}
              <span className="text-white">artificial intelligence</span>, <span className="text-white">software engineering</span> and{" "}
              <span className="text-white">digital learning</span>.
            </p>
            <p className="text-sm text-brand-text-dim leading-relaxed">
              E-learning Developer & Data Analyst at Don Bosco Tech Africa; Founder of Nuru Systems & Consultancy.
            </p>
          </BentoCard>
          <BentoCard className="flex items-center justify-center text-center">
            <div>
              <div className="text-5xl font-serif italic mb-1 text-blue-400">6+</div>
              <div className="text-[10px] font-mono text-brand-text-dim uppercase tracking-widest">Roles & Ventures</div>
            </div>
          </BentoCard>
          <BentoCard className="flex items-center justify-center text-center">
            <div>
              <div className="text-5xl font-serif italic mb-1 text-blue-400">11</div>
              <div className="text-[10px] font-mono text-brand-text-dim uppercase tracking-widest">Selected Projects</div>
            </div>
          </BentoCard>
          <BentoCard className="flex items-center justify-center text-center">
            <div>
              <div className="text-5xl font-serif italic mb-1 text-blue-400">100+</div>
              <div className="text-[10px] font-mono text-brand-text-dim uppercase tracking-widest">TVET Centres Supported*</div>
            </div>
          </BentoCard>
        </div>
        <p className="text-[10px] font-mono text-brand-text-dim/50 -mt-6">*Through Don Bosco Tech Africa's network across ~40 African countries.</p>

        <BentoCard title="Professional Value" icon={TrendingUp}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Data Intelligence",
                desc: "Data cleaning, analysis, visualisation, modelling and reporting.",
                icon: LineChart,
                tone: "text-blue-400"
              },
              {
                title: "Digital Transformation",
                desc: "Institutional platforms, workflow improvement, e-learning and ICT consultancy.",
                icon: Workflow,
                tone: "text-emerald-400"
              },
              {
                title: "Software Development",
                desc: "Web applications, APIs, databases, dashboards and customised systems.",
                icon: Cpu,
                tone: "text-amber-400"
              }
            ].map((v) => (
              <div key={v.title} className="text-center space-y-2">
                <v.icon className={cn("w-6 h-6 mx-auto", v.tone)} />
                <h4 className="font-medium text-white">{v.title}</h4>
                <p className="text-sm text-brand-text-dim">{v.desc}</p>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>
    </PageWrapper>
  );
};

const About = () => (
  <PageWrapper>
    <SectionTitle
      title="About"
      subtitle="A technology professional working at the intersection of data science, AI, software engineering and digital learning."
    />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <BentoCard title="Professional Profile" icon={User}>
          <div className="space-y-4 text-lg text-brand-text-dim leading-relaxed">
            <p>
              I am a technology professional experienced in developing digital platforms, institutional management systems,
              data dashboards, e-learning solutions and customised software applications that help organisations improve
              their operations and make informed decisions.
            </p>
            <p>
              Currently serving as an E-learning Developer and Data Analyst at Don Bosco Tech Africa, contributing to
              digital learning, data management, analytics and technology-enabled programme delivery. I am also the Founder
              of Nuru Systems & Consultancy, providing ICT consultancy and digital solutions to organisations and businesses.
            </p>
            <p>
              I combine technical development capabilities with an understanding of institutional needs, data workflows,
              user experience and digital transformation — and I am particularly interested in applying AI, machine learning
              and data-driven systems to education, agriculture and organisational development.
            </p>
          </div>
        </BentoCard>

        <BentoCard title="Professional Experience" icon={Briefcase}>
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-8 border-l border-white/10">
                <div
                  className={cn(
                    "absolute left-[-5px] top-1 w-2 h-2 rounded-full",
                    exp.current ? "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" : "bg-white/20"
                  )}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="text-xl font-medium text-white">{exp.role}</h4>
                  <span className="text-xs font-mono text-blue-400">{exp.period}</span>
                </div>
                <p className="text-sm text-brand-text-dim font-mono mb-1">{exp.org}</p>
                <p className="text-xs text-brand-text-dim/60 font-mono mb-3">{exp.location}</p>
                <ul className="space-y-2">
                  {exp.points.map((p, j) => (
                    <li key={j} className="text-sm text-brand-text-dim leading-relaxed flex gap-2">
                      <span className="text-blue-400 shrink-0">▸</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>

      <div className="space-y-8">
        <BentoCard title="Education" icon={GraduationCap}>
          <div className="space-y-6">
            {education.map((ed, i) => (
              <div key={i}>
                <h4 className="font-medium text-white">{ed.title}</h4>
                <p className="text-sm text-brand-text-dim">{ed.org}</p>
                <p className="text-xs text-blue-400 font-mono">{ed.period}</p>
                <p className="text-xs text-brand-text-dim/70 mt-2 leading-relaxed">{ed.note}</p>
                {i < education.length - 1 && <div className="h-px bg-white/5 mt-6" />}
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard title="Certifications" icon={Award}>
          <div className="space-y-4">
            {certifications.map((c) => (
              <div key={c.name} className="p-3 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-sm font-medium text-white">{c.name}</h4>
                <p className="text-[10px] text-brand-text-dim uppercase tracking-wider">
                  {c.org} {c.year !== "—" && `• ${c.year}`}
                </p>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard title="Professional Interests" icon={Lightbulb}>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Tag key={interest} tone="violet">{interest}</Tag>
            ))}
          </div>
        </BentoCard>
      </div>
    </div>
  </PageWrapper>
);

const Projects = () => (
  <PageWrapper>
    <SectionTitle
      title="Selected Projects"
      subtitle="Institutional systems, data platforms, and independent software initiatives."
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((p) => (
        <ProjectCard key={p.title} {...p} />
      ))}
    </div>
  </PageWrapper>
);

const Skills = () => (
  <PageWrapper>
    <SectionTitle
      title="Technical Expertise"
      subtitle="Tools and technologies across data, AI, software engineering, e-learning and digital solutions."
    />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillGroups.map((group) => (
        <BentoCard key={group.title} title={group.title} icon={group.icon}>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </BentoCard>
      ))}
    </div>
    <div className="mt-12">
      <SectionTitle title="Professional Strengths" subtitle="How I work." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strengths.map((s) => (
          <BentoCard key={s.title} icon={s.icon}>
            <h4 className="font-medium text-white">{s.title}</h4>
            <p className="text-sm text-brand-text-dim">{s.desc}</p>
          </BentoCard>
        ))}
      </div>
    </div>
  </PageWrapper>
);

const Contact = () => (
  <PageWrapper>
    <SectionTitle
      title="Get in Touch"
      subtitle="Let's discuss how I can help with your next data, e-learning or software project."
    />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <BentoCard title="Contact Information" icon={Mail} className="bg-blue-500/5 border-blue-500/20">
          <div className="space-y-6">
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-mono text-blue-400 uppercase tracking-widest">Email</p>
                <p className="text-lg text-white">{EMAIL}</p>
              </div>
            </a>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Phone className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-mono text-blue-400 uppercase tracking-widest">Phone</p>
                <p className="text-lg text-white">{PHONE}</p>
              </div>
            </a>
            <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                <FileText className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Resume</p>
                <p className="text-lg text-white">Download / View CV</p>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-mono text-blue-400 uppercase tracking-widest">Location</p>
                <p className="text-lg text-white">Nairobi, Kenya</p>
              </div>
            </div>
          </div>
        </BentoCard>

        <BentoCard title="Professional Links" icon={Layers}>
          <div className="flex gap-4">
            {[
              { icon: Github, href: GITHUB, label: "GitHub" },
              { icon: Linkedin, href: LINKEDIN, label: "LinkedIn" },
              { icon: Globe2, href: "https://stephenmwangipersonal-portfolio.vercel.app/", label: "Portfolio" }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glass flex flex-col items-center justify-center gap-3 py-6 hover:bg-blue-500/10 hover:border-blue-500/20 transition-all group"
              >
                <social.icon className="w-6 h-6 text-brand-text-dim group-hover:text-blue-400 transition-colors" />
                <span className="text-xs font-mono text-brand-text-dim group-hover:text-white">{social.label}</span>
              </a>
            ))}
          </div>
        </BentoCard>
      </div>

      <BentoCard title="Send a Message" icon={Send}>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-brand-text-dim uppercase">Name</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 text-white"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-brand-text-dim uppercase">Email</label>
              <input
                type="email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 text-white"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-brand-text-dim uppercase">Subject</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 text-white"
              placeholder="Project or collaboration inquiry"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-brand-text-dim uppercase">Message</label>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 text-white min-h-[150px]"
              placeholder="Tell me about your project..."
            />
          </div>
          <a
            href={`mailto:${EMAIL}`}
            className="w-full py-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            Send via Email <Send className="w-4 h-4" />
          </a>
          <p className="text-[10px] font-mono text-brand-text-dim/60 text-center">
            This form opens your email client — no backend required.
          </p>
        </form>
      </BentoCard>
    </div>
  </PageWrapper>
);

// --- Layout ---

const Navigation = () => {
  const location = useLocation();
  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "About", path: "/about", icon: User },
    { name: "Projects", path: "/projects", icon: Briefcase },
    { name: "Skills", path: "/skills", icon: Wrench },
    { name: "Contact", path: "/contact", icon: Mail }
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 glass backdrop-blur-md flex items-center gap-2 shadow-2xl border-white/10">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest transition-all",
              isActive ? "bg-blue-500 text-white" : "text-brand-text-dim hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="w-4 h-4" />
            <span className="hidden md:inline">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-bg text-white selection:bg-blue-500/30 selection:text-white pt-32 pb-20">
        <Navigation />
        <main className="max-w-6xl mx-auto p-6 md:p-12 lg:p-20">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </main>

        <footer className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-brand-text-dim text-[10px] font-mono uppercase tracking-widest">
          <div className="text-center md:text-left">
            <p>© {new Date().getFullYear()} Stephen Njuguna Mwangi</p>
            <p className="mt-1 normal-case tracking-normal">Building technology that makes knowledge useful, information meaningful and systems better.</p>
          </div>
          <div className="flex gap-8">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">GitHub</a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">LinkedIn</a>
            <a href={`mailto:${EMAIL}`} className="hover:text-blue-400 transition-colors">Email</a>
          </div>
        </footer>
      </div>
    </Router>
  );
}
