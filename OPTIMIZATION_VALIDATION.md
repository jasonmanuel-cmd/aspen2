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

Validated September 17, 2026 against the local compressed audit server with Lighthouse 13.4.1. All twelve public-page/profile combinations exceeded 90 in every category.

| Page | Mobile performance | Tablet performance | Desktop performance |
| --- | ---: | ---: | ---: |
| Home | 95 | 91 | 100 |
| Models | 99 | 94 | 100 |
| Financing | 94 | 95 | 100 |
| Contact | 95 | 94 | 100 |

Accessibility, best practices, and SEO scored **100 in every run**. Maximum measured CLS was 0.077. These are local lab results; production Lighthouse and real-user metrics have not been measured.

Responsive checks covered 320, 390, 768, 1024, and 1440 pixel widths. The homepage countdown overflow at 320 pixels was corrected and rechecked. Browser checks verified mobile navigation, cinematic image loading during scroll, model anchors, gallery next-photo and Escape behavior, and model selection carried into the contact form. No forms were submitted.

The commit is published directly to GitHub main after validation. The compact evidence is in `reports/lighthouse/summary.json`.

