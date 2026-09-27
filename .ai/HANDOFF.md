# AI HANDOFF

Last Updated: 2026-09-27
Agent: Claude Code (cloud session)
Machine: Claude Code on the web, a temporary cloud container. Nothing is kept outside Git.
Branch: `main` (after this session, PR #2 is merged). The last change was made on `claude/aspen-2-homes-design-card-wk2tq5` and merged through PR #2.
Commit: the merge commit of PR #2 on `main`. Its first parent is `352043f` (the merge of PR #3).

## What I Was Asked To Do

1. Read `AGENTS.md`, `CLAUDE.md` and the `.ai/` files.
2. Fix two errors found in the `.ai/` docs.
3. Merge PR #2 (brand design card, vector logo mark, project memory) into `main`.

## What I Completed

- **Doc fixes**, both in `.ai/PROJECT_STATE.md`:
  - It listed "the open-house sign-up count" as a working feature of `main.js`. PR #3 removed the `#registrationCount` element from `contact.html`, so that code returns early and never runs. The line now says so.
  - The memory files described themselves as being on the PR #2 branch, which confused anyone reading `main`. All four files now describe `main` after the merge.
- **State updates:**
  - `.ai/DECISIONS.md`: Decision 009 moved from Proposed to Active.
  - `.ai/TODO.md`: the design-card questions stay open; added a cleanup item for the inert count code.
  - `.ai/HANDOFF.md`: rewritten for this session.
- **Merged PR #2** into `main` on the owner's instruction. The three design-card content questions were not answered first; they are still open.

## Files Changed

- `.ai/PROJECT_STATE.md`, `.ai/DECISIONS.md`, `.ai/TODO.md`, `.ai/HANDOFF.md`.
- No application code was changed.
- The PR #2 merge brought these new files into `main`: `design-card.html`, `aspen2-mark.svg`, `AGENTS.md`, `CLAUDE.md` and `.ai/*`.

## Important Discoveries

- `main` is what production serves (Vercel, static site, no build step). Run it locally with `npm run dev`, which serves on port 3000.
- `design-card.html` is `noindex` and not linked from the site, but it is publicly reachable at `/design-card` once deployed.
- A "Contributor License Agreement" check (superagent / open-cla app) fails on PRs in this repo. It is not a required check and does not block merging. The owner was advised to uninstall it; that is their decision.
- The Codex review bot on this repo has run out of usage credits and posts a notice instead of a review.

## Problems Encountered

- None blocking.

## What Is Not Finished

- The three design-card questions (wordmark font, CSLB license number, "Elevated since 2026" tagline). See `.ai/TODO.md` "Now".
- Everything else in `.ai/TODO.md`.

## EXACT NEXT STEP

Ask the owner for:
1. the wordmark font name
2. the CSLB license number
3. whether "Est. 1998" / "Elevated since 2026" is intended

Then:
1. Create a new branch from `main`.
2. Update `design-card.html` with the answers.
3. Update `.ai/*`.
4. Open a PR.

## Warnings

- Keep the design and architecture as they are unless the owner asks for changes (see `AGENTS.md`).
- Don't copy the sign-in-log password, the Formspree form ID or any credentials into docs.
- Never force-push, `reset --hard` or delete branches without explicit permission.
- Don't add back a caching service worker (Decision 003).

## Verification

- Build: not applicable (static site).
- Tests: there is no test suite. Only docs changed in this session.
- Merge: before merging, PR #2 had no conflicts with `main` (checked with `git merge-tree`).
- Deployment: Vercel deploys `main` to https://aspen2homes.com.
- Git status: clean after the push.
