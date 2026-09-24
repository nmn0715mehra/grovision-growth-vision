# Reorganize GROVISION around “Let’s Grow Together”

## Goal
Change the primary journey to:

```text
Home → Let’s Grow Together → About → Services → Portfolio → Case Studies
```

The existing inquiry form remains one shared component with its current Google Apps Script submission behavior unchanged.

## Route and navigation
- Add the clean `/lets-grow-together` route using the current Contact page experience.
- Replace the old `/contact` content page with a redirect to `/lets-grow-together`, preserving old bookmarks without creating a duplicate page.
- Reorder the shared navigation to: Home, Let’s Grow Together, About, Services, Portfolio, Case Studies.
- Keep the prominent navbar “Let’s Grow Together” button and point it to the new route.
- Update every existing internal inquiry CTA from `/contact` to `/lets-grow-together`, including the homepage and Case Studies CTA.
- Keep all other routes and existing page content accessible.

## Let’s Grow Together page
- Give the page a premium inquiry-focused introduction:
  - H1: “LET’S GROW TOGETHER”
  - Supporting line: “Have a vision for your business? Let’s turn it into growth.”
  - A concise professional paragraph inviting visitors to share their business, goals, and requirements.
- Place the current form directly beneath the introduction, using the existing shared form component.
- Retain the Free First Consultation, Direct Channels, Social, and Philosophy content already on the Contact page.
- Preserve the GROVISION cream, navy, and gold design system, typography, spacing, borders, motion, and logo treatment.
- Keep the current reusable Contact section on existing pages so no homepage or supporting-page section is removed; all prominent inquiry links lead to the dedicated page.

## Form and integrations
- Do not modify the form fields, validation, Apps Script URL, form-encoded POST request, loading state, success message, error handling, reset behavior, or Google Sheets mapping.
- Keep email, phone, WhatsApp, social-link states, analytics scripts, and the floating WhatsApp button untouched.

## Search and production configuration
- Add unique metadata for `/lets-grow-together`, including title, description, Open Graph fields, Twitter card, and canonical URL.
- Replace `/contact` with `/lets-grow-together` in the sitemap.
- Update the static prerender route list so the new page is emitted in the production output.
- Let TanStack regenerate the route tree from the renamed route file; do not edit the generated file manually.

## Verification
- Confirm `/`, `/lets-grow-together`, `/about`, `/services`, `/portfolio`, and `/case-studies` render and navigate correctly.
- Confirm `/contact` redirects to `/lets-grow-together` and no internal links still target `/contact`.
- Confirm the navbar order and both desktop/mobile inquiry CTAs.
- Exercise form validation, submission/loading, success, and retry/error behavior without changing the Apps Script integration.
- Check the new page on desktop, tablet, and mobile for clean field stacking, no overflow, and no interference from the floating WhatsApp button.
- Confirm the production output contains the new prerendered page and updated sitemap.

Google Sheets row creation can only be confirmed if the current Apps Script deployment accepts the POST; the site-side request and UI states will still be verified independently.
