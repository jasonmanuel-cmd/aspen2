# AI HANDOFF

Last Updated: 2026-09-27
Agent: Claude Code (cloud session)
Machine: Claude Code on the web, a temporary cloud container. Nothing is kept outside Git.
Branch: `main`. The work was done on `claude/sharp-pasteur-dkxsfr` and merged through PR #4.
Commit: the merge commit of PR #4 on `main`. Its first parent is `0c3befc`.

## What I Was Asked To Do

1. Look over the whole GitHub repo and find every branch.
2. Keep everything organized.
3. Make production the most efficient, well-built, mobile-friendly and optimized version of the site.

## What I Completed

- **Branch audit.** See the Branches table in `.ai/PROJECT_STATE.md`.
  - Three branches are fully merged: `claude/sharp-pasteur-dkxsfr`, `claude/aspen-2-homes-design-card-wk2tq5` and `v0-rebrand-from-hshomeshub`.
  - `redesign/type-and-layout` and `vercel/install-vercel-web-analytics-twy28q` share **no history** with `main`. They hold a separate, earlier Aspen II site. I archived both as annotated tags (`archive/redesign-type-and-layout`, `archive/vercel-web-analytics-2026-09-16`) and did not merge them (Decision 012).
- **Kept `main` as production.** It is the version already audited and fixed for mobile and desktop in PR #3.
- **Cleanup in PR #4:**
  - Removed dead code: the open-house registration count, the `#viewCounter` animation, and the `.oh-count*` and `.oh-log-link` styles.
  - Untracked `node_modules/` (116 files had been committed by mistake).
  - Added `.vercelignore`, so only the public site deploys (Decision 011).
  - Moved 21 old root reports, `lighthouse-report.json`, 9 unused images, `extra_photos/` and `info.txt` into `archive/`, with a README.
  - Renamed the package to `aspen2`.
- Updated all four `.ai/` files.

## Files Changed

- Code: `main.js` and `styles.css` (dead code removed), `package.json` (name).
- New: `.vercelignore`, `archive/README.md`.
- Moved into `archive/`: the root `*.md` reports (except `AGENTS.md` and `CLAUDE.md`), `lighthouse-report.json`, the unused root PNGs, `media/aspen-website-open-poster.jpg`, `extra_photos/` and `info.txt`.
- Untracked: `node_modules/`.
- Docs: `.ai/PROJECT_STATE.md`, `.ai/DECISIONS.md`, `.ai/TODO.md`, `.ai/HANDOFF.md`.

## Important Discoveries

- The unrelated-site branch includes a CSLB license number, "since 1994" and "31 years". None of these are verified, and "since 1994" conflicts with the design card's "Est. 1998". Don't use them without owner confirmation.
- That branch also has content that could help grow the site: six community pages, per-plan pages, about/process/warranty pages and a serverless lead handler. Porting any of it is an owner decision.

## Problems Encountered

- None blocking.
- Branch deletion needs explicit owner permission (`AGENTS.md`), so no branches were deleted.

## What Is Not Finished

- Deleting the five non-production branches (the archived ones are safe as tags). Waiting on owner permission.
- The design-card questions and the other `.ai/TODO.md` items.

## EXACT NEXT STEP

Ask the owner for permission to delete these branches on GitHub:
- `claude/sharp-pasteur-dkxsfr`
- `claude/aspen-2-homes-design-card-wk2tq5`
- `v0-rebrand-from-hshomeshub`
- `redesign/type-and-layout`
- `vercel/install-vercel-web-analytics-twy28q`

Then ask the three design-card questions.

## Warnings

- Keep the design and architecture as they are unless the owner asks for changes (see `AGENTS.md`).
- Don't merge the archived unrelated-site branches or tags into `main` (Decision 012).
- When adding new public files, check `.vercelignore` doesn't exclude them (Decision 011).
- Don't copy the sign-in-log password, the Formspree form ID or any credentials into docs.
- Never force-push, `reset --hard` or delete branches without explicit permission.
- Don't add back a caching service worker (Decision 003).

## Verification

- **Deploy tree.** I rebuilt exactly what Vercel will deploy (tracked files minus `.vercelignore` matches): 231 files, 18 MB. Every one of the 369 local references in the pages, CSS and JS resolves.
- **Serving.** The deploy tree serves the blueprint PDFs, and `archive/` returns 404.
- **Headless Chromium on the deploy tree:**
  - All six pages at 375, 820 and 1440 px: no horizontal scroll and no JS errors.
  - Mobile menu, deep-link anchors, lightbox swipe with 960px images, model preselect and inline form validation all work.
  - Both lead forms submit and redirect to `thank-you.html`, with the network stubbed.
- **Other checks.** `node --check main.js` passes. There is no build step and no test suite.
