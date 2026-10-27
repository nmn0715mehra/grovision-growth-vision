import { createFileRoute } from "@tanstack/react-router";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { Approach } from "@/components/sections/Approach";
import { ContactSection } from "@/components/sections/ContactSection";
import { createServicesSchema, createBreadcrumbSchema, jsonLdScript } from "@/lib/schema";

const title = "Digital Marketing Services & SEO Strategy | GROVISION";
const description =
  "Strategic digital marketing services by GROVISION: SEO, paid ads, brand positioning, and social media management tied directly to your business goals.";

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
    scripts: [
      jsonLdScript([
        ...createServicesSchema(),
        createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]),
      ]),
    ],
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
