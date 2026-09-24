# GROVISION navigation restructure

## Goal
Make the existing inquiry experience the second primary page at `/lets-grow-together`, preserving its form behavior and supporting contact content.

## Changes
- Rename the Contact route file and route path to `/lets-grow-together`; do not retain a duplicate Contact page.
- Put “Let’s Grow Together” second in the main navigation, then About, Services, Portfolio, and Case Studies.
- Update all internal inquiry calls-to-action from `/contact` to `/lets-grow-together`.
- Add a premium page introduction with the requested heading and copy, followed prominently by the unchanged inquiry form.
- Retain the free consultation, direct channels, social area, and floating WhatsApp action.
- Update sitemap and page metadata for the renamed route.

## Verification
- Confirm all six pages load, navigation and inquiry calls-to-action resolve, no `/contact` links remain, and the form retains its exact endpoint, fields, validation, loading, success, and error behavior.
- Check desktop and mobile rendering and verify the production output.

## Technical notes
- Preserve `ContactForm.tsx` submission logic unless a route-only import adjustment is required.
- Let TanStack regenerate its route tree; do not edit the generated route file.
