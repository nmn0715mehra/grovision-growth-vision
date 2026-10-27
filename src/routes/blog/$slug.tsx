import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useBlogStore, getStaticBlogBySlug, type BlogPost } from "@/lib/blog-store";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import {
  Clock,
  Calendar,
  Share2,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  MessageCircle,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createArticleSchema, createBreadcrumbSchema, jsonLdScript } from "@/lib/schema";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const blog = getStaticBlogBySlug(params.slug);
    let title = blog?.seo.metaTitle || blog?.title || `GROVISION Insights | ${params.slug}`;
    if (title.length > 60) {
      title = `${title.substring(0, 57).trim()}...`;
    }

    let description =
      blog?.seo.metaDescription ||
      blog?.excerpt ||
      "Strategic digital marketing, SEO, and brand growth insights from GROVISION.";
    if (description.length > 160) {
      description = `${description.substring(0, 157).trim()}...`;
    }

    const schemas: Record<string, unknown>[] = [];
    if (blog) {
      schemas.push(createArticleSchema(blog));
    }
    schemas.push(
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: blog?.title || params.slug, path: `/blog/${params.slug}` },
      ]),
    );

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        {
          name: "robots",
          content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
        },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [jsonLdScript(schemas)],
    };
  },
  component: BlogPostDetailPage,
});

export function BlogPostDetailPage() {
  const { slug } = Route.useParams();
  const { getBlogBySlug, blogs } = useBlogStore();
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-ivory px-4 py-16 text-center">
        <h1 className="font-display text-4xl font-bold text-navy">Article Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested article may have been moved or unpublished.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded bg-navy px-4 py-2 text-xs font-semibold text-ivory hover:bg-navy-soft"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Return to All Articles
        </Link>
      </div>
    );
  }

  // Related articles
  const relatedPosts = blogs
    .filter((b) => b.id !== blog.id && b.status === "published")
    .slice(0, 2);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied to clipboard!");
    }
  };

  const handleShareWhatsapp = () => {
    const text = encodeURIComponent(
      `Check out "${blog.title}" on GROVISION: ${window.location.href}`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(blog.title);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleShareLinkedin = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <article className="bg-ivory py-10 sm:py-16 text-navy">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        {/* Draft Notice if unpublished */}
        {blog.status === "draft" && (
          <div className="mb-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold">
              <AlertCircle className="h-4 w-4 text-amber-700 shrink-0" />
              <span>
                Pre-Publication Draft Preview — This article is not yet indexed in Google Search.
              </span>
            </div>
            <Link
              to="/admin/blogs"
              className="text-xs font-bold text-amber-900 underline hover:text-black"
            >
              Open in Admin Panel →
            </Link>
          </div>
        )}

        {/* Back Link & Category */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy/70 hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Journal
          </Link>

          <div className="flex items-center gap-2 text-xs">
            <Badge className="bg-gold/15 text-gold-dark border-gold/30 text-[10px] font-semibold">
              {blog.category}
            </Badge>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {blog.readTime}
            </span>
          </div>
        </div>

        {/* Title & Metadata */}
        <header className="mt-8">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy leading-[1.2]">
            {blog.title}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-navy/75 leading-relaxed font-sans border-l-2 border-gold pl-4 italic">
            {blog.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full border border-gold/40 bg-navy flex items-center justify-center font-bold text-xs text-gold">
                GV
              </div>
              <div>
                <span className="font-semibold text-xs text-navy block">{blog.author.name}</span>
                <span className="text-[11px] text-muted-foreground">{blog.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">{blog.publishDate}</span>
              <span className="text-muted-foreground">•</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-1 rounded border border-border bg-white px-2.5 py-1 text-[11px] font-medium text-navy hover:bg-beige transition-colors"
                title="Copy Article Link"
              >
                <Copy className="h-3 w-3" /> Copy Link
              </button>
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        {blog.coverImage && (
          <div className="my-8 overflow-hidden rounded-xl border border-border shadow-card">
            <img
              src={blog.coverImage}
              alt={blog.title}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              width={1200}
              height={630}
              className="w-full h-72 sm:h-96 object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="my-10 font-sans text-navy">
          <MarkdownRenderer content={blog.content} />
        </div>

        {/* Tags */}
        <div className="my-8 flex flex-wrap items-center gap-2 border-t border-border pt-6">
          <span className="text-xs font-semibold text-muted-foreground">Topics:</span>
          {blog.tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-full bg-white border border-border px-3 py-1 font-mono text-[11px] text-navy/80"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Share Bar */}
        <div className="my-8 rounded-xl border border-border bg-beige/30 p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="font-display text-sm font-bold text-navy">Found this valuable?</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Share strategic insights with other founders and marketing leaders
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleShareWhatsapp}
              className="text-xs border-emerald-300 text-emerald-800 hover:bg-emerald-50"
            >
              <MessageCircle className="mr-1.5 h-3.5 w-3.5 text-emerald-600" /> WhatsApp
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleShareLinkedin}
              className="text-xs border-blue-300 text-blue-800 hover:bg-blue-50"
            >
              <Linkedin className="mr-1.5 h-3.5 w-3.5 text-blue-600" /> LinkedIn
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleShareTwitter}
              className="text-xs border-border text-navy hover:bg-white"
            >
              <Twitter className="mr-1.5 h-3.5 w-3.5" /> X
            </Button>
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="my-8 rounded-xl border border-border bg-white p-6 shadow-sm flex items-start gap-4">
          <div className="h-12 w-12 rounded-full border border-gold/40 bg-navy flex items-center justify-center font-bold text-sm text-gold shrink-0">
            GV
          </div>
          <div>
            <h4 className="font-display text-sm font-bold text-navy">About GROVISION</h4>
            <p className="mt-1 text-xs text-navy/75 leading-relaxed">
              GROVISION is a strategic digital marketing and growth brand helping ambitious
              businesses build disciplined SEO frameworks, high-converting digital presence, and
              scalable market share.
            </p>
            <Link
              to="/"
              hash="lets-grow-together"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold hover:underline"
            >
              Book a Growth Consultation with our team →
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="my-12 border-t border-border pt-8">
            <h3 className="font-display text-lg font-bold text-navy mb-6">
              More Strategic Thinking from the Journal
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  to="/blog/$slug"
                  params={{ slug: related.slug }}
                  className="group rounded-lg border border-border bg-white p-5 shadow-sm transition-all hover:border-gold/60 hover:shadow-card block"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gold">
                    {related.category}
                  </span>
                  <h4 className="font-display text-sm font-bold text-navy group-hover:text-gold transition-colors mt-1.5 line-clamp-2">
                    {related.title}
                  </h4>
                  <p className="mt-2 text-xs text-navy/70 line-clamp-2">{related.excerpt}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-gold group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
