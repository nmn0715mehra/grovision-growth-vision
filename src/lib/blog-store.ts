import { useState, useEffect } from "react";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown formatted
  category:
    | "SEO & Organic Growth"
    | "Performance & Paid Ads"
    | "Brand Strategy"
    | "Conversion Optimization"
    | "Digital Strategy";
  tags: string[];
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  coverImage: string;
  readTime: string;
  status: "published" | "draft" | "scheduled" | "archived";
  publishDate: string;
  updatedAt: string;
  featured?: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    targetKeywords: string[];
    canonicalUrl: string;
    gscStatus: "Indexed" | "Submitted" | "Discovered - not indexed" | "Not Submitted";
    lastCrawledAt?: string;
    searchConsoleUrl?: string;
  };
  metrics: {
    views: number;
    reads: number;
    gscImpressions: number;
    gscClicks: number;
    gscCtr: number;
    gscPosition: number;
  };
}

export interface GscTopQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscConfig {
  connected: boolean;
  property: string;
  verificationMethod: "meta-tag" | "dns" | "service-account";
  verificationMetaTag: string;
  serviceAccountEmail: string;
  lastSitemapSync: string;
  sitemapStatus: "Success" | "Pending" | "Error";
  totalIndexed: number;
  totalImpressions: number;
  totalClicks: number;
  averageCtr: number;
  averagePosition: number;
  topQueries: GscTopQuery[];
}

export interface AITopicIdea {
  id: string;
  topic: string;
  pillar: string;
  angle: string;
  targetKeywords: string[];
  intent: "Commercial" | "Informational" | "Transactional" | "Thought Leadership";
  difficulty: number;
  volume: number;
  outline: string[];
}

const KEY_BLOGS = "grovision_blogs_v1";
const KEY_GSC = "grovision_gsc_v1";

const initialGscConfig: GscConfig = {
  connected: true,
  property: "sc-domain:grovision.shop",
  verificationMethod: "meta-tag",
  verificationMetaTag: "google-site-verification=gv_seo_verified_token_8824201010",
  serviceAccountEmail: "seo-service-bot@grovision-production.iam.gserviceaccount.com",
  lastSitemapSync: "2026-10-23 09:15",
  sitemapStatus: "Success",
  totalIndexed: 14,
  totalImpressions: 48620,
  totalClicks: 2840,
  averageCtr: 5.84,
  averagePosition: 8.4,
  topQueries: [
    {
      query: "digital marketing brand india",
      clicks: 612,
      impressions: 8420,
      ctr: 7.27,
      position: 4.1,
    },
    {
      query: "creative growth marketing agency",
      clicks: 430,
      impressions: 7210,
      ctr: 5.96,
      position: 5.8,
    },
    {
      query: "brand positioning vs paid ads",
      clicks: 388,
      impressions: 6490,
      ctr: 5.98,
      position: 4.7,
    },
    {
      query: "high growth seo playbook india",
      clicks: 312,
      impressions: 5120,
      ctr: 6.09,
      position: 3.9,
    },
    {
      query: "e-commerce on page seo checklist",
      clicks: 275,
      impressions: 4980,
      ctr: 5.52,
      position: 6.2,
    },
    {
      query: "attribution modeling guide 2026",
      clicks: 215,
      impressions: 4100,
      ctr: 5.24,
      position: 7.0,
    },
    {
      query: "business growth consultation grovision",
      clicks: 198,
      impressions: 2150,
      ctr: 9.21,
      position: 1.8,
    },
  ],
};

const initialBlogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Modern SEO Playbook for High-Growth Indian Brands: Intent Over Volume",
    slug: "modern-seo-playbook-indian-brands-intent-over-volume",
    excerpt:
      "Why chasing generic 100k search terms is killing your CAC, and how targeting commercial long-tail intent drives 4x higher pipeline revenue.",
    category: "SEO & Organic Growth",
    tags: ["SEO Strategy", "Intent Marketing", "E-Commerce India", "SERP Dominance"],
    author: {
      name: "GROVISION Editorial",
      role: "Growth & SEO Practice Lead",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630&q=80",
    readTime: "6 min read",
    status: "published",
    featured: true,
    publishDate: "2026-10-18",
    updatedAt: "2026-10-22",
    seo: {
      metaTitle: "Modern SEO Playbook for Indian Brands (2026) | GROVISION",
      metaDescription:
        "Learn why intent beats search volume in modern SEO. A battle-tested blueprint for emerging brands in India to capture high-converting search demand.",
      targetKeywords: ["seo playbook india", "intent based seo", "organic growth strategy"],
      canonicalUrl:
        "https://grovision.shop/blog/modern-seo-playbook-indian-brands-intent-over-volume",
      gscStatus: "Indexed",
      lastCrawledAt: "2026-10-22",
      searchConsoleUrl:
        "https://search.google.com/search-console?resource_id=sc-domain:grovision.shop",
    },
    metrics: {
      views: 1840,
      reads: 1220,
      gscImpressions: 8420,
      gscClicks: 412,
      gscCtr: 4.89,
      gscPosition: 4.2,
    },
    content: `## The Traffic Trap Most Founders Fall Into

For years, agency playbooks preached a single doctrine: **find the highest volume keywords and crank out content**.

The result? Thousands of blogs ranking for informational trivia, bloated vanity traffic graphs, and virtually zero impact on the bottom line. If a visitor is searching *"what is marketing"*, they are probably writing a college paper. If they search *"performance marketing agency for direct-to-consumer footwear"*, they have a budget, a pain point, and an imminent purchase decision.

> "Traffic without commercial intent is just a hosting bill waiting to mature."

---

### Key Takeaways

- **Stop chasing top-of-funnel vanity queries**: Shift 70% of organic resources into high-intent evaluation and transaction queries.
- **Topical Authority beats isolated backlinks**: Search engines rank clusters of deep, interconnected content, not single orphan articles.
- **Answer Engine Optimization (AEO)**: Format key definitions, steps, and tables so search engine AI agents cite your brand as the canonical authority.

---

### Step 1: Mapping the Search Intent Spectrum

Search queries fall into four critical categories:

| Intent Type | Example Query | Business Value | Allocation % |
| :--- | :--- | :--- | :--- |
| **Informational** | "how does paid search work" | Low / Awareness | 15% |
| **Commercial Investigation** | "best seo agencies in india for d2c" | High / Pipeline | 45% |
| **Transactional** | "book growth marketing consultation" | Immediate Revenue | 30% |
| **Navigational** | "grovision shop contact" | Retention | 10% |

When building your initial 90-day organic road map, prioritize Commercial Investigation. These are prospective buyers comparing solutions, evaluating methodologies, and ready to sign.

---

### Step 2: The Cluster Architecture Model

Rather than publishing 30 random articles on disconnected topics, structure your content into rigorous **Topic Clusters**:

1. **Pillar Page**: A comprehensive, 3,000-word masterclass covering the holistic discipline (e.g. *Full-Funnel Digital Growth*).
2. **Cluster Articles**: 6 to 8 deep-dive sub-articles addressing specific tactical inquiries (e.g. *Creative Ad Fatigue Fixes*, *CAC vs LTV Diagnostics*, *Attribution Modeling*).
3. **Internal Linking Spine**: Every cluster article points up to the Pillar with descriptive anchor text, passing topical authority directly.

---

### Step 3: Technical Integrity & Fast Edge Delivery

Google's modern crawl budget prioritizes clean, fast sites with 95+ Core Web Vitals. Keep your DOM light, serve images in modern WebP formats, and ensure your sitemap XML is automatically pinged to Search Console upon every publish.

---

### Need Clear Organic Direction for Your Brand?

At **GROVISION**, we combine search intent research, technical SEO excellence, and conversion copy to turn search engines into your most predictable revenue engine.

Explore our consultation below to map out your custom 6-month growth roadmap.`,
  },
  {
    id: "blog-2",
    title: "Why Brand Positioning Must Precede Paid Ad Spend: The Growth Foundation",
    slug: "why-brand-positioning-must-precede-paid-ad-spend",
    excerpt:
      "Pouring money into Meta and Google Ads before sharpening your positioning is pouring water into a leaky bucket. Here is how to fix the bucket first.",
    category: "Brand Strategy",
    tags: ["Brand Identity", "Paid Advertising", "Performance Marketing", "CAC Reduction"],
    author: {
      name: "GROVISION Editorial",
      role: "Brand & Creative Lead",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&h=630&q=80",
    readTime: "5 min read",
    status: "published",
    featured: false,
    publishDate: "2026-10-15",
    updatedAt: "2026-10-20",
    seo: {
      metaTitle: "Brand Positioning Before Paid Ads | GROVISION Growth",
      metaDescription:
        "Discover why brand positioning is the single highest leverage lever for lowering customer acquisition costs (CAC) across paid channels.",
      targetKeywords: ["brand positioning", "paid ad performance", "cac reduction strategy"],
      canonicalUrl: "https://grovision.shop/blog/why-brand-positioning-must-precede-paid-ad-spend",
      gscStatus: "Indexed",
      lastCrawledAt: "2026-10-21",
      searchConsoleUrl:
        "https://search.google.com/search-console?resource_id=sc-domain:grovision.shop",
    },
    metrics: {
      views: 1420,
      reads: 980,
      gscImpressions: 6190,
      gscClicks: 328,
      gscCtr: 5.3,
      gscPosition: 5.6,
    },
    content: `## The Illusion of the "Ad Agency" Fix

When sales stall or acquisition costs rise, the instinctive reaction for most leadership teams is straightforward: *hire an ad agency, test 40 new creatives, or increase media spend*.

Yet in over 80% of audits we conduct, the advertising campaigns are not failing because of bidding algorithms or ad platform settings. They fail because the underlying value proposition is indistinguishable from ten competitors.

> "Paid ads amplify who you are. If your brand is vague and commoditized, paid ads merely amplify your commoditization at scale."

---

### The Three Hallmarks of Weak Brand Positioning

1. **Category Vagueness**: You describe what you do using generic buzzwords (*"We deliver seamless, innovative solutions"*).
2. **Indiscriminate Audience Targeting**: You attempt to appeal to everyone, leaving your messaging diluted and forgettable.
3. **Price as the Only Differentiator**: When a prospect asks *"Why should I choose you?"*, your answers always collapse back into price or discount codes.

---

### The 4-Part Positioning Architecture

To build a brand that reduces paid CAC and commands pricing power, answer these four pillars with ruthless precision:

- **Who exactly is this for?** (Narrow the ideal client profile until it hurts).
- **What urgent problem do you solve?** (Frame it around quantifiable pain or missed opportunity).
- **Why is your approach fundamentally different?** (Your proprietary method or point of view).
- **What is the proof?** (Case studies, metrics, and unmistakable proof of execution).

Once this foundation is dialed in, your ad copy writes itself, your click-through rates double, and your landing page conversion rates reach double digits.`,
  },
  {
    id: "blog-3",
    title: "Attribution Modeling in 2026: Moving Past First-Click and Last-Click Illusions",
    slug: "attribution-modeling-2026-first-click-last-click-illusions",
    excerpt:
      "Modern buyers interact across 12+ touchpoints before converting. Here is how modern growth marketers map true multi-touch attribution.",
    category: "Performance & Paid Ads",
    tags: ["Marketing Attribution", "Analytics", "Media Mix", "ROAS Optimization"],
    author: {
      name: "GROVISION Editorial",
      role: "Performance Director",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=630&q=80",
    readTime: "7 min read",
    status: "published",
    featured: false,
    publishDate: "2026-10-10",
    updatedAt: "2026-10-19",
    seo: {
      metaTitle: "Attribution Modeling Guide (2026) | GROVISION",
      metaDescription:
        "Understand true multi-touch marketing attribution without relying on inflated platform ROAS dashboards. Practical framework for growth teams.",
      targetKeywords: [
        "marketing attribution modeling",
        "multi-touch attribution",
        "roas measurement",
      ],
      canonicalUrl:
        "https://grovision.shop/blog/attribution-modeling-2026-first-click-last-click-illusions",
      gscStatus: "Indexed",
      lastCrawledAt: "2026-10-20",
      searchConsoleUrl:
        "https://search.google.com/search-console?resource_id=sc-domain:grovision.shop",
    },
    metrics: {
      views: 1110,
      reads: 760,
      gscImpressions: 5430,
      gscClicks: 285,
      gscCtr: 5.25,
      gscPosition: 6.1,
    },
    content: `## The Attribution Crisis

If you add up the revenue reported by Meta Ads Manager, Google Ads, and your email marketing platform, you will frequently find that the combined reported revenue is 150% to 200% of your actual bank deposits.

Every ad network operates in a closed garden, claiming 100% credit for conversions that touched their surface within an arbitrary 7-day or 1-day window.

---

### Why Last-Click Attribution Destroys Growth

Last-click attribution credits 100% of the sale to the final touchpoint (typically Branded Google Search or Direct). 

When marketers blindly optimize toward last-click ROAS:
- They aggressively cut top-of-funnel discovery channels (like Meta video, organic content, and YouTube).
- Branded search ROAS temporarily looks stellar.
- Within 90 days, the top of the funnel dries up, branded search volume collapses, and overall revenue plummets.

---

### The Blended Marketing Efficiency Ratio (MER)

Instead of relying solely on in-platform ROAS, elite growth teams monitor **Marketing Efficiency Ratio (MER)**:

$$\\text{MER} = \\frac{\\text{Total Net Revenue}}{\\text{Total Paid Ad Spend across all channels}}$$

When you calibrate budgets against blended MER alongside post-purchase zero-party surveys (*"How did you first hear about us?"*), you unlock the clarity needed to scale profitably without guesswork.`,
  },
  {
    id: "blog-4",
    title: "The Complete On-Page SEO Checklist for Emerging E-Commerce Stores",
    slug: "on-page-seo-checklist-emerging-ecommerce-stores",
    excerpt:
      "A step-by-step technical and architectural checklist to optimize product pages, category hierarchies, and collection filters for Google Search.",
    category: "Conversion Optimization",
    tags: ["On-Page SEO", "E-Commerce", "CRO", "Technical Audits"],
    author: {
      name: "GROVISION Editorial",
      role: "SEO Technical Lead",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&h=630&q=80",
    readTime: "8 min read",
    status: "draft",
    featured: false,
    publishDate: "2026-10-23",
    updatedAt: "2026-10-23",
    seo: {
      metaTitle: "E-Commerce On-Page SEO Checklist (2026) | GROVISION",
      metaDescription:
        "Actionable, technical on-page SEO checklist for direct-to-consumer and e-commerce stores to rank higher and convert organic visitors.",
      targetKeywords: [
        "ecommerce on-page seo",
        "product page seo checklist",
        "collection page ranking",
      ],
      canonicalUrl: "https://grovision.shop/blog/on-page-seo-checklist-emerging-ecommerce-stores",
      gscStatus: "Not Submitted",
      searchConsoleUrl:
        "https://search.google.com/search-console?resource_id=sc-domain:grovision.shop",
    },
    metrics: {
      views: 0,
      reads: 0,
      gscImpressions: 0,
      gscClicks: 0,
      gscCtr: 0,
      gscPosition: 0,
    },
    content: `## Why Most E-Commerce Stores Fail at SEO

Most online stores suffer from three fatal structural errors:
1. Thin product descriptions duplicated directly from manufacturer catalogs.
2. Canonical chaos caused by parameterized URLs (colors, sizes, sorting filters).
3. Missing structured schema data for pricing, stock availability, and verified customer reviews.

---

### The 10-Point Master Checklist

- [ ] **Title Tag Format**: Primary Keyword + Model / Benefit + Brand (Under 60 characters).
- [ ] **H1 Uniqueness**: Only one H1 per product page matching the primary commercial query.
- [ ] **Product Schema JSON-LD**: Verified \`Product\`, \`Offer\`, and \`AggregateRating\` tags.
- [ ] **Canonical URL Tagging**: Ensure all variant parameters point to the canonical root URL.
- [ ] **High-Resolution WebP Media**: Alt tags containing descriptive keyword context (e.g., *"Handcrafted Italian Leather Chelsea Boots in Tan"*).
- [ ] **Unique 150+ Word Value Pitch**: Explain materials, sizing recommendations, and craft.
- [ ] **Related Collections Internal Links**: Link back to parent categories with contextual anchor text.
- [ ] **Fast Mobile LCP**: Sub-2.0s Largest Contentful Paint on mobile connections.
- [ ] **Breadcrumb Schema**: \`Home > Footwear > Men's Boots > Product Name\`.
- [ ] **FAQ Accordion with Schema**: Answer return policies, sizing questions, and care instructions.

Publish this checklist across your core catalogue and request URL re-indexing in Google Search Console to see rankings lift within 14 days.`,
  },
];

export function useBlogStore() {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    if (typeof window === "undefined") return initialBlogs;
    try {
      const stored = localStorage.getItem(KEY_BLOGS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored blogs", e);
    }
    return initialBlogs;
  });

  const [gscConfig, setGscConfig] = useState<GscConfig>(() => {
    if (typeof window === "undefined") return initialGscConfig;
    try {
      const stored = localStorage.getItem(KEY_GSC);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored GSC config", e);
    }
    return initialGscConfig;
  });

  const saveBlogs = (updated: BlogPost[]) => {
    setBlogs(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(KEY_BLOGS, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save blogs to storage", e);
      }
    }
  };

  const saveGsc = (updated: GscConfig) => {
    setGscConfig(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(KEY_GSC, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save GSC config to storage", e);
      }
    }
  };

  const createBlog = (data: Partial<BlogPost>): BlogPost => {
    const title = data.title || "Untitled Blog Post";
    const slug =
      data.slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      title,
      slug,
      excerpt: data.excerpt || "Strategic insights from the GROVISION team.",
      content: data.content || "## Introduction\n\nStart writing your article here...",
      category: data.category || "SEO & Organic Growth",
      tags: data.tags || ["Growth", "SEO"],
      author: data.author || {
        name: "GROVISION Editorial",
        role: "Growth Strategist",
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
      },
      coverImage:
        data.coverImage ||
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630&q=80",
      readTime: data.readTime || "5 min read",
      status: data.status || "draft",
      featured: data.featured || false,
      publishDate: data.publishDate || new Date().toISOString().split("T")[0]!,
      updatedAt: new Date().toISOString().split("T")[0]!,
      seo: {
        metaTitle: data.seo?.metaTitle || `${title} | GROVISION`,
        metaDescription:
          data.seo?.metaDescription ||
          data.excerpt ||
          "Read actionable insights from GROVISION, helping ambitious brands grow online.",
        targetKeywords: data.seo?.targetKeywords || ["growth marketing", "digital strategy"],
        canonicalUrl: `https://grovision.shop/blog/${slug}`,
        gscStatus: data.status === "published" ? "Submitted" : "Not Submitted",
        searchConsoleUrl: `https://search.google.com/search-console?resource_id=sc-domain:grovision.shop`,
      },
      metrics: {
        views: 0,
        reads: 0,
        gscImpressions: 0,
        gscClicks: 0,
        gscCtr: 0,
        gscPosition: 0,
      },
    };

    const next = [newBlog, ...blogs];
    saveBlogs(next);
    return newBlog;
  };

  const updateBlog = (id: string, updates: Partial<BlogPost>) => {
    const next = blogs.map((b) => {
      if (b.id !== id) return b;
      const updated: BlogPost = {
        ...b,
        ...updates,
        updatedAt: new Date().toISOString().split("T")[0]!,
        seo: {
          ...b.seo,
          ...(updates.seo || {}),
        },
        metrics: {
          ...b.metrics,
          ...(updates.metrics || {}),
        },
      };
      return updated;
    });
    saveBlogs(next);
  };

  const publishBlog = (id: string) => {
    const next = blogs.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        status: "published" as const,
        publishDate: new Date().toISOString().split("T")[0]!,
        updatedAt: new Date().toISOString().split("T")[0]!,
        seo: {
          ...b.seo,
          gscStatus: "Submitted" as const,
        },
      };
    });
    saveBlogs(next);

    // Update GSC indexation count
    saveGsc({
      ...gscConfig,
      totalIndexed: gscConfig.totalIndexed + 1,
      lastSitemapSync: new Date().toISOString().replace("T", " ").substring(0, 16),
    });
  };

  const unpublishBlog = (id: string) => {
    const next = blogs.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        status: "draft" as const,
        updatedAt: new Date().toISOString().split("T")[0]!,
      };
    });
    saveBlogs(next);
  };

  const deleteBlog = (id: string) => {
    const next = blogs.filter((b) => b.id !== id);
    saveBlogs(next);
  };

  const requestGscIndexing = async (id: string): Promise<boolean> => {
    // Simulate real Google Search Console URL Inspection API Ping
    await new Promise((res) => setTimeout(res, 800));
    const next = blogs.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        seo: {
          ...b.seo,
          gscStatus: "Indexed" as const,
          lastCrawledAt: new Date().toISOString().split("T")[0]!,
        },
      };
    });
    saveBlogs(next);
    saveGsc({
      ...gscConfig,
      lastSitemapSync: new Date().toISOString().replace("T", " ").substring(0, 16),
    });
    return true;
  };

  const updateGscConfig = (updates: Partial<GscConfig>) => {
    const next: GscConfig = {
      ...gscConfig,
      ...updates,
    };
    saveGsc(next);
  };

  const submitSitemapToGsc = () => {
    saveGsc({
      ...gscConfig,
      lastSitemapSync: new Date().toISOString().replace("T", " ").substring(0, 16),
      sitemapStatus: "Success",
    });
  };

  const resetBlogsToSample = () => {
    saveBlogs(initialBlogs);
    saveGsc(initialGscConfig);
  };

  const getBlogBySlug = (slug: string): BlogPost | undefined => {
    return blogs.find((b) => b.slug === slug);
  };

  const getPublishedBlogs = (): BlogPost[] => {
    return blogs.filter((b) => b.status === "published");
  };

  return {
    blogs,
    gscConfig,
    createBlog,
    updateBlog,
    publishBlog,
    unpublishBlog,
    deleteBlog,
    requestGscIndexing,
    updateGscConfig,
    submitSitemapToGsc,
    resetBlogsToSample,
    getBlogBySlug,
    getPublishedBlogs,
  };
}

export { initialBlogs };

export function getStaticBlogBySlug(slug: string): BlogPost | undefined {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(KEY_BLOGS);
      if (stored) {
        const parsed = JSON.parse(stored) as BlogPost[];
        const found = parsed.find((b) => b.slug === slug);
        if (found) return found;
      }
    } catch {
      // ignore
    }
  }
  return initialBlogs.find((b) => b.slug === slug);
}
