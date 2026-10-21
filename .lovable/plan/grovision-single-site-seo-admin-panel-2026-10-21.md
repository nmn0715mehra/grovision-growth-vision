# GROVISION single-site SEO admin panel

## Goal
Build a usable, invite-only SEO management panel dedicated to GROVISION at `grovision.shop`, without changing the public marketing website.

## Build plan
1. Enable Lovable Cloud for managed authentication and persistent data. Add a sign-in-only admin entry with no public registration; store admin profile information and keep authorization roles separate from profiles.
2. Create a secure single-site data model for the configured website and its settings, keywords, pages, audits, content opportunities, backlinks, competitors, tasks, reports, and activity. Scope every record to that site, apply owner/admin access rules, and include required grants and seed setup where applicable.
3. Add a separate `/admin` workspace with the requested 13 destinations, responsive sidebar/navigation, and a focused dashboard. Keep the marketing header, footer, WhatsApp button, public routes, and inquiry form unchanged.
4. Implement working search, filters, sort, detail views, and create/edit/status workflows for manageable records. Include issue explanations and actionable tasks; make website settings editable. Show integrations as disconnected until configured, and keep live Search Console/Analytics metrics unavailable rather than inventing them. Any illustrative records will be clearly labeled sample data.
5. Verify sign-in/access boundaries, site-scoped CRUD, key workflows, mobile/desktop navigation, existing public pages/form behavior, and the current build.

## Technical details
- Use top-level TanStack routes under `/admin` and an admin-only layout distinct from the public shell.
- Use Lovable Cloud tables with a single configured website record and explicit website foreign keys for SEO records; use RLS and database grants for access control.
- Add a profiles table because profile data is requested; keep roles in a separate user-roles table. No public self-sign-up; initial admin provisioning will be owner-controlled.
- Keep external SEO integrations as connection-ready states and boundaries; do not claim live data or implement third-party API connections without configuration.
