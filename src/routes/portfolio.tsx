import { createFileRoute } from "@tanstack/react-router";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";

const title = "Portfolio | Creative & Growth Campaigns | GROVISION";
const description =
  "Explore GROVISION portfolio samples across brand strategy, SEO campaigns, social media, and paid advertising designed for scalable business growth.";

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
