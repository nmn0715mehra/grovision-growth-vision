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

const title = "GROVISION | Digital Marketing & Growth Strategy";
const description =
  "GROVISION is a creative and strategic digital marketing brand helping ambitious businesses find clear direction and grow online through strategy, SEO, social media and paid advertising.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "GROVISION",
          slogan: "Where vision meets growth.",
          description,
          areaServed: ["IN", "US", "GB", "EU"],
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
      <BrandIntro />
      <ServicesSection />
      <WhoWeHelp />
      <Approach />
      <PortfolioSection />
      <CaseStudiesSection />
      <AboutSection />
      <Philosophy />
      <ContactSection />
    </>
  );
}
