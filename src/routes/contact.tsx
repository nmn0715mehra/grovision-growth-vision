import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { contactChannels, socialLinks } from "@/lib/site";

const title = "Contact GROVISION | Email, WhatsApp & Phone";
const description =
  "Get in touch with GROVISION directly by email, WhatsApp or phone, or share your goals through our growth consultation inquiry page.";

const channelIcons = { email: Mail, whatsapp: MessageCircle, phone: Phone } as const;
const socialIcons = { instagram: Instagram, linkedin: Linkedin } as const;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Section tone="beige">
      <SectionHeading
        as="h1"
        eyebrow="Contact"
        title="GET IN TOUCH"
        intro="Reach GROVISION directly, or share your business and goals through our inquiry page."
      />
      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:gap-16">
        <Reveal>
          <div>
            <h2 className="eyebrow text-navy">Direct Channels</h2>
            <ul className="mt-5 grid gap-px border border-border bg-border">
              {contactChannels.map((channel) => {
                const Icon = channelIcons[channel.id as keyof typeof channelIcons] ?? Mail;
                return (
                  <li key={channel.id} className="bg-ivory">
                    {channel.href ? (
                      <a href={channel.href} className="flex items-center gap-4 p-5 text-navy transition-colors hover:text-gold">
                        <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-gold" />
                        <span>
                          <span className="eyebrow block text-muted-foreground">{channel.label}</span>
                          <span className="mt-1 block font-medium">{channel.value}</span>
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-5 text-muted-foreground">
                        <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                        <span>{channel.label} — coming soon</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
        <div className="space-y-10">
          <Reveal delay={80}>
            <div className="border border-border bg-ivory p-6 sm:p-7">
              <h2 className="eyebrow text-gold">Free First Consultation</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The first conversation is free and without obligation — a direct discussion about
                your business, where you want to go and whether GROVISION is the right fit.
              </p>
              <Link
                to="/lets-grow-together"
                className="mt-6 inline-flex items-center gap-2 border border-navy bg-navy px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-navy-soft"
              >
                Let&apos;s Grow Together <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div>
              <h2 className="eyebrow text-navy">Social</h2>
              <ul className="mt-5 flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = socialIcons[social.id as keyof typeof socialIcons] ?? Instagram;
                  return (
                    <li key={social.id}>
                      {social.url ? (
                        <a href={social.url} target="_blank" rel="noreferrer noopener" aria-label={`GROVISION on ${social.label}`} className="inline-flex h-11 w-11 items-center justify-center border border-navy/20 text-navy transition-colors hover:border-gold hover:text-gold">
                          <Icon aria-hidden="true" className="h-4 w-4" />
                        </a>
                      ) : (
                        <span aria-label={`${social.label} account coming soon`} title={`${social.label} — account coming soon`} className="inline-flex h-11 w-11 items-center justify-center border border-dashed border-navy/20 text-navy/35">
                          <Icon aria-hidden="true" className="h-4 w-4" />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Official GROVISION social accounts are not live yet, so nothing here links anywhere unverified.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}