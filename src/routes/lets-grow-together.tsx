import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCanonicalUrl } from "@/lib/site";

const title = "Let's Grow Together | GROVISION Growth Consultation";
const description =
  "Share your business goals with GROVISION to start a free strategic conversation about SEO, paid advertising, and high-impact digital growth.";

export const Route = createFileRoute("/lets-grow-together")({
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
  }),
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "lets-grow-together", replace: true });
  },
});
