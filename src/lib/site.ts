/**
 * GROVISION site configuration.
 *
 * Contact and social values are intentionally EMPTY until real accounts exist.
 * Fill them in here once available — the UI reads from this single source and
 * gracefully shows "coming soon" states for anything not yet configured.
 */

export const brand = {
  name: "GROVISION",
  tagline: "WHERE VISION MEETS GROWTH.",
  description:
    "GROVISION is a creative and strategic digital marketing brand helping ambitious businesses find clear direction and grow online.",
} as const;

export type ContactChannel = {
  id: string;
  label: string;
  /** Leave empty until the real value exists. Never invent one. */
  value: string;
  href?: string;
};

export const contactChannels: ContactChannel[] = [
  { id: "email", label: "Email", value: "nmn0715mehra@gmail.com", href: "mailto:nmn0715mehra@gmail.com" },
  { id: "whatsapp", label: "WhatsApp", value: "+91 88242 01010", href: "https://wa.me/918824201010" },
  { id: "phone", label: "Phone", value: "+91 88242 01010", href: "tel:+918824201010" },
];

export type SocialLink = {
  id: string;
  label: string;
  /** Leave empty until the official account exists. */
  url: string;
};

export const socialLinks: SocialLink[] = [
  { id: "instagram", label: "Instagram", url: "" },
  { id: "linkedin", label: "LinkedIn", url: "" },
];

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Contact", to: "/contact" },
] as const;

export const services = [
  {
    id: "digital-marketing-strategy",
    icon: "compass",
    name: "Digital Marketing Strategy",
    summary:
      "A clear plan for where to show up, what to say and why it matters — built from your business goals, not from trends.",
    detail:
      "We map audience, channels, messaging and priorities into a single direction so every activity has a reason to exist and a way to be measured.",
  },
  {
    id: "brand-strategy",
    icon: "gem",
    name: "Brand Strategy",
    summary:
      "Positioning, messaging and identity direction that makes your business recognisable and easy to trust.",
    detail:
      "Clarity on who you serve, what you stand for and how you sound — the foundation everything creative is built on.",
  },
  {
    id: "growth-strategy",
    icon: "trending-up",
    name: "Growth Strategy",
    summary:
      "Connecting marketing to business outcomes with a realistic path from where you are to where you want to be.",
    detail:
      "We look at the full journey — attention, interest, conversion and retention — and focus effort where growth is actually possible.",
  },
  {
    id: "social-media-management",
    icon: "share-2",
    name: "Social Media Management",
    summary:
      "Consistent, purposeful content built around a plan rather than posting for the sake of being active.",
    detail:
      "Content pillars, formats, calendars and community handling designed to build familiarity and demand over time.",
  },
  {
    id: "seo",
    icon: "search",
    name: "SEO",
    summary:
      "Helping the right people find you through search, with structure, content and intent working together.",
    detail:
      "Keyword and intent research, on-page structure, technical fundamentals and content direction that compounds.",
  },
  {
    id: "paid-advertising",
    icon: "target",
    name: "Paid Advertising",
    summary:
      "Considered campaigns with clear objectives, sharp targeting and creative that respects the audience.",
    detail:
      "Structured campaigns, defined budgets and honest measurement — so spend is a decision, not a habit.",
  },
] as const;

export const industries = [
  { name: "E-commerce", note: "Brands selling online and building repeat demand." },
  { name: "Fashion", note: "Labels that need identity as much as reach." },
  { name: "Footwear", note: "Product-led brands with strong visual potential." },
  { name: "Fitness", note: "Studios, coaches and programmes building community." },
  { name: "Restaurants & Cafés", note: "Places that grow through discovery and loyalty." },
  { name: "Local Businesses", note: "Services that win nearby, high-intent customers." },
  { name: "Startups", note: "Early teams needing direction before scale." },
  { name: "Personal Brands", note: "Individuals turning presence into opportunity." },
  { name: "Coaches & Consultants", note: "Expertise that needs clear positioning." },
  { name: "Technology", note: "Products explaining complex value simply." },
  { name: "Education", note: "Institutions and creators reaching genuine learners." },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Understand",
    body: "We start with your business, audience, goals and challenges — before any tactic is discussed.",
  },
  {
    step: "02",
    title: "Strategize",
    body: "We define the right digital direction: where to focus, what to say and how success will be measured.",
  },
  {
    step: "03",
    title: "Create",
    body: "Creative work is built with purpose — designed to communicate clearly and support the strategy.",
  },
  {
    step: "04",
    title: "Grow",
    body: "We measure, learn and optimise so direction keeps improving instead of standing still.",
  },
] as const;

/**
 * Concept work only — no client projects exist yet.
 * Replace these entries (or swap this array for a CMS fetch) as real work lands.
 */
export type PortfolioItem = {
  id: string;
  title: string;
  label: "Concept Project" | "Sample Work";
  discipline: string;
  focus: string;
  scope: string[];
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "brand-strategy-concept",
    title: "Brand Strategy Concept",
    label: "Concept Project",
    discipline: "Brand Strategy",
    focus:
      "A self-directed exercise in positioning a product-led brand: audience definition, messaging pillars and tone of voice.",
    scope: ["Positioning", "Messaging", "Tone of voice"],
  },
  {
    id: "social-media-campaign-concept",
    title: "Social Media Campaign Concept",
    label: "Concept Project",
    discipline: "Social Media",
    focus:
      "A campaign idea developed end to end — objective, content pillars, formats and a four-week posting structure.",
    scope: ["Campaign idea", "Content pillars", "Calendar"],
  },
  {
    id: "seo-strategy-concept",
    title: "SEO Strategy Concept",
    label: "Sample Work",
    discipline: "SEO",
    focus:
      "A practice search strategy covering intent mapping, page structure and a content plan for a local service business.",
    scope: ["Intent mapping", "Site structure", "Content plan"],
  },
  {
    id: "paid-advertising-concept",
    title: "Paid Advertising Concept",
    label: "Concept Project",
    discipline: "Paid Media",
    focus:
      "A hypothetical campaign framework: objectives, audience segments, creative angles and a measurement approach.",
    scope: ["Objectives", "Audience segments", "Creative angles"],
  },
  {
    id: "digital-growth-strategy-concept",
    title: "Digital Growth Strategy Concept",
    label: "Sample Work",
    discipline: "Growth",
    focus:
      "A full-funnel direction exercise connecting awareness, consideration and conversion for an emerging brand.",
    scope: ["Funnel mapping", "Channel priorities", "Measurement"],
  },
];

/** Structure prepared for real case studies, published once genuine work exists. */
export const caseStudyFramework = [
  { title: "Challenge", body: "The real business problem behind the brief." },
  { title: "Objective", body: "What success needed to look like, defined upfront." },
  { title: "Strategy", body: "The direction chosen, and the reasoning behind it." },
  { title: "Execution", body: "What was actually built, published and tested." },
  { title: "Results", body: "Measured outcomes, reported honestly." },
  { title: "Learnings", body: "What the work taught us for the next decision." },
] as const;

export const industryOptions = industries.map((i) => i.name);

export const helpOptions = services.map((s) => s.name);
