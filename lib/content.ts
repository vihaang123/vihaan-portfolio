/**
 * ============================================================================
 *  PORTFOLIO CONTENT
 *  Every word, link and project on the site lives in this file.
 *
 *  Fill these in when you are ready. Anything left empty is simply not shown
 *  on the public site, so nothing unfinished ever appears:
 *    1. links.email, links.linkedin, links.github, links.x (all set)
 *    2. experience.education.period
 *    3. project hrefs, roles and screenshots (see the Project type below)
 *    4. beyond.items (the "Outside work" section on the About page; hidden while empty)
 * ============================================================================
 */

/** True when a value has been filled in. Empty values are hidden everywhere. */
export const isFilled = (value?: string): boolean => Boolean(value && value.trim());

/* ----------------------------------------------------------------------------
 * Identity
 * -------------------------------------------------------------------------- */
export const site = {
  name: "Vihaan Gandhi",
  title: "Vihaan Gandhi — AI, Data & Product",
  role: "Data Science student & founder",
  location: "Mumbai, India",
  timeZone: "Asia/Kolkata",
  company: "Tekkloom",
  description:
    "Data Science student and founder in Mumbai. Building Tekkloom and exploring AI agents, data and products.",
  tagline: "Data Science · AI · Product",
  year: 2026,
} as const;

/* ----------------------------------------------------------------------------
 * Links
 * -------------------------------------------------------------------------- */
export const links = {
  email: "vihaan1261@gmail.com",
  linkedin: "https://www.linkedin.com/in/vihaan-gandhi-98668a33b/",
  github: "https://github.com/vihaang123",
  /** Full URL of your X profile, e.g. "https://x.com/yourhandle". Hidden while empty. */
  x: "https://x.com/vihaan1261",
} as const;

/* ----------------------------------------------------------------------------
 * Navigation
 * -------------------------------------------------------------------------- */
export const navItems = [
  { label: "Work", href: "/projects", id: "work" },
  { label: "About", href: "/about", id: "about" },
  { label: "Experience", href: "/experience", id: "experience" },
  { label: "Contact", href: "/contact", id: "contact" },
] as const;

/** Words that scroll across the home page between the hero and the work. */
export const marquee = [
  "AI agents",
  "Machine learning",
  "Automation",
  "Forecasting",
  "Product",
  "Data science",
  "Software systems",
  "Founder",
] as const;

/* ----------------------------------------------------------------------------
 * Hero
 * Two line breaks of the same sentence: wide screens and narrow screens.
 * -------------------------------------------------------------------------- */
export const hero = {
  statement: "I turn ideas into systems that work.",
  lines: {
    wide: ["I turn ideas", "into systems", "that work."],
    narrow: ["I turn", "ideas into", "systems", "that work."],
  },
  intro:
    "Data Science student and founder building products, experimenting with AI and exploring what comes next.",
  status: "Currently building Tekkloom and Supercore",
  /**
   * The line under the headline: my path so far drawn as a time series, with
   * a forecast fanning out past today. `at` is the position along the width
   * (0 to 1, roughly to scale in months from Aug 2024 to now), `y` how high
   * the line sits (0 is the top). Dates are from LinkedIn.
   */
  trajectory: {
    label: "My path so far, drawn as a time series",
    now: 0.7,
    next: "what’s next",
    points: [
      { id: "research", at: 0.1, y: 0.78, date: "2024–25", title: "Crime forecasting paper", side: "above", mobile: false },
      { id: "raww", at: 0.27, y: 0.68, date: "Jun 2025", title: "RAWW internship", side: "below", mobile: false },
      { id: "inlighnx", at: 0.35, y: 0.6, date: "Sep 2025", title: "Data analyst intern", side: "above", mobile: false },
      { id: "tekkloom", at: 0.404, y: 0.5, date: "Nov 2025", title: "Tekkloom", side: "below", mobile: true },
      { id: "supercore", at: 0.592, y: 0.36, date: "Jun 2026", title: "Supercore", side: "above", mobile: true },
      { id: "now", at: 0.7, y: 0.26, date: "", title: "Now", side: "below", mobile: true },
    ],
  },
} as const;

/* ----------------------------------------------------------------------------
 * About
 * -------------------------------------------------------------------------- */
export const about = {
  index: "02",
  label: "About",
  statement: "I’m Vihaan.",
  lead: "I’m a Data Science student building companies, experimenting with AI, and starting more projects than I probably should.",
  body: "I like taking an idea that’s still a rough thought and turning it into something people can use. Right now, that means Tekkloom, Supercore and figuring out what AI agents are actually good for. I enjoy the research side too: with three classmates I built a crime forecasting model, and we published the paper.",
  facts: [
    { label: "Based in", value: "Mumbai, India" },
    { label: "Studying", value: "Data Science at NMIMS, 2022 – 2028" },
    { label: "Building", value: "Tekkloom, Supercore and Nothuman" },
    { label: "Research", value: "Crime forecasting and Nifty 50 sector attribution" },
  ],
} as const;

/* ----------------------------------------------------------------------------
 * About page, the longer version
 * Everything here comes from what you have told me. Add to it freely.
 * -------------------------------------------------------------------------- */
export const aboutMore = {
  story: {
    label: "Who I am",
    heading: "A little more about me",
    paragraphs: [
      "I’m Vihaan Gandhi, a Data Science student at NMIMS in Mumbai, studying there from 2022 to 2028. Alongside classes I run Tekkloom, an AI-first agency and software company, and I’m a co-founder of Supercore, a startup working on agentic AI.",
      "What pulls me in is the stretch between a rough idea and something people can actually use. At Tekkloom that means websites, automation and AI agents for businesses in India, the US, the UK and the UAE, plus a few products of our own. At Supercore, the flagship is AgentGate, a control layer that gives AI agents permissions, human approvals and audit trails.",
      "I like the research side too. With classmates I co-authored two papers: one forecasting crime across Indian districts with LSTM models, and one using Hidden Markov Models to study how Nifty 50 sectors behave in bull and bear markets. Some of my coursework turned into real projects as well, like StockIQ, a portfolio risk analyzer that is deployed and running.",
    ],
  },
  doing: {
    label: "What I do",
    heading: "What I’m working on",
    items: [
      {
        title: "Tekkloom",
        role: "Founder & CEO",
        text: "An AI-first agency and software company. We build websites, AI automation and agents, CRM and workflow automation, custom software and lead generation systems for Indian SMEs and clients across the US, UK and UAE. We also build our own products: SalesBuddy, OnCue and Tekkloom Tools.",
        href: "/experience",
        linkLabel: "See the experience",
      },
      {
        title: "Supercore",
        role: "Co-founder",
        text: "A startup exploring agentic AI for defence and government. Our flagship, AgentGate, is a control layer for AI agents: per-agent permissions, human approvals, PII redaction and audit trails.",
        href: "/projects#project-agentgate",
        linkLabel: "See AgentGate",
      },
      {
        title: "Nothuman",
        role: "Builder",
        text: "A startup I’m building one milestone at a time. It’s an AI company operating system, where a team of specialist agents works from a shared company memory and an orchestrator keeps them coordinated.",
        href: "/projects#project-nothuman",
        linkLabel: "See Nothuman",
      },
      {
        title: "Research and data",
        role: "Student and researcher",
        text: "Two co-authored papers, on crime forecasting and Nifty 50 sector attribution, plus projects like StockIQ, PredictUp and a multi-agent reinforcement learning system for finance.",
        href: "/projects",
        linkLabel: "See the projects",
      },
    ],
  },
  values: {
    label: "How I got here",
    heading: "What building has taught me",
    intro:
      "I’ve always been drawn to building things and working out how they work. That curiosity led me into software, and eventually into startups. Building Tekkloom shaped how I work and what I value.",
    items: [
      { title: "Execution beats ideas", note: "Ideas are cheap. Shipping them is the hard part, and the part that counts." },
      { title: "Customers give the best feedback", note: "Nothing teaches you faster than people actually using what you made." },
      { title: "Stay resilient through uncertainty", note: "Progress comes from carrying on when the path isn’t clear." },
    ],
  },
  interests: {
    label: "Interests",
    heading: "What I keep coming back to",
    items: [
      { title: "AI agents", note: "What they are actually good for, and how to make them safe to rely on." },
      { title: "Financial markets", note: "Following them, and the statistics that sit underneath." },
      { title: "Forecasting", note: "Time series, hidden states and models that try to see what comes next. Both of my papers started here." },
      { title: "Starting companies", note: "How early-stage startups get set up, funded and built in India." },
      { title: "Websites and products", note: "Making things that look considered and work properly, from client sites to our own products." },
    ],
  },
} as const;

/* ----------------------------------------------------------------------------
 * Selected work
 * -------------------------------------------------------------------------- */
export type ProjectVisualKind =
  | "orchestration"
  | "operations"
  | "market"
  | "model"
  | "forecast"
  | "agents"
  | "sales"
  | "commit"
  | "tools"
  | "allocation"
  | "regimes"
  | "gate";

/** Filter groups on the Projects page. */
export type ProjectGroup = "Research" | "Products" | "Data & ML";

export interface Project {
  id: string;
  /** Display name for links and the footer, e.g. "StockIQ". */
  name: string;
  number: string;
  title: string;
  group: ProjectGroup;
  /** Short state of the project, shown as a badge: "Live", "In development"... */
  status?: string;
  categories: string[];
  description: string;
  /** Short focus areas, shown as tags. */
  focus: string[];
  /** Case study: a short overview paragraph. */
  overview: string;
  /** Case study: the "What I worked on" list. */
  worked: string[];
  /** Case study: tools and skills. Hidden while empty. */
  technology?: string[];
  /** Case study: extra label and value pairs, e.g. { label: "Status", value: "..." }. Hidden while empty. */
  details?: { label: string; value: string }[];
  /** Your role on the project. Hidden while empty. */
  role?: string;
  featured?: boolean;
  /**
   * Project URL. Leave "" until you have one: the case study then simply
   * omits the "Visit project" link, so nothing on the page is a dead link.
   */
  href: string;
  /** Label for the link above, e.g. "Read the paper". Defaults to "Visit project". */
  hrefLabel?: string;
  /** Code-drawn concept visual used until you add a real screenshot. */
  visual: ProjectVisualKind;
  /**
   * Real screenshot. Drop the file in /public/projects and set, for example:
   *   image: { src: "/projects/stockiq.png", alt: "StockIQ dashboard" }
   * It replaces the concept visual automatically.
   */
  image?: { src: string; alt: string };
  caption: string;
}

export const work = {
  index: "01",
  label: "Work",
  heading: "Selected work",
  pageHeading: "Projects",
  subheading: "Research, products and experiments I’ve built, explored and worked on.",
  filters: ["All", "Research", "Products", "Data & ML"] as const,
  caseStudy: {
    open: "View case study",
    close: "Close",
    overview: "Overview",
    focus: "Focus areas",
    worked: "What I worked on",
    technology: "Technology",
    role: "Role",
    categories: "Categories",
    visit: "Visit project",
    next: "Next project",
  },
  projects: [
    {
      id: "crime-forecasting",
      name: "Crime Forecasting",
      number: "01",
      title: "Crime Forecasting",
      group: "Research",
      status: "Published research",
      categories: ["Research", "Machine Learning", "Data Visualisation"],
      description:
        "A published research project that forecasts district-wise crime across India with LSTM models, paired with an interactive dashboard.",
      focus: ["LSTM forecasting", "Model comparison", "Hotspot analysis", "Interactive dashboard"],
      overview:
        "Crime Pattern Forecasting Across India: A Predictive Modelling Approach was our final technical project at NMIMS. We built LSTM models that forecast crime rates from historical, district-wise data, then published the work as a research paper.",
      worked: [
        "Designed and developed an LSTM-based system to forecast crime rates from historical, district-wise data",
        "Compared the LSTM forecasts with Prophet, NeuralProphet and regression-based models",
        "Built an interactive dashboard in HTML, CSS and JavaScript showing the top three crimes per district, with dynamic line charts for trends",
        "Reviewed 2022–2024 research on crime prediction, including neural networks and hybrid approaches, to improve model performance",
        "Published our findings as a research paper with the project team",
      ],
      technology: ["LSTM", "Prophet", "NeuralProphet", "Regression models", "HTML", "CSS", "JavaScript"],
      details: [
        { label: "Context", value: "NMIMS MPSTME, Mumbai · BTI Technical Project, A.Y. 2024–25" },
        { label: "Team", value: "Vihaan Gandhi, Parv Jain, Jash Vakharia, Himanshu Thakkar" },
        { label: "Guide", value: "Prof. Hiral Modi" },
        { label: "Outcome", value: "Published research paper" },
      ],
      role: "Researcher & developer",
      featured: true,
      href: "", // link to the published paper, once you have it
      hrefLabel: "Read the paper",
      visual: "forecast",
      caption: "Concept interface · district forecast view",
    },
    {
      id: "stockiq",
      name: "StockIQ",
      number: "02",
      title: "StockIQ",
      group: "Data & ML",
      status: "Deployed",
      categories: ["Data", "Machine Learning", "Finance"],
      description:
        "A full-stack portfolio risk analyzer for Indian equities, built as a DBMS course project and deployed on Render and Vercel.",
      focus: ["Portfolio risk", "Indian equities", "Stock analysis", "Financial intelligence"],
      overview:
        "StockIQ is a portfolio risk analyzer for Indian equities. I built it as a DBMS course project: a Python API behind a React interface, deployed on Render and Vercel.",
      worked: [
        "Built the full stack: a Python API (Flask / FastAPI) and a React front end",
        "Analysed the risk in portfolios of Indian equities",
        "Deployed the project on Render and Vercel",
      ],
      technology: ["React", "Python", "Flask / FastAPI", "Render", "Vercel"],
      details: [{ label: "Context", value: "DBMS course project" }],
      href: "",
      visual: "market",
      caption: "Concept interface · market intelligence",
    },
    {
      id: "nothuman",
      name: "Nothuman",
      number: "03",
      title: "Nothuman",
      group: "Products",
      status: "Startup, in development",
      categories: ["AI Agents", "Software", "Startup"],
      description:
        "A startup I’m building around an AI company operating system: an orchestrator, a team of specialist agents and a shared company memory.",
      focus: ["Multi-agent systems", "Orchestration", "Company memory", "Full-stack"],
      overview:
        "Nothuman is a startup I’m building one milestone at a time. A workforce of AI agents (CEO, CTO, Growth, Finance and Research) is coordinated by an orchestrator and works from a shared company memory.",
      worked: [
        "Designing the agent workforce: CEO, CTO, Growth, Finance and Research agents",
        "Building the orchestrator that coordinates them",
        "Giving the system a company memory, a shared brain the agents work from",
        "Writing the backend in Python with FastAPI, SQLAlchemy and PostgreSQL",
        "Building the front end in Next.js and TypeScript",
      ],
      technology: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Next.js", "TypeScript"],
      details: [{ label: "Status", value: "Being built as a startup, one milestone at a time" }],
      role: "Builder",
      href: "",
      visual: "agents",
      caption: "Concept illustration · the agent team",
    },
    {
      id: "salesbuddy",
      name: "SalesBuddy",
      number: "04",
      title: "SalesBuddy",
      group: "Products",
      status: "Tekkloom product",
      categories: ["AI", "SaaS", "Sales"],
      description:
        "Tekkloom’s flagship product: an AI-powered sales execution platform that works alongside the CRM a team already uses.",
      focus: ["Sales execution", "AI", "Works with your CRM", "SaaS"],
      overview:
        "SalesBuddy is the flagship SaaS product at Tekkloom. It is an AI-powered platform for sales execution, built to sit next to existing CRMs as an execution layer rather than replace them.",
      worked: [
        "Positioning the product as an execution layer next to existing CRMs",
        "Leading it as Tekkloom’s flagship SaaS product",
      ],
      details: [{ label: "Built at", value: "Tekkloom" }],
      role: "Founder",
      href: "",
      visual: "sales",
      caption: "Concept illustration · execution layer",
    },
    {
      id: "nifty-sector-attribution",
      name: "Nifty 50 Sector Attribution",
      number: "05",
      title: "Nifty 50 Sector Attribution",
      group: "Research",
      status: "Research paper",
      categories: ["Research", "Finance", "Statistics"],
      description:
        "A co-authored paper that uses a Hidden Markov Model to split the Nifty 50 into bull and bear regimes, then measures how eight sectors drive the index in each.",
      focus: ["Hidden Markov Models", "Regime detection", "OLS regression", "Sector attribution"],
      overview:
        "Nifty 50 Sector Attribution and Market Regime Analysis Using Hidden Markov Models and Regime Dependent OLS Regression. We trained a Gaussian Hidden Markov Model on four daily signals to label every trading day from 2010 to 2024 as bull or bear, ran a separate regression for each regime to see how eight sector indices move the Nifty 50, and used ANOVA to check that the two regimes really are different.",
      worked: [
        "Co-authored the paper with Jash Visaria and Calvin Dsouza",
        "Applied Hidden Markov Models and OLS regression to Nifty 50 sectors",
        "Tested the regime split with ANOVA and three supporting tests",
        "Compared a regime-guided strategy against buy and hold",
      ],
      technology: ["Python", "hmmlearn", "yfinance", "OLS regression", "ANOVA", "Streamlit"],
      details: [
        { label: "Team", value: "Vihaan Gandhi, Jash Visaria, Calvin Dsouza" },
        { label: "Context", value: "SSDI project, NMIMS MPSTME, Mumbai" },
        {
          label: "Data",
          value: "Nifty 50 and eight sector indices, daily, 2010 to 2024 (about 3,521 trading days), plus India VIX",
        },
        {
          label: "Signals",
          value: "Log returns, high-to-low volatility, RSI and India VIX",
        },
        {
          label: "Finding",
          value:
            "Banking carries a higher coefficient in bull phases, while defensive sectors such as Pharma and FMCG show relatively stronger attribution in bear phases. ANOVA confirms the regimes are distinct (p < 0.001).",
        },
        {
          label: "Backtest",
          value:
            "Regime-guided strategy against buy and hold, 2010 to 2024, before transaction costs: CAGR about 13.4% against 11.7%, maximum drawdown about 28% against 60%.",
        },
      ],
      role: "Co-author",
      href: "/papers/nifty-50-sector-attribution.pdf",
      hrefLabel: "Read the paper (PDF)",
      visual: "regimes",
      caption: "Concept illustration · hidden market states",
    },
    {
      id: "predictup",
      name: "PredictUp",
      number: "06",
      title: "PredictUp",
      group: "Data & ML",
      categories: ["Machine Learning", "Data Science"],
      description: "A predictive analytics and machine learning project.",
      focus: ["Predictive analytics", "Machine learning"],
      overview: "PredictUp is a predictive analytics and machine learning project.",
      worked: ["Predictive analytics", "Machine learning"],
      href: "",
      visual: "model",
      caption: "Concept interface · model overview",
    },
    {
      id: "oncue",
      name: "OnCue",
      number: "07",
      title: "OnCue",
      group: "Products",
      status: "Tekkloom product",
      categories: ["SaaS", "Product"],
      description:
        "A commitment-enforcement SaaS built under the Tekkloom brand, with a Next.js front end and a FastAPI and Supabase backend.",
      focus: ["Commitments", "SaaS", "Full-stack"],
      overview: "OnCue is a commitment-enforcement SaaS that I built under the Tekkloom brand.",
      worked: [
        "Built the product under the Tekkloom brand",
        "Wrote the front end in Next.js",
        "Built the backend with FastAPI and Supabase",
      ],
      technology: ["Next.js", "FastAPI", "Supabase"],
      details: [{ label: "Built at", value: "Tekkloom" }],
      href: "",
      visual: "commit",
      caption: "Concept illustration · commitments",
    },
    {
      id: "tekkloom-tools",
      name: "Tekkloom Tools",
      number: "08",
      title: "Tekkloom Tools",
      group: "Products",
      status: "Live",
      categories: ["Web", "Tools", "Product"],
      description:
        "A free site of browser-based tools for images, PDFs, OCR, data and AI, with a blog alongside.",
      focus: ["Browser tools", "Prerendering", "Privacy notices", "Cloudflare"],
      overview:
        "tekkloomtools.com is a collection of free online tools for image, PDF, OCR, data and AI work, with a blog next to them. It is separate from the main Tekkloom agency site.",
      worked: [
        "Built the tools and the blog as a React 19 and Vite app with client-side routing",
        "Prerendered every route, so pages load as plain HTML for search engines",
        "Added Cloudflare Pages Functions behind the AI tools",
        "Separated the tools that run entirely in the browser from the ones that send text to an AI provider, and told visitors which is which",
      ],
      technology: ["React 19", "Vite", "React Router", "Cloudflare Pages", "Pages Functions"],
      details: [{ label: "Built at", value: "Tekkloom" }],
      href: "https://tekkloomtools.com",
      hrefLabel: "Visit tekkloomtools.com",
      visual: "tools",
      caption: "Concept illustration · the tool library",
    },
    {
      id: "marl-finance",
      name: "Multi-Agent RL for Finance",
      number: "10",
      title: "Multi-Agent RL for Finance",
      group: "Data & ML",
      status: "Course project",
      categories: ["Reinforcement Learning", "Finance", "Simulation"],
      description:
        "Four Q-learning agents share one pool of capital and learn how to split it across equity, bonds, gold and cash.",
      focus: ["Q-learning", "Multi-agent systems", "Simulation", "Allocation"],
      overview:
        "A mini project for our Reinforcement Learning and Multi-Agent Systems course. Four independent agents, each with its own Q-table, allocate a shared pool of starting capital in a simulated market that moves through different regimes.",
      worked: [
        "Implemented tabular Q-learning from scratch, with no RL frameworks",
        "Gave each of the four agents its own role and Q-table: Growth, Conservative, Balanced and Risk / Liquidity",
        "Simulated a market with multiple regimes",
        "Allocated a shared ₹10,00,000 starting pool across equity, bonds, gold and cash",
      ],
      technology: ["Python", "Q-learning", "Multi-agent systems"],
      details: [{ label: "Context", value: "Reinforcement Learning and Multi-Agent Systems course" }],
      href: "",
      visual: "allocation",
      caption: "Concept illustration · four agents, one pool",
    },
    {
      id: "agentgate",
      name: "AgentGate",
      number: "10",
      title: "AgentGate",
      group: "Products",
      status: "Supercore flagship",
      categories: ["AI Agents", "Security", "Product"],
      description:
        "Supercore’s flagship: a drop-in control layer for AI agents, with per-agent permissions, human approvals, PII redaction and audit trails.",
      focus: ["Agent permissions", "Human approval", "PII redaction", "Audit trails"],
      overview:
        "AgentGate is the flagship product being built under Supercore. It grew out of a broader AI trust platform idea and is now a drop-in control plane for AI agents, aimed at engineers.",
      worked: [
        "Reworked the idea from a general AI trust platform into one focused control plane",
        "Defined the core controls: per-agent permissions, human-in-the-loop approvals, PII redaction and audit trails",
        "Wrote a full founding blueprint",
        "Building it under Supercore as the company’s flagship",
      ],
      details: [
        { label: "Company", value: "Supercore" },
        { label: "Status", value: "In development" },
      ],
      href: "",
      visual: "gate",
      caption: "Concept illustration · the control layer",
    },
  ] satisfies Project[],
};

/* ----------------------------------------------------------------------------
 * Experience & education
 * Reverse chronological inside each group. Dates are as listed on LinkedIn.
 * -------------------------------------------------------------------------- */
export type ExperienceKind = "Startups" | "Internships" | "Research";

export interface ExperienceItem {
  kind: ExperienceKind;
  period: string;
  organisation: string;
  role: string;
  /** "Full-time", "Internship". Hidden while empty. */
  type?: string;
  /** "Mumbai · On-site". Hidden while empty. */
  location?: string;
  field?: string;
  description: string;
  /** Short points about the role. Hidden while empty. */
  highlights?: string[];
  /** What the company does, shown as tags. Hidden while empty. */
  tags?: string[];
  /** Company website. Hidden while empty. */
  href?: string;
  hrefLabel?: string;
}

export const experience = {
  index: "03",
  label: "Experience",
  heading: "Experience",
  groups: ["Startups", "Internships", "Research"] as const,
  items: [
    {
      kind: "Startups",
      period: "Jun 2026 – Present",
      organisation: "Supercore",
      role: "Co-founder",
      type: "Full-time",
      location: "Mumbai · On-site",
      field: "Defence Tech · Agentic AI",
      description:
        "A startup exploring agentic AI systems for defence and government applications.",
      highlights: [
        "Co-founding the company",
        "Exploring agentic AI systems",
        "Looking at defence and government applications",
        "Building AgentGate, the company’s flagship: a control layer for AI agents",
      ],
      tags: ["Agentic AI", "Defence", "Government"],
    },
    {
      kind: "Startups",
      period: "Nov 2025 – Present",
      organisation: "Tekkloom",
      role: "Founder & CEO",
      type: "Full-time",
      location: "Mumbai",
      field: "AI & Technology",
      description:
        "An AI-first agency and software company based in India. I lead it, and we build intelligent agents, automation and software systems for businesses.",
      highlights: [
        "Leading the company as Founder & CEO",
        "Building AI agents and workflow automation for businesses",
        "Working with Indian SMEs and clients across the US, UK, UAE and other markets",
        "Building our own products: SalesBuddy, OnCue and Tekkloom Tools",
        "Running our own outbound: a cold email system with 261 personalised emails across 17 sector templates",
      ],
      tags: [
        "Website development",
        "AI automation",
        "AI agents",
        "CRM and workflow automation",
        "Custom software",
        "Cybersecurity",
        "Lead generation systems",
        "Database management",
      ],
      href: "https://tekkloom.com",
      hrefLabel: "tekkloom.com",
    },
    {
      kind: "Internships",
      period: "Sep 2025 – Nov 2025",
      organisation: "InLighnX Global Pvt Ltd (InLighn Tech)",
      role: "Data Analyst",
      type: "Internship",
      location: "Bengaluru, India · Remote",
      description:
        "A three-month remote internship as a data analyst, working with Python and statistical data analysis.",
      tags: ["Python", "Statistical data analysis"],
    },
    {
      kind: "Internships",
      period: "Jun 2025 – Aug 2025",
      organisation: "Resqink Association for Wildlife Welfare (RAWW)",
      role: "Summer Intern",
      type: "Internship",
      location: "Mumbai · Hybrid",
      description:
        "Completed a three-month summer internship with RAWW, working across web design and data analysis.",
      tags: ["Web design", "Data analysis"],
    },
    {
      kind: "Research",
      period: "A.Y. 2024 – 25",
      organisation: "NMIMS, MPSTME",
      role: "Researcher & developer",
      field: "Published research",
      description:
        "Built LSTM models to forecast district-wise crime across India, compared them with Prophet and NeuralProphet, and published the work as a research paper.",
    },
  ] satisfies ExperienceItem[],
  educationLabel: "Education",
  /**
   * The institution comes from your project slides (NMIMS, MPSTME, Mumbai);
   * please confirm it. Empty values are not shown on the page.
   */
  education: {
    institution: "NMIMS, Mukesh Patel School of Technology Management & Engineering",
    period: "2022 – 2028",
    degree: "B.Tech, Data Science",
    description: "Currently pursuing a B.Tech in Data Science.",
  },
};

/* ----------------------------------------------------------------------------
 * What I build with
 * -------------------------------------------------------------------------- */
export const capabilities = {
  index: "04",
  label: "Capabilities",
  heading: "What I build with",
  areas: [
    {
      number: "01",
      title: "Artificial Intelligence",
      items: ["Artificial Intelligence", "AI Agents", "LLMs", "Automation", "Intelligent Systems"],
    },
    {
      number: "02",
      title: "Data",
      items: [
        "Python",
        "Machine Learning",
        "LSTM",
        "Time-series Forecasting",
        "Statistical Data Analysis",
        "Data Analysis",
        "Financial Analysis",
        "Microsoft Power BI",
        "SQL",
      ],
    },
    {
      number: "03",
      title: "Product",
      items: [
        "Software",
        "Product Development",
        "Front-End Development",
        "Web Dashboards",
        "Web Design",
        "Prototyping",
        "Project Management",
        "Deployment",
      ],
    },
    {
      number: "04",
      title: "Entrepreneurship",
      items: [
        "Startups",
        "Team Leadership",
        "Business Development",
        "Product Thinking",
        "Experimentation",
        "Building from zero",
      ],
    },
  ],
};

/* ----------------------------------------------------------------------------
 * Currently
 * -------------------------------------------------------------------------- */
export const currently = {
  index: "05",
  label: "Now",
  heading: "Currently",
  blocks: [
    { label: "Building", values: ["Tekkloom", "Supercore", "Nothuman"], live: true },
    {
      label: "Learning",
      values: ["AI Agents", "Machine Learning", "Product Development"],
    },
    {
      label: "Exploring",
      values: ["Agentic AI", "AI SaaS", "Defence Technology"],
    },
    { label: "Based in", values: ["Mumbai, India"] },
  ],
};

/* ----------------------------------------------------------------------------
 * Beyond the work: hobbies, people you look up to, quotes you keep close
 * Each section stays hidden until you add real entries. Examples:
 *
 *   beyond.items:       { title: "Football", note: "One line about it." }
 *   inspirations.items: { name: "Name", why: "One line on why." }
 *   quotes.items:       { text: "The quote.", author: "Who said it" }
 * -------------------------------------------------------------------------- */
export interface BeyondItem {
  title: string;
  note: string;
}

export const beyond = {
  index: "06",
  label: "Free time",
  heading: "Outside work",
  intro:
    "I like reading about startups, AI and technology, but I also like getting away from my screen. I’m naturally curious, so I’m usually building something or diving into a topic that has caught my interest.",
  items: [
    { title: "Reading", note: "Mostly about startups, AI and technology." },
    { title: "Working out", note: "A good way to get away from the screen." },
    { title: "New cafés", note: "Always happy to explore one I haven’t been to." },
    { title: "Football", note: "Watching it, and talking about it." },
    { title: "Friends and family", note: "Time with the people I care about." },
    { title: "Side projects", note: "Building small things and learning new tech just for fun." },
  ] as BeyondItem[],
};

export interface InspirationItem {
  name: string;
  why: string;
}

export const inspirations = {
  label: "Inspiration",
  heading: "People I look up to",
  intro: "The people whose work, or way of working, I learn from.",
  items: [] as InspirationItem[],
};

export interface QuoteItem {
  text: string;
  author: string;
}

export const quotes = {
  label: "Quotes",
  heading: "Words I keep close",
  items: [
    { text: "Make something people want.", author: "Paul Graham, Y Combinator" },
  ] as QuoteItem[],
};

/* ----------------------------------------------------------------------------
 * Contact
 * -------------------------------------------------------------------------- */
export const contact = {
  eyebrow: "Have an idea?",
  headline: "Let’s talk.",
  note: "If you’re building something, or just thinking about it, I’d like to hear about it.",
  /** The /contact page. */
  page: {
    index: "01",
    label: "Contact",
    intro:
      "If you’re building something, or just thinking about it, tell me a little about it. A few lines is plenty.",
    message: "Write a message",
    direct: "Or reach me directly",
  },
  form: {
    name: "Your name",
    email: "Your email",
    topic: "What is it about?",
    topics: ["A project", "Working together", "Research", "Just saying hi"],
    message: "Your message",
    messagePlaceholder: "What are you working on, or thinking about?",
    submit: "Send message",
    sending: "Sending…",
    sentTitle: "Thanks, your message is on its way.",
    sentBody: "I read everything that comes in, and I’ll write back as soon as I can.",
    fallbackTitle: "Your email app should open now.",
    fallbackBody:
      "Your message is ready to send there. If nothing opened, copy my address below and paste it into your email.",
    errorTitle: "That didn’t go through.",
    errorBody: "Please try again, or write to me directly at the address below.",
    again: "Write another message",
    copy: "Copy email",
    copied: "Copied",
  },
};
