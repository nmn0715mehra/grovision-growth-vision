import { createFileRoute } from "@tanstack/react-router";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";

const title = "Case Studies | Coming Soon — GROVISION";
const description =
  "As GROVISION grows, this space will showcase real strategies, challenges, solutions and measurable outcomes — challenge, objective, strategy, execution, results and learnings.";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/case-studies" },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <>
      <CaseStudiesSection heading="h1" />
      <PortfolioSection />
    </>
  );
}
