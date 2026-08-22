import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { brand, contactChannels, navLinks, socialLinks } from "@/lib/site";

const channelIcons = {
  email: Mail,
  whatsapp: MessageCircle,
  phone: Phone,
} as const;

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy px-5 pb-8 pt-16 text-ivory sm:px-8 sm:pt-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="inverted" />
            <p className="eyebrow mt-5 text-gold-soft">{brand.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/70">
              Strategic digital marketing for ambitious businesses that know where they want to go —
              but need the right direction to get there.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow text-ivory/60">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ivory/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-ivory/60">Contact</h2>
            <ul className="mt-5 space-y-3">
              {contactChannels.map((channel) => {
                const Icon = channelIcons[channel.id as keyof typeof channelIcons] ?? Mail;
                return (
                  <li key={channel.id} className="flex items-start gap-3 text-sm text-ivory/80">
                    <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {channel.value ? (
                      <a
                        href={channel.href ?? "#"}
                        className="transition-colors hover:text-gold"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <span>
                        {channel.label}
                        <span className="block text-xs text-ivory/50">Coming soon</span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>

            <h2 className="eyebrow mt-8 text-ivory/60">Social</h2>
            <ul className="mt-4 flex gap-3">
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
                        className="inline-flex h-10 w-10 items-center justify-center border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold"
                      >
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </a>
                    ) : (
                      <span
                        title={`${social.label} — account coming soon`}
                        aria-label={`${social.label} account coming soon`}
                        className="inline-flex h-10 w-10 items-center justify-center border border-dashed border-ivory/20 text-ivory/40"
                      >
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-ivory/15 pt-6">
          <p className="text-xs text-ivory/55">
            &copy; GROVISION {year}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
