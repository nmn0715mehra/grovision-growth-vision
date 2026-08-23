import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/sections/AboutSection";
import { Philosophy } from "@/components/sections/Philosophy";
import { Approach } from "@/components/sections/Approach";
import { ContactSection } from "@/components/sections/ContactSection";

const title = "About GROVISION | An Emerging Digital Marketing Brand";
const description =
  "GROVISION is an emerging Indian digital marketing brand built on strategy before execution — honest about its current stage, serious about its standards.";

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
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <AboutSection heading="h1" />
      <Philosophy />
      <Approach />
      <ContactSection />
    </>
  );
}
