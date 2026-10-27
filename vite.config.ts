// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    pages: [
      { path: "/" },
      { path: "/lets-grow-together" },
      { path: "/about" },
      { path: "/services" },
      { path: "/portfolio" },
      { path: "/case-studies" },
      { path: "/blog" },
      { path: "/blog/modern-seo-playbook-indian-brands-intent-over-volume" },
      { path: "/blog/why-brand-positioning-must-precede-paid-ad-spend" },
      { path: "/blog/attribution-modeling-2026-first-click-last-click-illusions" },
      { path: "/contact" },
      { path: "/admin" },
      { path: "/admin/login" },
      { path: "/admin/blogs" },
      { path: "/admin/keywords" },
      { path: "/admin/pages" },
      { path: "/admin/audits" },
      { path: "/admin/content" },
      { path: "/admin/backlinks" },
      { path: "/admin/competitors" },
      { path: "/admin/tasks" },
      { path: "/admin/reports" },
      { path: "/admin/activity" },
      { path: "/admin/integrations" },
      { path: "/admin/settings" },
    ],
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});
