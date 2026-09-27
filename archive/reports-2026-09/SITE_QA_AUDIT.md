# Aspen II site audit — September 17, 2026

Reviewed with the Accessibility, SEO, AI SEO, and Browser QA skills. The established colors, typefaces, imagery, copy, and cinematic scroll remain in place.

## Findings fixed

- **Wrong SEO domain:** canonicals, social metadata, JSON-LD IDs, sitemap, robots sitemap reference, and llms.txt now use the user-confirmed `https://aspen2homes.com`. The previous domain serves an unrelated property site.
- **Video startup cost:** the original intro scored 74 mobile, 74 tablet, and 84 desktop. Responsive video delivery, a smaller preloaded poster, deferred homepage imagery and script initialization, and exact static font-weight files reduce startup work. The full 15-second film, Skip button, Escape entry, and once-per-tab behavior remain.
- **Continuous motion controls:** persistent mobile banner pause/resume toggle, with a 40 × 44 pixel target. Countdown pause freezes the display without extending its deadline. Reduced motion starts the countdown paused and suppresses the opening film and marquee animation.
- **Menu and gallery focus:** mobile keyboard focus cycles through menu controls and returns to the toggle on Escape. Resizing to desktop closes the menu. Gallery background content becomes inert while open; closing restores its previous state and the photo trigger's focus.
- **Broken utility script:** corrected malformed JavaScript in the sign-in-log CSV property field. All inline scripts now parse. Password input and errors are labelled; background content is inert while locked and the dialog provides a home exit. CRM reads wait until the existing unlock gate opens; passwords and CRM records are no longer logged to the console.
- **Utility landmarks:** confirmation and sign-in-log content have main landmarks. Both remain deliberately noindex.
- **Model previews:** appropriate tablet header variants and smaller Tranquil Oasis thumbnails; original photographs, full gallery images, and blueprint PDFs remain available.

## Lighthouse — final public pages

| Page | Mobile performance | Tablet performance | Desktop performance |
| --- | ---: | ---: | ---: |
| Home | 93 | 94 | 98 |
| Models | 98 | 98 | 100 |
| Financing | 99 | 99 | 100 |
| Contact | 99 | 99 | 100 |

Accessibility, best practices, and SEO scored **100 in all twelve final public-page runs**. Maximum CLS was 0.077. Home mobile/tablet LCP was approximately 2.94 seconds: a score above 90 does not establish that every Core Web Vitals threshold is met.

Lighthouse 13.4.1 ran against the local compressed static server on port 3002. Mobile: 412 × 823, scale 1.75. Tablet: custom 768 × 1024, scale 2, with mobile throttling. Desktop: official Lighthouse configuration, 1350 × 940, scale 1. Each first-load Home audit includes the opening film. Scores vary with machine load. Final evidence: `reports/lighthouse/summary.json`; local HTML reports: `reports/lighthouse/final-public/`.

Utility pages were audited separately on mobile: both scored 100 for performance, accessibility, and best practices. Their SEO score is 54 because search indexing is deliberately disabled; they are not public ranking targets. Evidence: `reports/lighthouse/utilities-summary.json`.

## Browser and accessibility checks

- Six pages × four widths (320, 390, 768, 1440): no horizontal overflow, visibly broken images, or duplicate primary headings in source.
- Mobile menu: open, Tab navigation, Escape close, focus restoration.
- Banner and countdown: persistent pause controls with accessible state.
- Intro: responsive video selection, descriptive text, deferred hero image, Escape entry, and hero loading after exit. Earlier playback testing confirmed completion and no replay on reload.
- Models: section anchors, photo dialog, ArrowRight, Shift+Tab wrap, Escape close, restored focus, and model selection carried into Contact.
- Contact: empty submission is blocked by native validation and focuses the required name field. No valid leads were sent.
- Private log: labelled password field and keyboard containment checked without logging in or reading records.

Lighthouse's axe-based checks plus browser keyboard and accessibility-tree inspection are **not full WCAG certification**. VoiceOver/NVDA testing, valid form delivery, authenticated CRM reads, and CSV export were not exercised.

Pixel-level visual regression: **INCONCLUSIVE**, because there is no committed screenshot baseline. Responsive reflow and selected screenshots were inspected manually. No-JavaScript and reduced-motion branches were reviewed in source, rather than independently emulated in a browser.

## SEO and AI-search review

- Four unique titles/descriptions, one canonical per public page, no accidental public noindex, and a four-URL sitemap.
- Local assets and anchors resolve; JSON-LD parses. Eight FAQ schema answers exactly match the eight visible answers. The model ItemList contains all six homes.
- Business/model facts and qualified pricing remain readable in initial HTML. Original PDFs and unconfirmed Tranquil Abode specifications remain. No fabricated address, license, reviews, or guaranteed financing claims were added.
- robots.txt permits crawling. llms.txt summarizes the same public content and uses the approved domain; it does not guarantee AI citations.
- Google requires no special AI files or schema for AI features; normal SEO and indexability remain the foundation ([Google documentation](https://developers.google.com/search/docs/appearance/ai-features)). Citation rates, rankings, Search Console indexing, and real-user metrics were not measured.
- Moving content was reviewed against pause/stop guidance ([W3C guidance](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)).

## Deployment and remaining work

A live read-only check found `aspen2homes.com` still serving the older WordPress homepage. `/floor-plans` and `/financing` returned 404, `/contact` served the older page, and `/llms.txt` returned 404. Deploy this repository and connect the domain before these changes are live there. The connected Vercel team exposed no projects during this audit; hosting and DNS were not changed.

The existing sign-in password gate is client-side, not server-side authorization. Verify authentication on the CRM log endpoint before treating it as a secured private dashboard. No credentials were changed or private records accessed.

GitHub publication does not establish deployment to the public domain.
