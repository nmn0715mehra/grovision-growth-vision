import { type BlogPost, type AITopicIdea } from "./blog-store";

export interface GenerateTopicParams {
  niche: string;
  pillar: string;
  tone: string;
}

export interface GenerateBlogParams {
  topic: string;
  category: BlogPost["category"];
  targetKeyword?: string;
  tone: string;
  wordCount?: "standard" | "deep-dive";
  includeTakeaways?: boolean;
  includeChecklist?: boolean;
  includeCta?: boolean;
}

// Curated high-res Unsplash business, marketing, and SEO imagery
const CURATED_COVERS = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630&q=80",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&h=630&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=630&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&h=630&q=80",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&h=630&q=80",
  "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c1d9?auto=format&fit=crop&w=1200&h=630&q=80",
];

export async function generateTopicsWithAI(params: GenerateTopicParams): Promise<AITopicIdea[]> {
  // Simulate intelligent generation delay
  await new Promise((resolve) => setTimeout(resolve, 900));

  const { niche, pillar, tone } = params;

  return [
    {
      id: `topic-${Date.now()}-1`,
      topic: `The 2026 ${niche} Growth Architecture: Scaling Beyond Paid Ad Saturation`,
      pillar,
      angle: "Strategic / Authority",
      targetKeywords: [`${niche.toLowerCase()} growth strategy`, "organic scaling", "lower cac"],
      intent: "Commercial",
      difficulty: 38,
      volume: 2400,
      outline: [
        "Why paid ad efficiency hits a hard plateau at scale",
        "The 3-layer brand moat: Search, Retention, and Community",
        "Building organic pipeline that compounds month over month",
        "The GROVISION 90-day scaling framework",
      ],
    },
    {
      id: `topic-${Date.now()}-2`,
      topic: `Intent-Driven SEO for ${niche}: How to Rank for High-Ticket Buying Queries`,
      pillar,
      angle: "High Conversion / Bottom-of-Funnel",
      targetKeywords: [
        `${niche.toLowerCase()} seo guide`,
        "commercial search intent",
        "serp optimization",
      ],
      intent: "Transactional",
      difficulty: 44,
      volume: 3100,
      outline: [
        "The fatal flaw of optimizing for raw keyword volume",
        "Mapping buyer psychology: Comparison, Evaluation, and Action keywords",
        "Architecting high-converting landing pages for organic traffic",
        "Measuring pipeline attribution from organic search",
      ],
    },
    {
      id: `topic-${Date.now()}-3`,
      topic: `Brand Positioning Masterclass: Making Your ${niche} Offering The Only Logical Choice`,
      pillar,
      angle: "Brand Authority & Pricing Power",
      targetKeywords: ["brand positioning strategy", "category design", "premium pricing"],
      intent: "Thought Leadership",
      difficulty: 32,
      volume: 1800,
      outline: [
        "Why competing on features and pricing is a race to the bottom",
        "The 4-step positioning framework that makes competitors irrelevant",
        "Translating abstract positioning into punchy ad creative and web copy",
        "Real-world case analysis of brand repositioning",
      ],
    },
    {
      id: `topic-${Date.now()}-4`,
      topic: `Multi-Touch Attribution for ${niche} in the Post-Cookie Era`,
      pillar,
      angle: "Data-Driven / Performance",
      targetKeywords: [
        "marketing attribution modeling",
        "mer ratio calculation",
        "post cookie measurement",
      ],
      intent: "Commercial",
      difficulty: 49,
      volume: 1500,
      outline: [
        "Why platform-reported ROAS is lying to you",
        "Understanding Blended Marketing Efficiency Ratio (MER)",
        "Zero-party data and qualitative survey collection",
        "Allocating marketing budget with statistical confidence",
      ],
    },
    {
      id: `topic-${Date.now()}-5`,
      topic: `The Technical SEO Audit Checklist Every ${niche} Business Needs in 2026`,
      pillar,
      angle: "Actionable / Step-by-Step",
      targetKeywords: [
        "technical seo audit checklist",
        "core web vitals optimization",
        "crawl budget",
      ],
      intent: "Informational",
      difficulty: 35,
      volume: 4200,
      outline: [
        "Crawl budget optimization and robots.txt architecture",
        "Schema markup JSON-LD for rich snippet prominence",
        "Sub-2s mobile loading speeds and Core Web Vitals",
        "Automated sitemap submission to Google Search Console",
      ],
    },
  ];
}

export async function generateBlogWithAI(
  params: GenerateBlogParams,
): Promise<Omit<BlogPost, "id">> {
  // Simulate intelligent generation delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const {
    topic,
    category,
    targetKeyword = topic.toLowerCase().split(" ")[0] || "growth",
    tone,
    wordCount = "standard",
    includeTakeaways = true,
    includeChecklist = true,
    includeCta = true,
  } = params;

  const slug = topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const readTime = wordCount === "deep-dive" ? "8 min read" : "5 min read";
  const coverImage = CURATED_COVERS[Math.floor(Math.random() * CURATED_COVERS.length)]!;

  const takeawaysBlock = includeTakeaways
    ? `### Key Takeaways

- **Intent Dominates Volume**: Capturing high-intent commercial search queries yields up to 4x higher customer lifetime value than chasing generic keywords.
- **Unified Growth Engine**: Sustainable brand momentum requires search, brand positioning, and performance media working as a single synchronised system.
- **Compounding Flywheel**: Organic SEO and technical speed build permanent enterprise equity that does not disappear when ad spend pauses.

---`
    : "";

  const checklistBlock = includeChecklist
    ? `### Actionable Implementation Checklist

- [ ] **Audit Existing Keyword Rankings**: Identify pages ranking between positions 4-15 with high conversion potential.
- [ ] **Strengthen Internal Linking**: Link relevant sub-topics back to your core service and category pillar pages.
- [ ] **Optimize Search Snippets**: Align Title Tag (<60 characters) and Meta Description (<155 characters) for maximum CTR.
- [ ] **Verify Core Web Vitals**: Ensure LCP is under 2.5s and mobile layout shifts are zero.
- [ ] **Sync Google Search Console**: Submit your sitemap XML and inspect newly deployed URLs for instant indexing.

---`
    : "";

  const ctaBlock = includeCta
    ? `### Ready to Scale Your Brand with Certainty?

At **GROVISION**, we don't believe in generic vanity metrics or disconnected marketing tactics. We build custom, revenue-focused growth frameworks that help ambitious businesses dominate search and scale profitably.

**[Schedule a Growth Consultation with GROVISION](/lets-grow-together)** to map your brand's full-funnel expansion.`
    : "";

  const content = `## Executive Overview

In the modern digital landscape, businesses that rely exclusively on one acquisition channel are perpetually vulnerable. Customer acquisition costs across paid platforms fluctuate wildly, while organic algorithms reward only those brands demonstrating undeniable topical authority and technical excellence.

To build an enduring, defensible brand in 2026, leadership teams must execute a deliberate synthesis: **crystal-clear brand positioning**, **intent-driven search visibility**, and **honest full-funnel measurement**.

${takeawaysBlock}

## The Core Problem: Why Traditional Tactics Are Failing

For years, the standard playbook was simple: launch ad campaigns, write generic 500-word articles, and purchase disjointed software tools. 

Today, buyers have evolved. They research across an average of 12 touchpoints before making a buying decision. They cross-reference search engine results, evaluate case studies, and scrutinize brand credibility.

> "A brand is not what you tell the customer it is. It is what search engines and buyers discover when they seek the truth."

### The Three Friction Points Killing Scale

1. **Diluted Value Proposition**: When messaging sounds identical to competitors, customer acquisition costs skyrocket.
2. **Disconnected Marketing Silos**: Content writers, media buyers, and developers operating without a shared commercial goal.
3. **Flawed Measurement**: Blindly optimizing toward in-platform last-click ROAS rather than holistic business profit.

---

## The Strategic Framework for Sustained Growth

### Pillar 1: High-Intent Search Architecture
Instead of writing superficial content, focus on **Commercial Investigation** queries. These are high-converting searches where prospective clients are actively comparing solutions.

Structure every article with clear headings, semantic HTML schema, and answers engineered for modern Answer Engine Optimization (AEO).

### Pillar 2: Technical Integrity & Fast Mobile Delivery
Google's modern crawl budget favors ultra-fast, clean web experiences. Ensure:
- 100% responsive, mobile-first design.
- Edge-rendered server delivery.
- Instant submission to Google Search Console via automated sitemap protocols.

### Pillar 3: Compounding Content Moats
Publishing consistently signals active authority to search crawlers. Every new insight published strengthens the domain rating and expands the net of qualified buyer queries.

${checklistBlock}

${ctaBlock}`;

  const safeTopic = topic.length > 46 ? topic.substring(0, 43).trim() + "..." : topic;
  const metaTitle = `${safeTopic} | GROVISION`;
  let metaDescription = `Discover strategic insights on ${topic.toLowerCase()}. Learn how GROVISION helps ambitious brands build clarity and scale profitably online.`;
  if (metaDescription.length > 160) {
    metaDescription = `${metaDescription.substring(0, 157).trim()}...`;
  }

  return {
    title: topic,
    slug,
    excerpt: `A strategic deep dive into ${topic.toLowerCase()}, exploring high-intent search capture, brand clarity, and actionable growth frameworks.`,
    content,
    category,
    tags: [category.split("&")[0]?.trim() || "Growth", "SEO", "Strategy"],
    author: {
      name: "GROVISION Editorial",
      role: "Growth & SEO Practice",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
    },
    coverImage,
    readTime,
    status: "draft",
    publishDate: new Date().toISOString().split("T")[0]!,
    updatedAt: new Date().toISOString().split("T")[0]!,
    featured: false,
    seo: {
      metaTitle,
      metaDescription,
      targetKeywords: [targetKeyword, "growth strategy", "grovision insights"],
      canonicalUrl: `https://grovision.shop/blog/${slug}`,
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
  };
}
