import { brand, services, contactChannels } from "@/lib/site";
import type { BlogPost } from "@/lib/blog-store";

export const SITE_URL = "https://grovision.shop";
export const SITE_NAME = brand.name;
export const SITE_TAGLINE = brand.tagline;
export const SITE_DESCRIPTION = brand.description;

const emailChannel = contactChannels.find((c) => c.id === "email");
const phoneChannel = contactChannels.find((c) => c.id === "phone");

export const CONTACT_EMAIL = emailChannel?.value || "nmn0715mehra@gmail.com";
export const CONTACT_PHONE = phoneChannel?.value || "+91 88242 01010";
export const PERSON_NAME = "Naman Mehra";
export const PERSON_ROLE = "Founder & Digital Marketing Strategist";
export const PERSON_IMAGE = `${SITE_URL}/images/site/about-strategy-studio.jpg`;

/**
 * Creates Schema.org Organization structured data.
 */
export function createOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    slogan: "Where vision meets growth.",
    description: SITE_DESCRIPTION,
    areaServed: ["IN", "US", "GB", "EU"],
    founder: {
      "@id": `${SITE_URL}/#person`,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT_PHONE,
      contactType: "customer support",
      email: `mailto:${CONTACT_EMAIL}`,
      availableLanguage: ["en", "hi"],
    },
  };
}

/**
 * Creates Schema.org WebSite structured data.
 */
export function createWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en",
  };
}

/**
 * Creates Schema.org Person structured data.
 */
export function createPersonSchema(pageUrl = `${SITE_URL}/about`) {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: PERSON_NAME,
    url: pageUrl,
    jobTitle: PERSON_ROLE,
    description:
      "Behind GROVISION is one person building this brand deliberately and openly, focusing on digital marketing strategy, SEO, and business growth.",
    image: PERSON_IMAGE,
    email: `mailto:${CONTACT_EMAIL}`,
    telephone: CONTACT_PHONE,
    worksFor: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

/**
 * Creates Schema.org ProfilePage structured data for the About page.
 */
export function createProfilePageSchema() {
  return {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/about#webpage`,
    url: `${SITE_URL}/about`,
    name: "About GROVISION | Strategic Digital Marketing Brand",
    description:
      "Learn about GROVISION: an emerging digital marketing brand built on strategy before execution, dedicated to transparent, measurable client growth.",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PERSON_NAME,
      url: `${SITE_URL}/about`,
      jobTitle: PERSON_ROLE,
      description:
        "Behind GROVISION is one person building this brand deliberately and openly: learning digital marketing in depth, building practical skills across strategy, content, search and paid media, preparing for internship experience and planning to begin freelancing.",
      image: PERSON_IMAGE,
      email: `mailto:${CONTACT_EMAIL}`,
      telephone: CONTACT_PHONE,
      worksFor: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  };
}

/**
 * Creates Schema.org Service structured data for each service offered.
 */
export function createServicesSchema() {
  return services.map((service) => ({
    "@type": "Service",
    "@id": `${SITE_URL}/services#${service.id}`,
    name: service.name,
    description: `${service.summary} ${service.detail}`,
    serviceType: "Digital Marketing",
    url: `${SITE_URL}/services`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: ["IN", "US", "GB", "EU"],
  }));
}

/**
 * Creates Schema.org BreadcrumbList structured data.
 */
export function createBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const itemUrl = item.path.startsWith("http")
        ? item.path
        : `${SITE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: itemUrl,
      };
    }),
  };
}

/**
 * Creates Schema.org Article structured data for blog posts.
 */
export function createArticleSchema(blog: BlogPost) {
  const blogUrl = `${SITE_URL}/blog/${blog.slug}`;
  return {
    "@type": "Article",
    "@id": `${blogUrl}#article`,
    headline: blog.title,
    description: blog.seo?.metaDescription || blog.excerpt,
    image: [blog.coverImage],
    datePublished: blog.publishDate,
    dateModified: blog.updatedAt || blog.publishDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogUrl,
    },
    author: {
      "@type": "Person",
      name: blog.author.name,
      jobTitle: blog.author.role,
      url: `${SITE_URL}/about`,
      ...(blog.author.avatarUrl ? { image: blog.author.avatarUrl } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.png`,
      },
    },
    articleSection: blog.category,
    keywords: blog.tags.join(", "),
    inLanguage: "en",
  };
}

/**
 * Creates Schema.org ContactPage structured data.
 */
export function createContactPageSchema() {
  return {
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact#webpage`,
    url: `${SITE_URL}/contact`,
    name: "Contact GROVISION | Start Your Growth Consultation",
    description:
      "Contact GROVISION directly via email, WhatsApp, or phone. Discuss your digital marketing goals and request a strategic growth consultation today.",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      telephone: CONTACT_PHONE,
      email: `mailto:${CONTACT_EMAIL}`,
    },
  };
}

/**
 * Wraps schemas in a TanStack Router script object with application/ld+json.
 */
export function jsonLdScript(data: Record<string, unknown> | Array<Record<string, unknown>>) {
  const schemaObj = Array.isArray(data)
    ? {
        "@context": "https://schema.org",
        "@graph": data,
      }
    : {
        "@context": "https://schema.org",
        ...data,
      };

  return {
    type: "application/ld+json",
    children: JSON.stringify(schemaObj),
  };
}
