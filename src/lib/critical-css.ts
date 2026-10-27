/**
 * Critical Above-The-Fold CSS for GROVISION.
 * Inlined directly into <head> so the browser can paint the Header and Hero
 * instantly on initial HTML arrival (achieving FCP, LCP, and Speed Index ~1s on mobile)
 * without waiting for external stylesheets or JavaScript bundles.
 */
export const criticalCss = `
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/montserrat.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
:root {
  --radius: 0.25rem;
  --navy: oklch(0.294 0.0713 249.3);
  --navy-soft: oklch(0.38 0.062 248);
  --gold: oklch(0.732 0.0791 78.6);
  --gold-soft: oklch(0.86 0.045 80);
  --beige: oklch(0.951 0.0181 65.8);
  --ivory: oklch(0.985 0.0089 63);
  --border: oklch(0.9 0.021 68);
  --shadow-card: 0 1px 2px oklch(0.28 0.07 249 / 6%), 0 12px 32px -18px oklch(0.28 0.07 249 / 22%);
  --shadow-lift: 0 2px 4px oklch(0.28 0.07 249 / 8%), 0 26px 48px -22px oklch(0.28 0.07 249 / 32%);
}
*, ::before, ::after { box-sizing: border-box; border-width: 0; border-style: solid; border-color: var(--border); margin: 0; padding: 0; }
html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif; }
body { background-color: var(--ivory); color: var(--navy); line-height: 1.5; -webkit-font-smoothing: antialiased; overflow-x: hidden; margin: 0; }
h1, h2, h3, h4 { font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif; letter-spacing: -0.02em; text-wrap: balance; }
a { color: inherit; text-decoration: inherit; }
img { max-width: 100%; height: auto; display: block; vertical-align: middle; }
button { font: inherit; background: transparent; cursor: pointer; border: none; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
.eyebrow { font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; }
.grid-lines { background-image: linear-gradient(to right, oklch(0.294 0.0713 249.3 / 5%) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.294 0.0713 249.3 / 5%) 1px, transparent 1px); background-size: 72px 72px; }
.relative { position: relative; }
.absolute { position: absolute; }
.sticky { position: sticky; }
.top-0 { top: 0; }
.inset-0 { inset: 0; }
.-inset-1 { inset: -0.25rem; }
.bottom-3 { bottom: 0.75rem; }
.left-4 { left: 1rem; }
.right-4 { right: 1rem; }
.z-50 { z-index: 50; }
.mx-auto { margin-left: auto; margin-right: auto; }
.w-full { width: 100%; }
.max-w-6xl { max-width: 72rem; }
.max-w-lg { max-width: 32rem; }
.max-w-xl { max-width: 36rem; }
.h-16 { height: 4rem; }
.h-44 { height: 11rem; }
.h-8 { height: 2rem; }
.w-8 { width: 2rem; }
.h-4 { height: 1rem; }
.w-4 { width: 1rem; }
.h-3 { height: 0.75rem; }
.w-3 { width: 0.75rem; }
.h-3\\.5 { height: 0.875rem; }
.w-3\\.5 { width: 0.875rem; }
.h-2 { height: 0.5rem; }
.w-2 { width: 0.5rem; }
.h-9 { height: 2.25rem; }
.w-auto { width: auto; }
.h-full { height: 100%; }
.h-px { height: 1px; }
.flex { display: flex; }
.inline-flex { display: inline-flex; }
.grid { display: grid; }
.hidden { display: none; }
.flex-col { flex-direction: column; }
.flex-1 { flex: 1 1 0%; }
.shrink-0 { flex-shrink: 0; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.gap-1\\.5 { gap: 0.375rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-7 { gap: 1.75rem; }
.gap-10 { gap: 2.5rem; }
.p-1\\.5 { padding: 0.375rem; }
.p-2\\.5 { padding: 0.625rem; }
.px-2\\.5 { padding-left: 0.625rem; padding-right: 0.625rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
.px-7 { padding-left: 1.75rem; padding-right: 1.75rem; }
.py-0\\.5 { padding-top: 0.125rem; padding-bottom: 0.125rem; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.py-2\\.5 { padding-top: 0.625rem; padding-bottom: 0.625rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.pt-12 { padding-top: 3rem; }
.pb-10 { padding-bottom: 2.5rem; }
.mt-0\\.5 { margin-top: 0.125rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-6 { margin-top: 1.5rem; }
.mt-9 { margin-top: 2.25rem; }
.rounded { border-radius: 0.25rem; }
.rounded-md { border-radius: calc(var(--radius) - 2px); }
.rounded-lg { border-radius: var(--radius); }
.rounded-xl { border-radius: calc(var(--radius) + 4px); }
.rounded-2xl { border-radius: calc(var(--radius) + 8px); }
.rounded-full { border-radius: 9999px; }
.border { border-width: 1px; }
.border-b { border-bottom-width: 1px; }
.border-t { border-top-width: 1px; }
.border-transparent { border-color: transparent; }
.border-border { border-color: var(--border); }
.border-border\\/80 { border-color: oklch(0.9 0.021 68 / 80%); }
.border-border\\/60 { border-color: oklch(0.9 0.021 68 / 60%); }
.border-white\\/10 { border-color: rgba(255, 255, 255, 0.1); }
.border-gold\\/30 { border-color: oklch(0.732 0.0791 78.6 / 30%); }
.border-navy { border-color: var(--navy); }
.border-navy\\/25 { border-color: oklch(0.294 0.0713 249.3 / 25%); }
.bg-ivory { background-color: var(--ivory); }
.bg-beige { background-color: var(--beige); }
.bg-navy { background-color: var(--navy); }
.bg-navy\\/5 { background-color: oklch(0.294 0.0713 249.3 / 5%); }
.bg-navy\\/85 { background-color: oklch(0.294 0.0713 249.3 / 85%); }
.bg-white { background-color: #fff; }
.bg-gold { background-color: var(--gold); }
.bg-gold\\/15 { background-color: oklch(0.732 0.0791 78.6 / 15%); }
.bg-black\\/40 { background-color: rgba(0, 0, 0, 0.4); }
.bg-current { background-color: currentColor; }
.bg-gradient-to-t { background-image: linear-gradient(to top, var(--tw-gradient-stops, transparent)); }
.bg-gradient-to-tr { background-image: linear-gradient(to top right, var(--tw-gradient-stops, transparent)); }
.from-navy\\/70 { --tw-gradient-from: oklch(0.294 0.0713 249.3 / 70%); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, transparent); }
.from-gold\\/25 { --tw-gradient-from: oklch(0.732 0.0791 78.6 / 25%); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, transparent); }
.via-navy\\/20 { --tw-gradient-stops: var(--tw-gradient-from), oklch(0.294 0.0713 249.3 / 20%), var(--tw-gradient-to, transparent); }
.via-transparent { --tw-gradient-stops: var(--tw-gradient-from), transparent, var(--tw-gradient-to, transparent); }
.to-transparent { --tw-gradient-to: transparent; }
.to-navy\\/10 { --tw-gradient-to: oklch(0.294 0.0713 249.3 / 10%); }
.text-navy { color: var(--navy); }
.text-navy\\/60 { color: oklch(0.294 0.0713 249.3 / 60%); }
.text-navy\\/75 { color: oklch(0.294 0.0713 249.3 / 75%); }
.text-gold { color: var(--gold); }
.text-gold-dark { color: oklch(0.6 0.08 78.6); }
.text-ivory { color: var(--ivory); }
.text-ivory\\/80 { color: oklch(0.985 0.0089 63 / 80%); }
.text-white { color: #fff; }
.text-muted-foreground { color: oklch(0.52 0.035 248); }
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-\\[10px\\] { font-size: 10px; }
.text-\\[11px\\] { font-size: 11px; }
.text-\\[2\\.25rem\\] { font-size: 2.25rem; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }
.font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
.leading-\\[1\\.05\\] { line-height: 1.05; }
.leading-relaxed { line-height: 1.625; }
.tracking-wider { letter-spacing: 0.05em; }
.tracking-\\[0\\.14em\\] { letter-spacing: 0.14em; }
.tracking-\\[0\\.16em\\] { letter-spacing: 0.16em; }
.uppercase { text-transform: uppercase; }
.object-cover { object-fit: cover; }
.object-contain { object-fit: contain; }
.overflow-hidden { overflow: hidden; }
.blur-xl { filter: blur(24px); }
.opacity-60 { opacity: 0.6; }
.opacity-70 { opacity: 0.7; }
.shadow-card { box-shadow: var(--shadow-card); }
.shadow-lift { box-shadow: var(--shadow-lift); }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.min-w-0 { min-width: 0; }
.divide-y > * + * { border-top-width: 1px; border-color: oklch(0.9 0.021 68 / 50%); }
@media (min-width: 640px) {
  .sm\\:h-20 { height: 5rem; }
  .sm\\:h-52 { height: 13rem; }
  .sm\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
  .sm\\:px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
  .sm\\:p-2\\.5 { padding: 0.625rem; }
  .sm\\:p-3 { padding: 0.75rem; }
  .sm\\:pt-16 { padding-top: 4rem; }
  .sm\\:pb-12 { padding-bottom: 3rem; }
  .sm\\:flex-row { flex-direction: row; }
  .sm\\:text-5xl { font-size: 3rem; line-height: 1; }
  .sm\\:text-lg { font-size: 1.125rem; line-height: 1.75rem; }
  .sm\\:text-sm { font-size: 0.875rem; line-height: 1.25rem; }
  .sm\\:text-xs { font-size: 0.75rem; line-height: 1rem; }
  .sm\\:inline-flex { display: inline-flex; }
  .sm\\:hidden { display: none; }
}
@media (min-width: 1024px) {
  .lg\\:flex { display: flex; }
  .lg\\:hidden { display: none; }
  .lg\\:grid-cols-\\[1\\.1fr_0\\.9fr\\] { grid-template-columns: 1.1fr 0.9fr; }
  .lg\\:gap-16 { gap: 4rem; }
  .lg\\:mt-0 { margin-top: 0; }
  .lg\\:pt-20 { padding-top: 5rem; }
  .lg\\:pb-14 { padding-bottom: 3.5rem; }
  .lg\\:text-\\[4rem\\] { font-size: 4rem; line-height: 1; }
}
`.trim();
