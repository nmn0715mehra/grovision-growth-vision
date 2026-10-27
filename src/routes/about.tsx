import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/sections/AboutSection";
import { Philosophy } from "@/components/sections/Philosophy";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { Approach } from "@/components/sections/Approach";
import { ContactSection } from "@/components/sections/ContactSection";
import {
  createProfilePageSchema,
  createPersonSchema,
  createBreadcrumbSchema,
  jsonLdScript,
} from "@/lib/schema";

const title = "About GROVISION | Strategic Digital Marketing Brand";
const description =
  "Learn about GROVISION: an emerging digital marketing brand built on strategy before execution, dedicated to transparent, measurable client growth.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [
      jsonLdScript([
        createProfilePageSchema(),
        createPersonSchema(),
        createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      ]),
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <AboutSection heading="h1" />
      <BrandIntro />
      <Philosophy />
      <Approach />
      <ContactSection />
    </>
  );
}
