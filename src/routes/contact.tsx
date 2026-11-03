import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { contactChannels, socialLinks, getCanonicalUrl } from "@/lib/site";

const title = "Contact GROVISION | Start Your Growth Consultation";
const description =
  "Contact GROVISION directly via email, WhatsApp, or phone. Discuss your digital marketing goals and request a strategic growth consultation today.";

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
      { property: "og:url", content: getCanonicalUrl("/contact") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: getCanonicalUrl("/contact") }],
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
        intro="Reach GROVISION directly, or share your business and goals in our Let’s Grow Together section."
      />
      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:gap-16">
        <Reveal>
          <div>
            <h2 className="eyebrow text-navy">Direct Channels</h2>
            <ul className="mt-5 grid gap-px border border-border bg-border">
              {contactChannels.map((channel) => {
                const Icon = channelIcons[channel.id as keyof typeof channelIcons] ?? Mail;
                const isExternal = Boolean(channel.href && channel.href.startsWith("http"));
                return (
                  <li key={channel.id} className="bg-ivory">
                    {channel.href ? (
                      <a
                        href={channel.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "nofollow noopener noreferrer" : undefined}
                        className="flex items-center gap-4 p-5 text-navy transition-colors hover:text-gold"
                      >
                        <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-gold" />
                        <span>
                          <span className="eyebrow block text-muted-foreground">
                            {channel.label}
                          </span>
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
                to="/"
                hash="lets-grow-together"
                className="mt-6 inline-flex items-center gap-2 border border-navy bg-navy px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-navy-soft"
              >
                Let&apos;s Grow Together <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div>
              <h2 className="eyebrow text-navy">Social Channels</h2>
              <ul className="mt-5 flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = socialIcons[social.id as keyof typeof socialIcons] ?? Instagram;
                  return (
                    <li key={social.id}>
                      {social.url ? (
                        <a
                          href={social.url}
                          target="_blank"
                          rel="nofollow noreferrer noopener"
                          aria-label={`GROVISION on ${social.label}`}
                          className="inline-flex h-11 w-11 items-center justify-center border border-navy/20 text-navy transition-colors hover:border-gold hover:text-gold"
                        >
                          <Icon aria-hidden="true" className="h-4 w-4" />
                        </a>
                      ) : (
                        <span
                          aria-label={`${social.label} account coming soon`}
                          title={`${social.label} — account coming soon`}
                          className="inline-flex h-11 w-11 items-center justify-center border border-dashed border-navy/20 text-navy/35"
                        >
                          <Icon aria-hidden="true" className="h-4 w-4" />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Official GROVISION social accounts are not live yet, so nothing here links anywhere
                unverified.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Consultation Framework Section */}
      <div className="mt-16 border-t border-border pt-14">
        <Reveal>
          <div className="max-w-3xl">
            <span className="eyebrow text-gold">Consultation Framework</span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              What to Expect When You Contact GROVISION
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              We approach every strategic inquiry with thorough preparation and disciplined
              analysis. Before recommending any marketing activity, we study your target market,
              channel economics, and existing organic baseline. Whether you are scaling an
              established e-commerce presence or building an initial market footprint, our
              consultation provides clear, actionable direction tailored to your commercial stage.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={60} className="border border-border bg-ivory p-6">
            <div className="flex items-center gap-2.5 text-navy">
              <Clock className="h-4 w-4 text-gold shrink-0" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy">
                24-Hour Response Standard
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Direct inquiries receive a personalized initial response from our growth team within
              24 business hours. We review your website, public footprint, and commercial focus
              before reaching out.
            </p>
          </Reveal>

          <Reveal delay={120} className="border border-border bg-ivory p-6">
            <div className="flex items-center gap-2.5 text-navy">
              <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy">
                Confidentiality Assurance
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              All commercial details, growth bottlenecks, analytics metrics, and strategic plans
              shared during consultations remain strictly protected under full confidentiality
              standards.
            </p>
          </Reveal>

          <Reveal
            delay={180}
            className="border border-border bg-ivory p-6 sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-2.5 text-navy">
              <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy">
                Clear Strategic Diagnosis
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              We provide an objective diagnosis of where your highest-leverage growth opportunities
              reside across organic search, performance acquisition, and brand conversion
              architecture.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Consultation FAQ Section */}
      <div className="mt-14 border-t border-border pt-12">
        <Reveal>
          <div className="max-w-3xl">
            <span className="eyebrow text-gold">Common Inquiries</span>
            <h2 className="mt-2 font-display text-xl sm:text-2xl font-bold tracking-tight text-navy">
              Frequently Asked Consultation Questions
            </h2>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={60} className="border border-border bg-ivory p-6">
            <h3 className="text-sm font-bold text-navy">How should we prepare?</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Share your current domain URL, core audience, and immediate business objective. Having
              access to high-level Google Search Console or ad baseline figures helps us pinpoint
              priorities quickly.
            </p>
          </Reveal>

          <Reveal delay={120} className="border border-border bg-ivory p-6">
            <h3 className="text-sm font-bold text-navy">Is there any financial commitment?</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              None. The initial 30-minute growth discussion is entirely exploratory and free of
              obligation. We assess your landscape and provide an honest determination of mutual
              fit.
            </p>
          </Reveal>

          <Reveal delay={180} className="border border-border bg-ivory p-6">
            <h3 className="text-sm font-bold text-navy">What happens after the call?</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Following the call, we share a focused summary highlighting discovered bottlenecks,
              prioritized organic and paid levers, and proposed milestones. You may execute
              internally or collaborate with us.
            </p>
          </Reveal>

          <Reveal delay={240} className="border border-border bg-ivory p-6">
            <h3 className="text-sm font-bold text-navy">Who leads the discussion?</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Your consultation is conducted directly with senior growth strategists, not sales
              representatives. Every conversation centers on practical marketing mechanics and
              measurable growth for your brand.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
