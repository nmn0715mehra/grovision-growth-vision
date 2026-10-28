import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useBlogStore, type BlogPost } from "@/lib/blog-store";
import { Search, ArrowRight, Clock, Calendar, Sparkles, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getCanonicalUrl } from "@/lib/site";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "The GROVISION Journal | SEO, Brand & Growth Insights" },
      {
        name: "description",
        content:
          "Strategic insights on SEO, brand positioning, performance media, and digital growth strategies for founders and marketing leaders from GROVISION.",
      },
      { property: "og:title", content: "The GROVISION Journal | Growth & SEO Insights" },
      {
        property: "og:description",
        content:
          "Deep perspectives on modern SEO and digital brand growth. For founders and leaders who value clarity over trends.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: getCanonicalUrl("/blog") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: getCanonicalUrl("/blog") }],
  }),
  component: BlogIndexPage,
});

export function BlogIndexPage() {
  const { getPublishedBlogs } = useBlogStore();
  const publishedBlogs = getPublishedBlogs();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "SEO & Organic Growth",
    "Brand Strategy",
    "Performance & Paid Ads",
    "Conversion Optimization",
  ];

  const filtered = publishedBlogs.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filtered.find((p) => p.featured) || filtered[0];
  const regularPosts = featuredPost ? filtered.filter((p) => p.id !== featuredPost.id) : filtered;

  return (
    <div className="bg-ivory py-10 sm:py-12 lg:py-16 text-navy">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header Hero */}
        <div className="border-b border-border pb-12 sm:pb-16">
          <span className="eyebrow text-gold font-bold uppercase tracking-widest text-xs">
            The GROVISION Journal
          </span>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-navy max-w-3xl leading-[1.15]">
            Strategic Thinking for Brands with Long Horizons.
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-navy/75 leading-relaxed font-sans">
            Actionable insights on high-intent SEO, brand clarity, and full-funnel digital
            execution. Written for founders and growth leaders who value direction over noise.
          </p>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-navy text-ivory shadow-sm"
                      : "bg-white text-navy/70 hover:bg-beige border border-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs bg-white border-border"
              />
            </div>
          </div>
        </div>

        {/* Featured Post Card */}
        {featuredPost && (
          <section className="my-12">
            <Link
              to="/blog/$slug"
              params={{ slug: featuredPost.slug }}
              className="group block overflow-hidden rounded-xl border border-border bg-white shadow-card transition-all duration-300 hover:shadow-lift hover:border-gold/60 lg:grid lg:grid-cols-12"
            >
              <div className="lg:col-span-7 overflow-hidden h-64 sm:h-96">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-5 bg-white">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-gold/15 text-gold-dark border-gold/30 text-[11px] font-semibold">
                      Featured • {featuredPost.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-navy group-hover:text-gold transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="mt-4 text-sm text-navy/70 leading-relaxed font-sans line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-navy text-gold font-bold text-[10px] flex items-center justify-center">
                      GV
                    </div>
                    <span className="text-xs font-semibold text-navy">
                      {featuredPost.author.name}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Regular Articles Grid */}
        <section className="my-12">
          {regularPosts.length === 0 && !featuredPost ? (
            <div className="rounded-xl border border-dashed border-border bg-white p-12 text-center">
              <p className="text-sm text-muted-foreground">
                No articles found matching "{searchQuery}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-3 text-xs font-semibold text-gold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-white shadow-card transition-all duration-300 hover:shadow-lift hover:border-gold/60"
                >
                  <div>
                    <div className="overflow-hidden h-48">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3 text-[11px] text-muted-foreground">
                        <Badge
                          variant="outline"
                          className="border-navy/20 text-navy text-[10px] font-medium"
                        >
                          {post.category}
                        </Badge>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="font-display text-lg font-bold tracking-tight text-navy group-hover:text-gold transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="mt-2.5 text-xs text-navy/70 leading-relaxed font-sans line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-border/40 mt-4 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-muted-foreground">{post.publishDate}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-gold group-hover:translate-x-0.5 transition-transform">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Growth Consultation Banner */}
        <div className="mt-16 rounded-2xl border border-navy bg-navy p-8 sm:p-12 text-ivory text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="eyebrow text-gold font-bold text-xs">READY FOR CLEAR DIRECTION?</span>
            <h2 className="mt-3 font-display text-2xl sm:text-4xl font-bold tracking-tight text-ivory">
              Let's Turn Your Vision Into Sustained Growth.
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-ivory/80 leading-relaxed">
              We help ambitious businesses build disciplined SEO frameworks, clear positioning, and
              predictable customer acquisition.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/"
                hash="lets-grow-together"
                className="rounded bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy shadow transition-all hover:bg-gold-soft hover:-translate-y-0.5"
              >
                Schedule Growth Consultation
              </Link>
              <Link
                to="/services"
                className="rounded border border-ivory/30 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-ivory transition-all hover:border-gold hover:text-gold"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
