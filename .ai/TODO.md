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

- [ ] Remove or archive `info.txt`, the old 585 N Wendy Dr listing data.
- [ ] Move or label the old root audit reports from 2026-09-16 (about `hshomeshub.site`) so they aren't mistaken for the current site's state.
- [ ] Rename `package.json` `"name"` from `hshomeshub` to match the project.
- [ ] Remove other dead leftovers found on 2026-09-27: the `#viewCounter` animated counter in `main.js` (no page has that element) and the unused `.oh-log-link` style in `styles.css`.
- [ ] Decide what to do with the old branches `redesign/type-and-layout` and `vercel/install-vercel-web-analytics-twy28q`: merge, archive or delete. Deleting needs explicit owner permission.

## Done

- [x] 2026-09-25: Built the brand design card and vector mark (PR #2, draft).
- [x] 2026-09-26: Fixed mobile and desktop layout, navigation and forms (PR #3, merged).
- [x] 2026-09-27: Set up persistent AI project memory.
- [x] 2026-09-27: Corrected two errors in `.ai/` and merged PR #2 (design card, vector mark, project memory) into `main`.
- [x] 2026-09-27: Removed the dead open-house registration-count code from `main.js` and `styles.css` (branch `claude/sharp-pasteur-dkxsfr`, PR pending merge).
