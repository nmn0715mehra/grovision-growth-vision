import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/sections/AboutSection";
import { Philosophy } from "@/components/sections/Philosophy";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { Approach } from "@/components/sections/Approach";
import { ContactSection } from "@/components/sections/ContactSection";
import { getCanonicalUrl } from "@/lib/site";

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
      { property: "og:url", content: getCanonicalUrl("/about") },
    ],
    links: [{ rel: "canonical", href: getCanonicalUrl("/about") }],
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
