import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { Approach } from "@/components/sections/Approach";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { Philosophy } from "@/components/sections/Philosophy";
import { ContactSection } from "@/components/sections/ContactSection";
import { BlogSection } from "@/components/sections/BlogSection";

import { getCanonicalUrl } from "@/lib/site";

const title = "GROVISION | Digital Marketing & Growth Strategy";
const description =
  "GROVISION is a strategic digital marketing brand helping ambitious businesses scale online with data-driven SEO, paid media, and growth strategy.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: getCanonicalUrl("/") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: getCanonicalUrl("/") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://grovision.shop/#organization",
              name: "GROVISION",
              url: "https://grovision.shop/",
              logo: "https://grovision.shop/brand/logo-horizontal.webp",
              slogan: "Where vision meets growth.",
              description,
              areaServed: ["IN", "US", "GB", "EU"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: "growth@grovision.shop",
              },
            },
            {
              "@type": "WebSite",
              "@id": "https://grovision.shop/#website",
              url: "https://grovision.shop/",
              name: "GROVISION",
              description,
              publisher: {
                "@id": "https://grovision.shop/#organization",
              },
              inLanguage: "en-US",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <ContactSection heading="h2" leadPage />
      <ServicesSection />
      <PortfolioSection />
      <CaseStudiesSection />
      <BlogSection />
      <AboutSection />
      <BrandIntro />
      <Philosophy />
      <WhoWeHelp />
      <Approach />
    </>
  );
}
