# AI HANDOFF

Last Updated: 2026-09-27
Agent: Claude Code (cloud session)
Machine: Claude Code on the web, a temporary cloud container. Nothing is kept outside Git.
Branch: `claude/aspen-2-homes-design-card-wk2tq5`
Commit: the commit titled `chore: initialize persistent AI project memory` on this branch. Its parent is `3c810af`.

## What I Was Asked To Do

1. Build a brand design card for the Aspen II Homes website and logo.
2. Set up persistent project memory (`AGENTS.md`, `CLAUDE.md`, `.ai/*`) from an audit of the repo and its Git history, without changing application code.

## What I Completed

- **Design card:**
  - Added `design-card.html`, a one-page brand standards sheet ("Sheet A-0.1") covering logo versions, clear space, palette, type, site components and voice. It is `noindex` and works in light and dark.
  - Added `aspen2-mark.svg`, a vector redraw of the A-frame mark.
  - Commit `3c810af`, draft PR #2.
  - Also published as a private Claude artifact: https://claude.ai/artifact/4jpQKneGo4tAPtwJLUyhzz
- **PR monitoring:** watched PR #2 from 2026-09-25 to 2026-09-27. Checks stayed green and it had no conflicts with `main`. PR #3 was merged into `main` meanwhile, and a test merge still came out clean.
- **Project memory:** audited the repo, its history and branches, and wrote `.ai/PROJECT_STATE.md`, `.ai/DECISIONS.md`, `.ai/TODO.md` and `.ai/HANDOFF.md`, plus root `AGENTS.md` and `CLAUDE.md`, copied from the owner's templates.

## Files Changed

- This branch before this commit: `design-card.html` and `aspen2-mark.svg`, both new.
- This commit: `AGENTS.md`, `CLAUDE.md`, `.ai/PROJECT_STATE.md`, `.ai/DECISIONS.md`, `.ai/TODO.md`, `.ai/HANDOFF.md`, all new.
- No application code was changed.

## Important Discoveries

- `main` (`352043f`) is what production serves. This branch is 3 commits behind `main` (the PR #3 work). None of those commits touch the files this branch adds, so it merges cleanly.
- The site is plain static HTML, CSS and JS on Vercel, with no build step (`vercel.json`). Run it locally with `npm run dev`, which serves on port 3000.
- Leads go to an outside CRM at `harbisonstandard.com`, with Formspree as the backup. See `main.js`.
- `signin-log.html` has its password written into the client-side code. Treat that as a security problem, and never copy the value.
- Several root `.md` reports and `info.txt` are left over from the earlier `hshomeshub` real-estate site and are out of date.

## Problems Encountered

- None blocking.
- The repo's `scripts/audit-site.py` writes to `reports/site-audit.json`. To avoid changing tracked files, I ran a separate read-only link check on a copy of `main` instead. It found no broken internal links.

## What Is Not Finished

- PR #2 still needs the owner's sign-off, a decision on the three content questions (listed in `.ai/TODO.md` under "Now"), and a merge.
- The rest of the open items are listed in `.ai/TODO.md`.

## EXACT NEXT STEP

The owner reviews PR #2 (https://github.com/jasonmanuel-cmd/aspen2/pull/2) and the design card, then answers three questions:
1. Wordmark font name
2. CSLB license number
3. Whether "Elevated since 2026" is intended

Update `design-card.html` with the answers on this branch, update `.ai/*`, then mark PR #2 ready for review and merge it into `main`.

## Warnings

- Keep the design and architecture as they are unless the owner asks for changes (see `AGENTS.md`).
- Don't copy the sign-in-log password, the Formspree form ID or any credentials into docs.
- Never force-push, `reset --hard` or delete branches without explicit permission. This includes the old branches.
- Don't add back a caching service worker (Decision 003).
- Merging PR #2 also brings this `.ai/` memory into `main`.

## Verification

- **Build:** not applicable. The site is static and `npm run build` only prints a message.
- **Tests:** there is no test suite. A read-only local link check on `main` found no broken internal links. Rendering of the design card was checked with headless Chromium on 2026-09-25.
- **Deployment:** Vercel builds a preview for every push. PR #2's "Vercel Preview Comments" check passed. Production is https://aspen2homes.com, served from `main`.
- **Git status:** clean after this commit was pushed.
