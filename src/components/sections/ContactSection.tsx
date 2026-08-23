import { Instagram, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import { Section, SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { ContactForm } from "../ContactForm";
import { contactChannels, socialLinks } from "@/lib/site";

const channelIcons = {
  email: Mail,
  whatsapp: MessageCircle,
  phone: Phone,
} as const;

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
} as const;

export function ContactSection({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <Section id="contact" tone="beige">
      <SectionHeading
        as={heading}
        eyebrow="Contact"
        title="Ready to give your vision a direction?"
        intro="Tell us about your business, your goals and where you want to go."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:gap-16">
        <Reveal>
          <ContactForm />
        </Reveal>

        <div className="space-y-10">
          <Reveal delay={80}>
            <div className="border border-border bg-ivory p-6 sm:p-7">
              <h3 className="eyebrow text-gold">Free First Consultation</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The first conversation is free and without obligation — a direct discussion about
                your business, where you want to go and whether GROVISION is the right fit.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div>
              <h3 className="eyebrow text-navy">Direct Channels</h3>
              <ul className="mt-5 grid gap-px border border-border bg-border">
                {contactChannels.map((channel) => {
                  const Icon = channelIcons[channel.id as keyof typeof channelIcons] ?? Mail;
                  const active = Boolean(channel.value && channel.href);
                  return (
                    <li key={channel.id} className="bg-ivory">
                      {active ? (
                        <a
                          href={channel.href}
                          className="flex items-center gap-4 p-4 text-sm text-navy transition-colors hover:text-gold"
                        >
                          <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
                          <span>
                            <span className="eyebrow block text-muted-foreground">
                              {channel.label}
                            </span>
                            <span className="mt-1 block font-medium">{channel.value}</span>
                          </span>
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 p-4 text-sm">
                          <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-navy/30" />
                          <span>
                            <span className="eyebrow block text-muted-foreground">
                              {channel.label}
                            </span>
                            <span className="mt-1 block text-xs text-muted-foreground">
                              Being set up — use the form for now
                            </span>
                          </span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div>
              <h3 className="eyebrow text-navy">Social</h3>
              <ul className="mt-5 flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = socialIcons[social.id as keyof typeof socialIcons] ?? Instagram;
                  return (
                    <li key={social.id}>
                      {social.url ? (
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noreferrer noopener"
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
    </Section>
  );
}
