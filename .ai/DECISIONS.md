# PROJECT DECISIONS

Reconstructed from Git history and repository contents on 2026-09-27. Dates are commit dates.

## Decision 001

Date: 2026-09-17
Decision: Rebrand the site from the earlier real-estate listing and agent site (hshomeshub) to Aspen II Homes, a homebuilder. Listing, agent and real-estate content was removed.
Reason: The site now markets new-construction homes at Sunset Retreat, Tehachapi.
Files affected: every HTML page, `styles.css`, `main.js`, brand assets (`1d382aa`, `849cf3f`, `0e07a6b`)
Status: Active

---

## Decision 002

Date: 2026-09-17
Decision: Deploy on Vercel as a static site with no build step. The repo root is the output directory, clean URLs are on, and security and cache headers are set in `vercel.json`.
Reason: The first Vercel builds failed. The site is plain HTML, CSS and JS, so no build is needed.
Files affected: `vercel.json`, `package.json` (`a53169e`, `d8edf3c`)
Status: Active

---

## Decision 003

Date: 2026-09-17
Decision: Replace the cache-first service worker with one that removes itself and clears all caches.
Reason: The old worker served stale HTML and broke navigation on the new multi-page site.
Files affected: `sw.js` (`4d20e62`)
Status: Active. Don't add a caching service worker back without a plan for updating it.

---

## Decision 004

Date: 2026-09-16
Decision: Revert the critical-CSS extraction and keep one shared, render-blocking `styles.css`.
Reason: Documented in `CRITICAL_CSS_ANALYSIS.md` ("lessons learned") after the revert in `13117bf`. CSS minification was added in `4afc8c7` for the old site. The current `styles.css` on `main` was rewritten during the rebrand and is not minified.
Files affected: `styles.css`, the HTML pages (`631336a` reverted by `13117bf`, `be42848`)
Status: Active

---

## Decision 005

Date: 2026-09-17
Decision: Serve images as responsive WebP files built from the original photos, and keep the originals and blueprint PDFs in `house/`.
Reason: Performance, while keeping the full-quality originals.
Files affected: `scripts/optimize-assets.py`, `assets/images/`, `assets/image-manifest.json`, `house/` (`9aa3d25`, `3ceb437`)
Status: Active

---

## Decision 006

Date: 2026-09-13 (forms, thank-you redirect and CRM, `78bc3f5`). Carried into the rebuilt `main.js` on 2026-09-17 (`849cf3f`).
Decision: Lead forms submit to the outside CRM API first, then to Formspree as a backup, then redirect to `thank-you.html`. The name and email go through `sessionStorage`.
Reason: Carried over from the earlier site. Formspree makes sure a lead gets through if the CRM is unavailable.
Files affected: `main.js`, `contact.html`, `thank-you.html`, `signin-log.html`
Status: Active. Whether the CRM endpoint is correct for this brand hasn't been confirmed (see TODO).

---

## Decision 007

Date: 2026-09-17
Decision: Show a full-screen opening film once per browser session. It is skipped for users who prefer reduced motion.
Reason: Brand experience on first visit without repeating it on every page load.
Files affected: `index.html`, `main.js`, `media/` (`0394700`, `3337bd2`)
Status: Active

---

## Decision 008

Date: 2026-09-26
Decision: The countdown banner shows only for a real future `data-deadline`, with no timer that quietly restarts. The homepage says "six home models", and the buying-path cards are labelled "Path 01–03" so they don't read as a model count.
Reason: Honest urgency, and the homepage now matches the Models page.
Files affected: `index.html`, `main.js`, `styles.css` (`1790169`, `c4ad68c`, PR #3)
Status: Active

---

## Decision 009

Date: 2026-09-25
Decision: Keep brand standards in a standalone `noindex` page, `design-card.html`. Use the site's existing tokens (Obsidian, Graphite, Bone, Steel, Aspen Gold, Champagne, Bronze, Plaster; Fraunces, Inter), plus a vector mark, `aspen2-mark.svg`.
Reason: One reference for the website, print and signage, and a vector logo in place of photo-only logo files.
Files affected: `design-card.html`, `aspen2-mark.svg` (`3c810af`, PR #2, not merged yet)
Status: Active. Merged into `main` on 2026-09-27 (PR #2). Three content details on the card are still unconfirmed (see TODO).

---

## Decision 010

Date: 2026-09-27
Decision: Adopt persistent project memory: `AGENTS.md`, `CLAUDE.md` and the `.ai/` folder (`PROJECT_STATE`, `DECISIONS`, `TODO`, `HANDOFF`).
Reason: So another agent on another computer can continue the work without this conversation.
Files affected: `AGENTS.md`, `CLAUDE.md`, `.ai/*`
Status: Active

---

## Decision 011

Date: 2026-09-27
Decision: Deploy only the public site. `.vercelignore` keeps these out of Vercel deployments, while leaving them in Git:
- project memory, agent instructions and `archive/`
- scripts, reports and package files
- the source photos in `house/`

Reference-only files (old reports, unused images, `info.txt`) move to `archive/`. `node_modules/` is no longer tracked.
Reason: Those files were publicly reachable on the live domain, and the committed `node_modules/` bloated the repo. Production now carries only what pages use.
Files affected: `.vercelignore`, `archive/`, `.gitignore` (unchanged; `node_modules/` untracked), PR #4
Status: Active. When adding a new public file type or folder, check it isn't matched by `.vercelignore`.

---

## Decision 012

Date: 2026-09-27
Decision: `main` stays the production site. The branches `redesign/type-and-layout` and `vercel/install-vercel-web-analytics-twy28q` are kept as archive branches, not merged. They are also preserved as the tags `archive/redesign-type-and-layout` and `archive/vercel-web-analytics-2026-09-16`. The owner created and pushed these on 2026-09-27 from their own machine, because the cloud session's tag push was refused (HTTP 403). With the tags in place, the branches can be deleted.
Reason: They share no Git history with `main`. They hold a separate, earlier Aspen II site with a different design and page structure, so merging would replace production rather than improve it (see `AGENTS.md`: preserve the existing design). They also contain unverified business claims.
Files affected: none (Git refs only)
Status: Active. Porting individual pages or ideas from them is an owner decision.

---

## Decision 013

Date: 2026-09-27
Decision: For now, the site's public domain is `aspen2bakersfield.store`. All canonical tags, Open Graph and Twitter URLs, JSON-LD URLs, `sitemap.xml`, `robots.txt` and `llms.txt` use `https://aspen2bakersfield.store`.
Reason: The owner confirmed the site is served there. The previous canonical domain, `aspen2homes.com`, was last seen serving an old WordPress site. Pointing search engines at it would have sent them away from the live site.
Files affected: `index.html`, `floor-plans.html`, `financing.html`, `contact.html`, `design-card.html`, `llms.txt`, `robots.txt`, `sitemap.xml`
Status: Active, and temporary. Reverse it when moving to `aspen2homes.com`: one find-and-replace, plus a permanent redirect from the `.store` domain.
