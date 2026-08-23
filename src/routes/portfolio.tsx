import { createFileRoute } from "@tanstack/react-router";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";

const title = "Portfolio | Concept & Sample Work — GROVISION";
const description =
  "Self-initiated concept and sample work from GROVISION across brand strategy, social media, SEO, paid media and growth — clearly labelled, never presented as client work.";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <>
      <PortfolioSection heading="h1" />
      <CaseStudiesSection />
    </>
  );
}
