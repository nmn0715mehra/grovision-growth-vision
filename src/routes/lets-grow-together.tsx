import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/sections/ContactSection";
import { Philosophy } from "@/components/sections/Philosophy";

const title = "Contact GROVISION | Start a Conversation";
const description =
  "Tell us about your business, your goals and where you want to go. A free first consultation with GROVISION — digital marketing strategy, SEO, social media and paid media.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <ContactSection heading="h1" />
      <Philosophy />
    </>
  );
}
