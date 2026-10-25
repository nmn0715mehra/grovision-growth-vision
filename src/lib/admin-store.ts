import { useState, useEffect } from "react";

export interface WebsiteSettings {
  id: string;
  domain: string;
  siteName: string;
  tagline: string;
  primaryLocation: string;
  targetLanguages: string[];
  sitemapUrl: string;
  robotsTxtUrl: string;
  gaMeasurementId: string;
  gscConnected: boolean;
  bingConnected: boolean;
  healthScore: number;
  lastAuditDate: string;
}

export interface Keyword {
  id: string;
  term: string;
  targetUrl: string;
  currentRank: number;
  previousRank: number;
  searchVolume: number;
  difficulty: number;
  intent: "Informational" | "Commercial" | "Transactional" | "Navigational";
  priority: "High" | "Medium" | "Low";
  updatedAt: string;
}

export interface MonitoredPage {
  id: string;
  url: string;
  title: string;
  httpStatus: number;
  indexStatus: "Indexed" | "Noindex" | "Canonicalized";
  canonicalUrl: string;
  healthScore: number;
  primaryKeyword: string;
  wordCount: number;
  lastCrawled: string;
  metaDescription: string;
  h1: string;
}

export interface TechnicalIssue {
  id: string;
  title: string;
  category: "Meta" | "Performance" | "Indexation" | "Security" | "Structured Data";
  severity: "critical" | "warning" | "info";
  affectedUrl: string;
  explanation: string;
  recommendation: string;
  status: "open" | "resolved";
  detectedAt: string;
}

export interface ContentOpportunity {
  id: string;
  topic: string;
  targetKeyword: string;
  estimatedVolume: number;
  difficulty: number;
  format: "Case Study" | "Guide" | "Landing Page" | "Service Page";
  priority: "High" | "Medium" | "Low";
  status: "Identified" | "In Progress" | "Published";
  rationale: string;
}

export interface Backlink {
  id: string;
  sourceDomain: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  domainRating: number;
  isDoFollow: boolean;
  status: "active" | "lost" | "broken";
  firstSeen: string;
}

export interface Competitor {
  id: string;
  name: string;
  domain: string;
  estMonthlyTraffic: number;
  commonKeywords: number;
  organicKeywords: number;
  domainRating: number;
  strengths: string;
}

export interface SeoTask {
  id: string;
  title: string;
  description: string;
  category: "Technical" | "Content" | "On-Page" | "Off-Page" | "Strategy";
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "backlog" | "in_progress" | "review" | "done";
  dueDate: string;
  assignee: string;
}

export interface ActivityLogItem {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  user: string;
}

export interface AdminUser {
  email: string;
  name: string;
  role: "owner" | "admin";
  isAuthenticated: boolean;
}

// Initial seed data for GROVISION at grovision.shop
const initialSettings: WebsiteSettings = {
  id: "site_grovision",
  domain: "grovision.shop",
  siteName: "GROVISION",
  tagline: "Where vision meets growth.",
  primaryLocation: "India & Global",
  targetLanguages: ["English"],
  sitemapUrl: "https://grovision.shop/sitemap.xml",
  robotsTxtUrl: "https://grovision.shop/robots.txt",
  gaMeasurementId: "G-KXPBJZGP",
  gscConnected: false,
  bingConnected: false,
  healthScore: 94,
  lastAuditDate: "2026-10-22",
};

const initialKeywords: Keyword[] = [
  {
    id: "kw-1",
    term: "digital marketing brand india",
    targetUrl: "/",
    currentRank: 4,
    previousRank: 7,
    searchVolume: 3200,
    difficulty: 42,
    intent: "Commercial",
    priority: "High",
    updatedAt: "2026-10-21",
  },
  {
    id: "kw-2",
    term: "creative growth marketing agency",
    targetUrl: "/services",
    currentRank: 6,
    previousRank: 6,
    searchVolume: 1900,
    difficulty: 54,
    intent: "Commercial",
    priority: "High",
    updatedAt: "2026-10-21",
  },
  {
    id: "kw-3",
    term: "business growth consultation",
    targetUrl: "/lets-grow-together",
    currentRank: 8,
    previousRank: 12,
    searchVolume: 1400,
    difficulty: 38,
    intent: "Transactional",
    priority: "High",
    updatedAt: "2026-10-20",
  },
  {
    id: "kw-4",
    term: "roi driven digital marketing case studies",
    targetUrl: "/case-studies",
    currentRank: 3,
    previousRank: 5,
    searchVolume: 880,
    difficulty: 31,
    intent: "Commercial",
    priority: "Medium",
    updatedAt: "2026-10-20",
  },
  {
    id: "kw-5",
    term: "brand identity and digital strategy",
    targetUrl: "/about",
    currentRank: 11,
    previousRank: 15,
    searchVolume: 2400,
    difficulty: 49,
    intent: "Informational",
    priority: "Medium",
    updatedAt: "2026-10-19",
  },
  {
    id: "kw-6",
    term: "b2b performance marketing portfolio",
    targetUrl: "/portfolio",
    currentRank: 7,
    previousRank: 9,
    searchVolume: 720,
    difficulty: 36,
    intent: "Commercial",
    priority: "Medium",
    updatedAt: "2026-10-19",
  },
  {
    id: "kw-7",
    term: "e-commerce seo growth strategy",
    targetUrl: "/services",
    currentRank: 14,
    previousRank: 18,
    searchVolume: 4100,
    difficulty: 62,
    intent: "Commercial",
    priority: "High",
    updatedAt: "2026-10-18",
  },
  {
    id: "kw-8",
    term: "paid advertising google ads strategy",
    targetUrl: "/services",
    currentRank: 9,
    previousRank: 11,
    searchVolume: 2800,
    difficulty: 47,
    intent: "Commercial",
    priority: "Medium",
    updatedAt: "2026-10-18",
  },
];

const initialPages: MonitoredPage[] = [
  {
    id: "p-1",
    url: "/",
    title: "GROVISION | Digital Marketing & Growth Strategy",
    httpStatus: 200,
    indexStatus: "Indexed",
    canonicalUrl: "https://grovision.shop/",
    healthScore: 98,
    primaryKeyword: "digital marketing brand india",
    wordCount: 1420,
    lastCrawled: "2026-10-22",
    metaDescription:
      "GROVISION is a creative and strategic digital marketing brand helping ambitious businesses find clear direction and grow online through strategy, SEO, social media and paid advertising.",
    h1: "WHERE VISION MEETS GROWTH",
  },
  {
    id: "p-2",
    url: "/lets-grow-together",
    title: "Let's Grow Together | GROVISION Growth Consultation",
    httpStatus: 200,
    indexStatus: "Canonicalized",
    canonicalUrl: "https://grovision.shop/",
    healthScore: 95,
    primaryKeyword: "business growth consultation",
    wordCount: 650,
    lastCrawled: "2026-10-22",
    metaDescription:
      "Share your business, goals and requirements with GROVISION and start a free first conversation about digital marketing and growth.",
    h1: "LET'S GROW TOGETHER",
  },
  {
    id: "p-3",
    url: "/services",
    title: "Services | GROVISION Strategic Digital Marketing",
    httpStatus: 200,
    indexStatus: "Indexed",
    canonicalUrl: "https://grovision.shop/services",
    healthScore: 92,
    primaryKeyword: "creative growth marketing agency",
    wordCount: 980,
    lastCrawled: "2026-10-21",
    metaDescription:
      "Strategic digital marketing services including SEO, PPC advertising, brand strategy, and social growth.",
    h1: "STRATEGIC SERVICES",
  },
  {
    id: "p-4",
    url: "/portfolio",
    title: "Portfolio | GROVISION Client Work & Campaigns",
    httpStatus: 200,
    indexStatus: "Indexed",
    canonicalUrl: "https://grovision.shop/portfolio",
    healthScore: 94,
    primaryKeyword: "b2b performance marketing portfolio",
    wordCount: 820,
    lastCrawled: "2026-10-21",
    metaDescription:
      "Explore GROVISION client campaigns across SEO, branding, and performance growth.",
    h1: "FEATURED WORK",
  },
  {
    id: "p-5",
    url: "/case-studies",
    title: "Case Studies | GROVISION Proven Results",
    httpStatus: 200,
    indexStatus: "Indexed",
    canonicalUrl: "https://grovision.shop/case-studies",
    healthScore: 96,
    primaryKeyword: "roi driven digital marketing case studies",
    wordCount: 1100,
    lastCrawled: "2026-10-21",
    metaDescription:
      "In-depth case studies demonstrating measurable client revenue and audience expansion.",
    h1: "PROVEN IMPACT",
  },
  {
    id: "p-6",
    url: "/about",
    title: "About GROVISION | Agency Story & Vision",
    httpStatus: 200,
    indexStatus: "Indexed",
    canonicalUrl: "https://grovision.shop/about",
    healthScore: 91,
    primaryKeyword: "brand identity and digital strategy",
    wordCount: 890,
    lastCrawled: "2026-10-20",
    metaDescription:
      "Learn about GROVISION's ethos, founders, and commitment to measurable business transformation.",
    h1: "OUR STORY",
  },
  {
    id: "p-7",
    url: "/contact",
    title: "Contact GROVISION | Email, WhatsApp & Phone",
    httpStatus: 200,
    indexStatus: "Indexed",
    canonicalUrl: "https://grovision.shop/contact",
    healthScore: 93,
    primaryKeyword: "contact grovision digital marketing",
    wordCount: 450,
    lastCrawled: "2026-10-20",
    metaDescription: "Get in touch with GROVISION directly by email, WhatsApp or phone.",
    h1: "GET IN TOUCH",
  },
];

const initialIssues: TechnicalIssue[] = [
  {
    id: "iss-1",
    title: "Add OpenGraph image fallback on dynamic routes",
    category: "Meta",
    severity: "warning",
    affectedUrl: "/case-studies",
    explanation:
      "Social crawlers from LinkedIn and WhatsApp may show an empty preview card if og:image is not explicitly defined with an absolute URL.",
    recommendation: "Specify an explicit absolute og:image URL in head meta tags.",
    status: "open",
    detectedAt: "2026-10-21",
  },
  {
    id: "iss-2",
    title: "Ensure sitemap.xml includes lastmod timestamp on recent updates",
    category: "Indexation",
    severity: "info",
    affectedUrl: "https://grovision.shop/sitemap.xml",
    explanation:
      "Search engine bots prioritize re-crawling URLs when valid ISO-8601 lastmod tags indicate recent content revisions.",
    recommendation:
      "Ensure static export sitemap updates the <lastmod> tag during each build deployment.",
    status: "resolved",
    detectedAt: "2026-10-20",
  },
  {
    id: "iss-3",
    title: "Verify Structured Data JSON-LD schema syntax on Homepage",
    category: "Structured Data",
    severity: "info",
    affectedUrl: "/",
    explanation:
      "Organization schema is correctly injected. Consider adding WebSite schema with SearchAction when site search is deployed.",
    recommendation: "Maintain valid schema.org Organization definition.",
    status: "resolved",
    detectedAt: "2026-10-19",
  },
  {
    id: "iss-4",
    title: "Robots.txt allow rule for CSS and JavaScript assets",
    category: "Indexation",
    severity: "critical",
    affectedUrl: "/robots.txt",
    explanation:
      "Googlebot requires unblocked access to CSS and JS bundles to accurately render SSR pages and assess mobile usability.",
    recommendation: "Ensure robots.txt does not disallow /assets or /_build paths.",
    status: "resolved",
    detectedAt: "2026-10-19",
  },
];

const initialOpportunities: ContentOpportunity[] = [
  {
    id: "opp-1",
    topic: "B2B SaaS Growth Strategies 2026",
    targetKeyword: "b2b saas demand generation playbook",
    estimatedVolume: 1800,
    difficulty: 45,
    format: "Guide",
    priority: "High",
    status: "In Progress",
    rationale:
      "High conversion intent among venture-backed founders looking for strategic marketing retainers.",
  },
  {
    id: "opp-2",
    topic: "Luxury & D2C E-Commerce Brand Positioning",
    targetKeyword: "d2c brand positioning framework",
    estimatedVolume: 2400,
    difficulty: 41,
    format: "Case Study",
    priority: "High",
    status: "Identified",
    rationale:
      "Aligns with GROVISION's warm beige/gold premium aesthetic and high-ticket client target.",
  },
  {
    id: "opp-3",
    topic: "Local SEO vs Programmatic SEO for Multi-Location Businesses",
    targetKeyword: "programmatic seo service agency",
    estimatedVolume: 1200,
    difficulty: 52,
    format: "Service Page",
    priority: "Medium",
    status: "Identified",
    rationale: "Expanding GROVISION's technical SEO authority among modern growth marketers.",
  },
  {
    id: "opp-4",
    topic: "Calculating Real Marketing ROI Beyond ROAS",
    targetKeyword: "blended cac and ltv marketing framework",
    estimatedVolume: 950,
    difficulty: 33,
    format: "Guide",
    priority: "Medium",
    status: "Published",
    rationale: "Reinforces GROVISION's strategic philosophy against superficial vanity metrics.",
  },
];

const initialBacklinks: Backlink[] = [
  {
    id: "bl-1",
    sourceDomain: "growthhackers.com",
    sourceUrl: "https://growthhackers.com/articles/strategic-brand-positioning-india",
    targetUrl: "https://grovision.shop/case-studies",
    anchorText: "GROVISION case study on performance growth",
    domainRating: 78,
    isDoFollow: true,
    status: "active",
    firstSeen: "2026-10-15",
  },
  {
    id: "bl-2",
    sourceDomain: "medium.com",
    sourceUrl: "https://medium.com/@marketinglead/top-rising-digital-agencies-to-watch",
    targetUrl: "https://grovision.shop/",
    anchorText: "grovision.shop",
    domainRating: 94,
    isDoFollow: false,
    status: "active",
    firstSeen: "2026-10-12",
  },
  {
    id: "bl-3",
    sourceDomain: "techstartupdigest.io",
    sourceUrl: "https://techstartupdigest.io/marketing-partners-roundup",
    targetUrl: "https://grovision.shop/services",
    anchorText: "GROVISION strategic advisory",
    domainRating: 62,
    isDoFollow: true,
    status: "active",
    firstSeen: "2026-10-08",
  },
  {
    id: "bl-4",
    sourceDomain: "designnomads.co",
    sourceUrl: "https://designnomads.co/showcase/agency-sites-with-editorial-feel",
    targetUrl: "https://grovision.shop/",
    anchorText: "GROVISION digital identity",
    domainRating: 58,
    isDoFollow: true,
    status: "active",
    firstSeen: "2026-09-30",
  },
];

const initialCompetitors: Competitor[] = [
  {
    id: "comp-1",
    name: "GrowthX Agency",
    domain: "growthx.agency",
    estMonthlyTraffic: 14500,
    commonKeywords: 38,
    organicKeywords: 410,
    domainRating: 54,
    strengths: "Heavy PPC guides, extensive free templates.",
  },
  {
    id: "comp-2",
    name: "Avenue Digital",
    domain: "avenuedigital.co",
    estMonthlyTraffic: 8900,
    commonKeywords: 26,
    organicKeywords: 290,
    domainRating: 46,
    strengths: "Strong local Google Maps presence and directory citations.",
  },
  {
    id: "comp-3",
    name: "Nexus Growth Studio",
    domain: "nexusgrowth.io",
    estMonthlyTraffic: 22000,
    commonKeywords: 44,
    organicKeywords: 620,
    domainRating: 61,
    strengths: "High-volume podcast backlink profile and SaaS client logos.",
  },
];

const initialTasks: SeoTask[] = [
  {
    id: "task-1",
    title: "Add FAQ schema markup to /services page",
    description:
      "Structure service offerings with Schema.org FAQPage format to capture SERP rich snippets.",
    category: "Technical",
    priority: "High",
    status: "in_progress",
    dueDate: "2026-10-25",
    assignee: "SEO Lead",
  },
  {
    id: "task-2",
    title: "Draft B2B SaaS demand gen playbook article",
    description:
      "Write 2,200 words covering inbound SEO, conversion friction, and paid retargeting loops.",
    category: "Content",
    priority: "High",
    status: "in_progress",
    dueDate: "2026-10-28",
    assignee: "Content Strategist",
  },
  {
    id: "task-3",
    title: "Set up Google Search Console OAuth verification",
    description:
      "Complete domain DNS verification in Search Console to pull live impressions and query clicks.",
    category: "Strategy",
    priority: "Critical",
    status: "backlog",
    dueDate: "2026-10-30",
    assignee: "Admin",
  },
  {
    id: "task-4",
    title: "Audit internal anchor text on homepage case study teasers",
    description:
      "Ensure anchor text uses descriptive service keywords rather than generic 'Learn More'.",
    category: "On-Page",
    priority: "Medium",
    status: "done",
    dueDate: "2026-10-21",
    assignee: "SEO Lead",
  },
  {
    id: "task-5",
    title: "Pitch guest contributor piece to GrowthHackers editorial",
    description:
      "Submit article on measuring true customer acquisition cost across blended channels.",
    category: "Off-Page",
    priority: "Medium",
    status: "backlog",
    dueDate: "2026-11-05",
    assignee: "Outreach Lead",
  },
];

const initialActivity: ActivityLogItem[] = [
  {
    id: "act-1",
    action: "Keyword Added",
    details: "Tracked 'digital marketing brand india' targeting '/'",
    timestamp: "2026-10-22 14:15",
    user: "Admin (Owner)",
  },
  {
    id: "act-2",
    action: "Audit Item Resolved",
    details: "Confirmed robots.txt unblocked for modern CSS/JS crawlers",
    timestamp: "2026-10-21 18:30",
    user: "Admin (Owner)",
  },
  {
    id: "act-3",
    action: "Task Created",
    details: "Created task: Add FAQ schema markup to /services page",
    timestamp: "2026-10-21 11:20",
    user: "Admin (Owner)",
  },
  {
    id: "act-4",
    action: "Settings Updated",
    details: "Verified primary domain as grovision.shop with HTTPS",
    timestamp: "2026-10-20 09:45",
    user: "Admin (Owner)",
  },
  {
    id: "act-5",
    action: "System Baseline Generated",
    details: "Initialized GROVISION Single-Site SEO Engine with 7 monitored pages",
    timestamp: "2026-10-19 12:00",
    user: "System",
  },
];

const initialAuthUser: AdminUser = {
  email: "admin@grovision.shop",
  name: "GROVISION Administrator",
  role: "owner",
  isAuthenticated: false,
};

// Storage keys
const STORAGE_PREFIX = "grovision_seo_admin_";
const KEY_SETTINGS = `${STORAGE_PREFIX}settings`;
const KEY_KEYWORDS = `${STORAGE_PREFIX}keywords`;
const KEY_PAGES = `${STORAGE_PREFIX}pages`;
const KEY_ISSUES = `${STORAGE_PREFIX}issues`;
const KEY_OPPS = `${STORAGE_PREFIX}opportunities`;
const KEY_BACKLINKS = `${STORAGE_PREFIX}backlinks`;
const KEY_COMPETITORS = `${STORAGE_PREFIX}competitors`;
const KEY_TASKS = `${STORAGE_PREFIX}tasks`;
const KEY_ACTIVITY = `${STORAGE_PREFIX}activity`;
const KEY_AUTH = `${STORAGE_PREFIX}auth`;

function getStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

// React Hook for unified state access
export function useAdminStore() {
  const [settings, setSettingsState] = useState<WebsiteSettings>(() =>
    getStored(KEY_SETTINGS, initialSettings),
  );
  const [keywords, setKeywordsState] = useState<Keyword[]>(() =>
    getStored(KEY_KEYWORDS, initialKeywords),
  );
  const [pages, setPagesState] = useState<MonitoredPage[]>(() =>
    getStored(KEY_PAGES, initialPages),
  );
  const [issues, setIssuesState] = useState<TechnicalIssue[]>(() =>
    getStored(KEY_ISSUES, initialIssues),
  );
  const [opportunities, setOpportunitiesState] = useState<ContentOpportunity[]>(() =>
    getStored(KEY_OPPS, initialOpportunities),
  );
  const [backlinks, setBacklinksState] = useState<Backlink[]>(() =>
    getStored(KEY_BACKLINKS, initialBacklinks),
  );
  const [competitors, setCompetitorsState] = useState<Competitor[]>(() =>
    getStored(KEY_COMPETITORS, initialCompetitors),
  );
  const [tasks, setTasksState] = useState<SeoTask[]>(() => getStored(KEY_TASKS, initialTasks));
  const [activity, setActivityState] = useState<ActivityLogItem[]>(() =>
    getStored(KEY_ACTIVITY, initialActivity),
  );
  const [user, setUserState] = useState<AdminUser>(() => getStored(KEY_AUTH, initialAuthUser));

  // Sync to localStorage
  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettingsState((prev) => {
      const updated = { ...prev, ...newSettings };
      setStored(KEY_SETTINGS, updated);
      logActivity("Settings Updated", "Website SEO parameters updated");
      return updated;
    });
  };

  const addKeyword = (kw: Omit<Keyword, "id" | "updatedAt">) => {
    const newKw: Keyword = {
      ...kw,
      id: `kw-${Date.now()}`,
      updatedAt: new Date().toISOString().split("T")[0]!,
    };
    setKeywordsState((prev) => {
      const updated = [newKw, ...prev];
      setStored(KEY_KEYWORDS, updated);
      logActivity("Keyword Added", `Tracking keyword: "${newKw.term}"`);
      return updated;
    });
  };

  const removeKeyword = (id: string) => {
    setKeywordsState((prev) => {
      const target = prev.find((k) => k.id === id);
      const updated = prev.filter((k) => k.id !== id);
      setStored(KEY_KEYWORDS, updated);
      if (target) logActivity("Keyword Removed", `Removed keyword: "${target.term}"`);
      return updated;
    });
  };

  const addPage = (page: Omit<MonitoredPage, "id" | "lastCrawled">) => {
    const newPage: MonitoredPage = {
      ...page,
      id: `p-${Date.now()}`,
      lastCrawled: new Date().toISOString().split("T")[0]!,
    };
    setPagesState((prev) => {
      const updated = [...prev, newPage];
      setStored(KEY_PAGES, updated);
      logActivity("Page Added", `Monitored page added: "${newPage.url}"`);
      return updated;
    });
  };

  const toggleIssueStatus = (id: string) => {
    setIssuesState((prev) => {
      const updated = prev.map((issue) => {
        if (issue.id === id) {
          const nextStatus = issue.status === "open" ? ("resolved" as const) : ("open" as const);
          logActivity(
            nextStatus === "resolved" ? "Issue Resolved" : "Issue Reopened",
            `Audit issue: "${issue.title}"`,
          );
          return { ...issue, status: nextStatus };
        }
        return issue;
      });
      setStored(KEY_ISSUES, updated);
      return updated;
    });
  };

  const addTask = (task: Omit<SeoTask, "id">) => {
    const newTask: SeoTask = {
      ...task,
      id: `task-${Date.now()}`,
    };
    setTasksState((prev) => {
      const updated = [newTask, ...prev];
      setStored(KEY_TASKS, updated);
      logActivity("Task Created", `New actionable task: "${newTask.title}"`);
      return updated;
    });
  };

  const updateTaskStatus = (id: string, status: SeoTask["status"]) => {
    setTasksState((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, status } : t));
      setStored(KEY_TASKS, updated);
      const target = prev.find((t) => t.id === id);
      if (target) logActivity("Task Status Changed", `"${target.title}" set to ${status}`);
      return updated;
    });
  };

  const addOpportunity = (opp: Omit<ContentOpportunity, "id">) => {
    const newOpp: ContentOpportunity = {
      ...opp,
      id: `opp-${Date.now()}`,
    };
    setOpportunitiesState((prev) => {
      const updated = [newOpp, ...prev];
      setStored(KEY_OPPS, updated);
      logActivity("Content Opportunity Logged", `Topic: "${newOpp.topic}"`);
      return updated;
    });
  };

  const addBacklink = (bl: Omit<Backlink, "id" | "firstSeen">) => {
    const newBl: Backlink = {
      ...bl,
      id: `bl-${Date.now()}`,
      firstSeen: new Date().toISOString().split("T")[0]!,
    };
    setBacklinksState((prev) => {
      const updated = [newBl, ...prev];
      setStored(KEY_BACKLINKS, updated);
      logActivity("Backlink Tracked", `Domain: ${newBl.sourceDomain}`);
      return updated;
    });
  };

  const addCompetitor = (comp: Omit<Competitor, "id">) => {
    const newComp: Competitor = {
      ...comp,
      id: `comp-${Date.now()}`,
    };
    setCompetitorsState((prev) => {
      const updated = [newComp, ...prev];
      setStored(KEY_COMPETITORS, updated);
      logActivity("Competitor Added", `Domain: ${newComp.domain}`);
      return updated;
    });
  };

  const logActivity = (action: string, details: string) => {
    const item: ActivityLogItem = {
      id: `act-${Date.now()}`,
      action,
      details,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
      user: "Admin (Owner)",
    };
    setActivityState((prev) => {
      const updated = [item, ...prev].slice(0, 50); // keep recent 50
      setStored(KEY_ACTIVITY, updated);
      return updated;
    });
  };

  const login = (email: string) => {
    const authedUser: AdminUser = {
      email,
      name: email.split("@")[0]?.replace(/[^a-zA-Z]/g, " ") || "Administrator",
      role: "owner",
      isAuthenticated: true,
    };
    setUserState(authedUser);
    setStored(KEY_AUTH, authedUser);
    logActivity("Admin Sign-In", `Authorized session initiated for ${email}`);
  };

  const logout = () => {
    const unauthed: AdminUser = {
      ...initialAuthUser,
      isAuthenticated: false,
    };
    setUserState(unauthed);
    setStored(KEY_AUTH, unauthed);
    logActivity("Admin Sign-Out", "Session terminated");
  };

  const resetToSampleData = () => {
    setSettingsState(initialSettings);
    setKeywordsState(initialKeywords);
    setPagesState(initialPages);
    setIssuesState(initialIssues);
    setOpportunitiesState(initialOpportunities);
    setBacklinksState(initialBacklinks);
    setCompetitorsState(initialCompetitors);
    setTasksState(initialTasks);
    setActivityState(initialActivity);

    setStored(KEY_SETTINGS, initialSettings);
    setStored(KEY_KEYWORDS, initialKeywords);
    setStored(KEY_PAGES, initialPages);
    setStored(KEY_ISSUES, initialIssues);
    setStored(KEY_OPPS, initialOpportunities);
    setStored(KEY_BACKLINKS, initialBacklinks);
    setStored(KEY_COMPETITORS, initialCompetitors);
    setStored(KEY_TASKS, initialTasks);
    setStored(KEY_ACTIVITY, initialActivity);
    logActivity("Database Reset", "Sample SEO benchmark data re-initialized");
  };

  return {
    settings,
    keywords,
    pages,
    issues,
    opportunities,
    backlinks,
    competitors,
    tasks,
    activity,
    user,
    updateSettings,
    addKeyword,
    removeKeyword,
    addPage,
    toggleIssueStatus,
    addTask,
    updateTaskStatus,
    addOpportunity,
    addBacklink,
    addCompetitor,
    logActivity,
    login,
    logout,
    resetToSampleData,
  };
}
