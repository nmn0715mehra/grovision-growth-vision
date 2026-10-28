import { createFileRoute } from "@tanstack/react-router";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { getCanonicalUrl } from "@/lib/site";

const title = "Case Studies | Digital Marketing Results | GROVISION";
const description =
  "In-depth digital marketing case studies from GROVISION. See our strategies, execution frameworks, and measurable outcomes for business growth.";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: getCanonicalUrl("/case-studies") },
    ],
    links: [{ rel: "canonical", href: getCanonicalUrl("/case-studies") }],
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
