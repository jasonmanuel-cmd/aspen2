# TODO

Last Updated: 2026-09-27

## Now

- [ ] Owner answers the design-card questions; apply them to `design-card.html` in a new branch and PR:
  - [ ] Confirm the wordmark font. Fira Sans Condensed is a best match, not confirmed.
  - [ ] Get the contractor (CSLB) license number and add it to the card's facts block.
  - [ ] Confirm the tagline "Est. 1998" with "Elevated since 2026" is intentional.
  - [ ] Compare `aspen2-mark.svg` with the original logo before using it for print or signage.

## Next

- [ ] Confirm the CRM endpoint (`www.harbisonstandard.com/hq/api/openhouse`, used in `main.js` and `signin-log.html`) is the right destination for Aspen II Homes leads.
- [ ] Replace the client-side password gate on `signin-log.html` with real protection, or remove the page from the public deployment.
- [ ] Decide whether the countdown banner should run. If yes, set a real future `data-deadline` in `index.html`.
- [ ] Get confirmed specs for The Tranquil Abode and photography for The Grand Haven.

## Later / Cleanup

- [ ] Owner decides whether to port anything from the archived separate site (branch `redesign/type-and-layout`): community pages, per-plan pages, about/process/warranty pages, `api/lead.js`. Verify its claims first ("31 years", "since 1994", 1-2-10 warranty, CSLB license number).
- [ ] With owner permission, delete branches `claude/sharp-pasteur-dkxsfr`, `claude/aspen-2-homes-design-card-wk2tq5` and `v0-rebrand-from-hshomeshub` (fully merged). Keep `redesign/type-and-layout` and `vercel/install-vercel-web-analytics-twy28q` until they are tagged (`archive/*`, commands in PROJECT_STATE Known Problems).

## Done

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
- [x] 2026-09-27: Audited every branch. The two unrelated-history branches are kept as archives; tagging them was blocked (HTTP 403 on tag push).
