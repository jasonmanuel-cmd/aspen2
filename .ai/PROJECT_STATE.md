# PROJECT STATE

Last Updated: 2026-09-27
Current Branch: `main` (production).
Last Known Good Commit: `3eb2b0e` on `main` (merge of PR #4, the last site-code change). Later merges (PR #5 and this docs update) touched only `.ai/`. Vercel serves `main` in production.

## Project

Name: Aspen II Homes website
Purpose: Marketing and lead-capture site for Aspen II Homes, a new-construction homebuilder. It presents the Sunset Retreat community in Tehachapi, California, its six home models, and financing incentives, and it collects buyer leads.
Production URL: **https://aspen2bakersfield.store** (temporary; the owner confirmed on 2026-09-27 that this is the site's domain "for now"). Canonical tags, OG/Twitter URLs, JSON-LD, `sitemap.xml`, `robots.txt` and `llms.txt` all use it. The long-term brand domain `aspen2homes.com` isn't used (see Known Problems and Decision 013).
Repository: https://github.com/jasonmanuel-cmd/aspen2 (renamed from the earlier `hshomeshub` project; `package.json` is now `"name": "aspen2"`)

## Technology

Frontend: Static HTML pages, one shared stylesheet (`styles.css`), one vanilla JavaScript file (`main.js`). No framework and no bundler.
Backend: None in this repo. Forms post to outside services (see Other services).
Database: None in this repo.
Hosting: Vercel, set up as a static site by `vercel.json` (`buildCommand: null`, `outputDirectory: "."`, `cleanUrls: true`). Security headers and cache headers are set there. Every push gets a Vercel preview deployment; the Vercel project is named `aspen2`.
Authentication: None for site visitors. `signin-log.html` has a client-side password gate (see Known Problems).
Other services:
- Formspree: lead forms post here as a backup. The form ID is in `main.js` and `signin-log.html`.
- An outside CRM API at `www.harbisonstandard.com/hq/api/openhouse` (POST) and `/openhouse-log` (GET). The URLs are hard-coded in `main.js` and `signin-log.html`. This API is not part of this repo and looks like it was carried over from the earlier project. It hasn't been checked for this brand.
- Vercel Web Analytics, loaded with `/_vercel/insights/script.js` on every page.
- Fonts are self-hosted in `assets/fonts/` (Fraunces, Inter) through `fonts.css`. `design-card.html` loads Google Fonts instead.

## Current Architecture

- Multi-page static site served from the repo root. Clean URLs are on, so `/floor-plans` serves `floor-plans.html`.
- Public pages: `index.html` (home), `floor-plans.html` (the six models), `financing.html`, `contact.html`, `thank-you.html`.
- Internal page: `signin-log.html`, an open-house sign-in log that reads the CRM log and links to the Formspree dashboard.
- Brand reference page: `design-card.html`, on `main` since PR #2 and marked `noindex`. It is publicly reachable at `/design-card` but not linked from the site.
- `main.js` runs everything on the client:
  - the opening film. It is skipped after the first view in a session (`sessionStorage` key `aspen-opening-seen`) and for users who prefer reduced motion.
  - the homepage hero, the mobile menu and scroll effects
  - the scroll-driven film on the homepage
  - model photo galleries, which swipe on phones, and a lightbox
  - lead-form checks and submission: a POST to the CRM, then Formspree as a backup. After that it goes to `thank-you.html`, passing the name and email in `sessionStorage`.
  - a countdown banner (hidden unless `data-deadline` is a future date)
  - (PR #4 removed the dead open-house registration count, the unused `#viewCounter` animation and the `.oh-count*` / `.oh-log-link` styles.)
- Images: the original photos and blueprint PDFs are in `house/<Model Name>/`. `scripts/optimize-assets.py` turns them into responsive WebP files in `assets/images/`, listed in `assets/image-manifest.json`.
- `sw.js` is a service worker that removes itself on purpose. It exists only to clear an old cache-first worker.
- `node_modules/` is gitignored and, since PR #4, no longer tracked (it had been committed by mistake). Dependencies (`sharp`, `serve`, `lighthouse`) are only for local scripts and audits; run `npm install` to get them. The site doesn't need them to run.
- **What deploys:** `.vercelignore` limits each Vercel deployment to the public site. Excluded:
  - `.ai/`, `AGENTS.md`, `CLAUDE.md`, `archive/`, `scripts/`, `reports/`, `package*.json`, `assets/image-manifest.json`
  - the source photos and notes in `house/` (only its blueprint PDFs deploy)

  About 231 files and 18 MB deploy. A simulated deploy tree resolved every page reference.
- `archive/` holds files kept only for reference (see `archive/README.md`): the 2026-09-16 audit reports about the old `hshomeshub.site`, unused generated images and `extra_photos/`, and `info.txt` from the old listing site.

## Working Features

These are on `main` and confirmed in the code:
- Home page: opening film, hero, promotional banner (scrolls right to left on mobile), scroll-driven film, buying-path cards labelled "Path 01–03", FAQ with structured data, and links for 0% down and up to $15,000 in early-buyer savings.
- Models page: six models (Tranquil Oasis, Sunset Retreat, The Tranquil Abode, Sunrise View Residence, Enchanted Haven, The Grand Haven) with photo galleries, a lightbox and blueprint PDFs.
- Financing page and contact page, with the lead form and the open-house form.
- The thank-you page shows the submitter's name and email.
- SEO: canonical tags, OG image, `sitemap.xml`, `robots.txt`, `llms.txt`, and structured data (GeneralContractor, WebSite, WebPage and BreadcrumbList on the public pages, FAQPage on the home page, ItemList on the Models page).
- Accessibility work from `3337bd2`: labelled forms, reduced-motion support, a countdown pause control.
- Mobile and desktop layout, navigation and form fixes from PR #3 (`1790169`, `c4ad68c`).
- A local link check on `main` (run 2026-09-27) found no broken internal links.

## In Progress

- Nothing is in progress on a branch. PR #4 (dead-code removal, repo and deploy cleanup) was merged into `main` on 2026-09-27.
- The owner created the `archive/*` tags on 2026-09-27 from their own machine. The cloud session can't push tags or delete branches, so branch cleanup happens on GitHub (see Branches).
- The design card's three content questions are still open (see Known Problems and `.ai/TODO.md`). The card is on `main` with those placeholders as they were.
- The card is also published as a Claude artifact: https://claude.ai/artifact/4jpQKneGo4tAPtwJLUyhzz (private until shared).

## Known Problems

- **Domain:**
  - The site is served at `aspen2bakersfield.store`, per the owner on 2026-09-27. Its connection to the Vercel project `aspen2` hasn't been verified here, because the cloud session's network blocks it.
  - `aspen2homes.com` is **not** this site. A 2026-09-17 check (`archive/reports-2026-09/SITE_QA_AUDIT.md`) found it serving an older WordPress homepage.
  - When the owner moves to `aspen2homes.com`:
    1. Connect it in Vercel.
    2. Replace every `https://aspen2bakersfield.store` with `https://aspen2homes.com` in the public files (`*.html`, `llms.txt`, `robots.txt`, `sitemap.xml`).
    3. Set up a permanent redirect from `aspen2bakersfield.store` to `aspen2homes.com`, so search rankings carry over.
  - The ".store" name and "Bakersfield" don't match the Tehachapi / Sunset Retreat content. That's accepted as temporary.
- **Unconfirmed model specs:** The Tranquil Abode's specifications still need confirming (noted in `llms.txt` and on the Models page), and no photography was supplied for The Grand Haven.
  git tag -a archive/redesign-type-and-layout origin/redesign/type-and-layout -m 'Archive: separate Aspen II site'
  git tag -a archive/vercel-web-analytics-2026-09-16 origin/vercel/install-vercel-web-analytics-twy28q -m 'Archive'
  git push origin --tags
  ```
- **Unverified facts on the unrelated-site branch:** `redesign/type-and-layout` claims "31 years", "in Kern County since 1994", a 1-2-10 warranty and a CSLB license number. None of these are on `main` or verified. "Since 1994" also conflicts with the design card's "Est. 1998". Verify with the owner (and the CSLB public lookup) before using any of them.
- **Open questions on the design card** (merged with PR #2, still unanswered):
  - The wordmark font is a best match, Fira Sans Condensed, not confirmed.
  - There's no contractor (CSLB) license number on the site or the card.
  - The tagline "Est. 1998" with "Elevated since 2026" needs the client to confirm.

## Important Files

- `index.html`, `floor-plans.html`, `financing.html`, `contact.html`, `thank-you.html`, `signin-log.html`: the pages.
- `styles.css`: all site styles, with design tokens in `:root`. It is readable, not minified, on `main`.
- `fonts.css`, `assets/fonts/`: self-hosted fonts.
- `main.js`: all site behaviour, including the form endpoints.
- `vercel.json`: hosting, clean URLs and headers.
- `sw.js`: the self-removing service worker.
- `house/`: source photos, info notes and blueprint PDFs for each model.
- `assets/images/`, `assets/image-manifest.json`: the generated WebP images.
- `media/`: the opening film videos and posters.
- `aspen2-logo.jpg`, `aspen2-mark.png`, `favicon.png`, `apple-touch-icon.png`, `og-image.jpg`: brand images.
- `design-card.html`, `aspen2-mark.svg`: the brand card and vector mark (on `main` since PR #2).
- `scripts/`: `optimize-assets.py`, `audit-site.py`, `lighthouse-audit.mjs`, `serve-audit.mjs`.
- `.vercelignore`: what stays out of deployments.
- `archive/`: reference-only files, never deployed.
- `sitemap.xml`, `robots.txt`, `llms.txt`: SEO and crawler files.
- `AGENTS.md`, `CLAUDE.md`, `.ai/`: project memory and agent instructions.

## Environment

The site itself needs no environment variables. No `.env` file is present; `.env*` is gitignored.
The local audit scripts read these optional variables (names only):
- `AUDIT_BASE_URL`
- `AUDIT_OUTPUT`
- `CHROME_PATH`
- `LIGHTHOUSE_MODULE_DIR`
- `PORT`

NEVER STORE SECRET VALUES HERE.

## Branches

Audited 2026-09-27. `main` is production and the only branch that deploys to https://aspen2bakersfield.store.

| Branch | Relation to `main` | Status |
|---|---|---|
| `main` | — | Production. |
| `claude/sharp-pasteur-dkxsfr` | Fully merged | The owner approved deletion on 2026-09-27. **Still exists** as of the last check. |
| `claude/aspen-2-homes-design-card-wk2tq5` | Fully merged (PR #2) | The owner approved deletion on 2026-09-27. **Still exists** as of the last check. |
| `v0-rebrand-from-hshomeshub` | Fully merged (old rebrand) | The owner approved deletion on 2026-09-27. **Still exists** as of the last check. |
| `redesign/type-and-layout` | **Unrelated history**: a separate, earlier Aspen II site with its own root commit (`a3c4c8f`). | Not merged. Preserved as tag `archive/redesign-type-and-layout` (verified to point at the branch tip, `c7e9049`). Safe to delete; needs owner permission. |
| `vercel/install-vercel-web-analytics-twy28q` | **Unrelated history**: an earlier release of that same separate site (root `7002288`). | Not merged. Preserved as tag `archive/vercel-web-analytics-2026-09-16` (verified to point at the branch tip, `cd6214c`). Safe to delete; needs owner permission. |

**Deletion status (2026-09-27):** the owner tried to delete the three merged branches twice, once from the command line and once on GitHub, but the GitHub API and `git ls-remote` still listed all six branches afterwards. The cause isn't known yet. It might be the wrong repository, a click on Restore, or a repository rule that blocks deletion (the API reports the branches as `protected: false`, but that flag doesn't reflect repository rulesets). Before recording the branches as deleted, check with `git fetch --prune && git branch -r` or the GitHub Branches page.

The unrelated-site branch has content `main` lacks, which could inform future work:
- six community pages (Tehachapi, Bear Valley Springs, Golden Hills, Stallion Springs, Ridgecrest, California City)
- a page per plan
- about, process, warranty and available-homes pages
- a Vercel serverless lead handler, `api/lead.js`

It is a different design and structure. Porting any of it is an owner decision; don't merge the branch.

## Current Objective

PR #4 is merged and the repo is organized. Next:
1. The owner deletes the merged branches on GitHub (approved), and decides whether to delete the two now-tagged branches.
2. Answers to the three design-card questions.
3. The `.ai/TODO.md` "Next" items (CRM endpoint, sign-in log protection).
