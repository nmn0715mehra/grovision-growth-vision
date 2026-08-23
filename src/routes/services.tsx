import { createFileRoute } from "@tanstack/react-router";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { Approach } from "@/components/sections/Approach";
import { ContactSection } from "@/components/sections/ContactSection";

const title = "Services | Digital Marketing Strategy, SEO & Paid Media — GROVISION";
const description =
  "Digital marketing strategy, brand strategy, growth strategy, social media management, SEO and paid advertising — six connected disciplines, each tied to your business goals.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <ServicesSection heading="h1" />
      <Approach />
      <WhoWeHelp />
      <ContactSection />
    </>
  );
}
