import { Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { useBlogStore } from "@/lib/blog-store";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BlogSection({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const { getPublishedBlogs } = useBlogStore();
  const published = getPublishedBlogs().slice(0, 3);

  return (
    <Section id="journal" tone="ivory">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          as={heading}
          eyebrow="The Journal"
          title="Strategic Insights on Search & Brand Growth."
          intro="Deep-dive perspectives on high-intent SEO, brand clarity, and full-funnel digital execution."
        />
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy transition-colors hover:text-gold shrink-0 mb-2 sm:mb-0"
        >
          View All Articles <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {published.map((post, idx) => (
          <Reveal key={post.id} delay={idx * 80}>
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group flex h-full flex-col justify-between overflow-hidden rounded-lg border border-border bg-white shadow-card transition-all duration-300 hover:border-gold hover:shadow-lift"
            >
              <div>
                <div className="h-48 overflow-hidden bg-navy/5">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={315}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-[11px] text-muted-foreground">
                    <Badge
                      variant="outline"
                      className="border-gold/40 bg-gold/10 text-[10px] font-semibold text-navy"
                    >
                      {post.category}
                    </Badge>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono text-[10px]">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold leading-snug text-navy group-hover:text-gold transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="border-t border-border/60 p-6 pt-3 flex items-center justify-between text-xs font-semibold text-gold">
                <span className="text-[11px] text-muted-foreground font-normal">
                  {post.publishDate}
                </span>
                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
