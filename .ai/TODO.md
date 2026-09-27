# TODO

Last Updated: 2026-09-27

## Now

- [ ] Owner (ideally a lawyer) reviews `privacy.html`. In particular, confirm: the 45-day response commitment and the data retention wording. (The "reply STOP" line and the lender-introduction sentence were removed at the owner's request on 2026-09-27.)
- [ ] Owner answers the design-card questions; apply them to `design-card.html` in a new branch and PR:
  - [ ] Confirm the wordmark font. Fira Sans Condensed is a best match, not confirmed.
  - [ ] Get the contractor (CSLB) license number and add it to the card's facts block.
  - [ ] Confirm the tagline "Est. 1998" with "Elevated since 2026" is intentional.
  - [ ] Compare `aspen2-mark.svg` with the original logo before using it for print or signage.

## Next

- [ ] Submit `https://aspen2bakersfield.store/sitemap.xml` in Google Search Console, so Google indexes the new domain.

- [ ] Confirm the CRM endpoint (`www.harbisonstandard.com/hq/api/openhouse`, used in `main.js` and `signin-log.html`) is the right destination for Aspen II Homes leads.
- [ ] Replace the client-side password gate on `signin-log.html` with real protection, or remove the page from the public deployment.
- [ ] Decide whether the countdown banner should run. If yes, set a real future `data-deadline` in `index.html`.
- [ ] Get confirmed specs for The Tranquil Abode and photography for The Grand Haven.

## Later / Cleanup

- [ ] When moving to `aspen2homes.com`: switch the domain in the public files back, connect it in Vercel, and permanently redirect `aspen2bakersfield.store` to it (Decision 013).

- [ ] Owner decides whether to port anything from the archived separate site (tag `archive/redesign-type-and-layout`): community pages, per-plan pages, about/process/warranty pages, `api/lead.js`. Verify its claims first ("31 years", "since 1994", 1-2-10 warranty, CSLB license number).
- [ ] Delete the fully merged branches on GitHub (owner approved 2026-09-27): `v0-rebrand-from-hshomeshub`, `claude/aspen-2-homes-design-card-wk2tq5`, and `claude/sharp-pasteur-dkxsfr` once its last PR merges.
- [ ] Owner decides whether to delete `redesign/type-and-layout` and `vercel/install-vercel-web-analytics-twy28q`. Both are safely preserved as `archive/*` tags.

## Done

- [x] 2026-09-27: Added `privacy.html` and linked it site-wide, and stopped putting lead details in the thank-you URL (Decision 014).

- [x] 2026-09-27: The owner confirmed the site is live at https://aspen2bakersfield.store.

- [x] 2026-09-27: Switched every canonical/OG/JSON-LD/sitemap/robots/llms URL from `aspen2homes.com` to `aspen2bakersfield.store` (owner request).

- [x] 2026-09-25: Built the brand design card and vector mark (PR #2, draft).
- [x] 2026-09-26: Fixed mobile and desktop layout, navigation and forms (PR #3, merged).
- [x] 2026-09-27: Set up persistent AI project memory.
- [x] 2026-09-27: Corrected two errors in `.ai/` and merged PR #2 (design card, vector mark, project memory) into `main`.
- [x] 2026-09-27: PR #4 merged. It:
  - removed the dead registration-count and view-counter code
  - stopped tracking `node_modules/`
  - added `.vercelignore`
  - moved old reports, unused images and `info.txt` into `archive/`
  - renamed the package to `aspen2`
- [x] 2026-09-27: Audited every branch. The owner created the `archive/*` tags for the two unrelated-history branches, and they were verified against the branch tips.
