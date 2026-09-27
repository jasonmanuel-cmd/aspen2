The optimization preserves the existing photo subjects, color palette, Fraunces/Inter typography, cinematic scroll sequence, and form payloads. Responsive image variants, local fonts, deferred offscreen rendering, and accessible navigation reduce the work required for the first screen.

The indexable public surface is Home, Models, Financing, and Contact. Confirmation and sign-in-log pages intentionally use `noindex, nofollow` and are omitted from the sitemap. Their SEO score is not a ranking target.

## Lighthouse methodology

Run the static audit server in one terminal:

```powershell
npm.cmd install
npm.cmd run audit:serve
```

In a second terminal:

```powershell
npm.cmd run audit:lighthouse
```

The audit server enables HTTP compression and static-asset cache headers. This represents production delivery more closely than the uncompressed Python development server. Vercel's CDN handles compression automatically ([Vercel documentation](https://vercel.com/docs/how-vercel-cdn-works)). Local scores do not establish production scores or real-user Core Web Vitals.

The script uses Lighthouse's default mobile profile (412 × 823, device scale 1.75), an additional tablet viewport (768 × 1024, scale 2, retaining mobile throttling), and Lighthouse's official desktop configuration (1350 × 940, scale 1). Tablet is a custom viewport, not a built-in Lighthouse preset. Reports record the actual configuration used.

JSON/HTML reports are written to `reports/lighthouse/`; the compact final summary is committed. The temporary Chrome profile and large raw reports stay local. Performance scores can vary with machine load, network conditions, and third-party services.

## Search and answer-engine changes

- Unique titles, descriptions, canonical URLs, and social metadata for each public page.
- Consistent business, website, page, breadcrumb, and model-list structured data. No invented address, reviews, license details, or model-specific price offers.
- Eight visible questions and answers with matching FAQ markup, using the site's advertised offers and eligibility qualifications. FAQ markup does not guarantee a Google rich result ([Google documentation](https://developers.google.com/search/blog/2023/08/howto-faq-changes)).
- A sitemap containing only the four indexable pages and crawlable `robots.txt`.
- An `llms.txt` summary identifying the models, contact details, and limitations of the advertised pricing and programs. This supplies readable context; it does not guarantee AI citations.
- One primary heading and a main-content landmark per public page, keyboard skip links, collapsed-menu inertness, and sufficient contrast for secondary text.
- Progressive image loading with a no-JavaScript gallery fallback; reduced-motion preferences retain visible content.

Form submissions were not sent during testing. Form integration contracts and fallback behavior remain in place.

## Final results

Updated after the opening-film and mobile-banner audit on September 17, 2026.

| Page | Mobile performance | Tablet performance | Desktop performance |
| --- | ---: | ---: | ---: |
| Home | 93 | 94 | 98 |
| Models | 98 | 98 | 100 |
| Financing | 99 | 99 | 100 |
| Contact | 99 | 99 | 100 |

All twelve final public-page runs scored 100 for accessibility, best practices, and SEO. Maximum CLS was 0.077. Scores are local lab results; Home mobile/tablet LCP was about 2.94 seconds. Real-user metrics remain unmeasured.

Complete findings and interaction evidence are in SITE_QA_AUDIT.md. The approved SEO domain is https://aspen2homes.com; its live site currently serves the older WordPress version.
