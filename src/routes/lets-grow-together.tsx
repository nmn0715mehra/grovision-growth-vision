import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/sections/ContactSection";
import { Philosophy } from "@/components/sections/Philosophy";

const title = "Let's Grow Together | GROVISION Growth Consultation";
const description =
  "Share your business, goals and requirements with GROVISION and start a free first conversation about digital marketing and growth.";

export const Route = createFileRoute("/lets-grow-together")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/lets-grow-together" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/lets-grow-together" }],
  }),
  component: LetsGrowTogetherPage,
});

function LetsGrowTogetherPage() {
  return (
    <>
      <ContactSection heading="h1" leadPage />
      <Philosophy />
    </>
  );
}
