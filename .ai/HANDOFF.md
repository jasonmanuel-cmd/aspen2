# AI HANDOFF

Last Updated: 2026-09-27
Agent: Claude Code (cloud session)
Machine: Claude Code on the web, a temporary cloud container. Nothing is kept outside Git.
Branch: `main`. This update was made on `claude/sharp-pasteur-dkxsfr` and merged.
Commit: the merge of the PR titled `Update .ai handoff for syncing across machines`.

## Syncing Across Machines

The owner works from both a desktop and a laptop, and each has its own Claude session. All shared project knowledge lives in this repo: `AGENTS.md`, `CLAUDE.md` and `.ai/`. On each machine, before starting work:

1. Open the local clone and switch to `main`: `git checkout main`
2. Pull the latest: `git pull origin main`
3. Start Claude in that folder. `CLAUDE.md` tells it to read `AGENTS.md` and the four `.ai/` files first.

Before ending any session, update `.ai/`, commit, push, and get it merged into `main`, so the other machine sees it. Conversations don't sync between machines; only the repository does.

## Where Things Stand

- **Production:** `main` deploys through Vercel (project `aspen2`). The public domain is **https://aspen2bakersfield.store** for now (Decision 013). The owner confirmed on 2026-09-27 that it's live. `aspen2homes.com` is not this site; a Sept 17 check found an old WordPress site there.
  - The last site-code change was PR #4 (`3eb2b0e`). PR #5 and this update changed only docs.
- **PRs merged:**
  - PR #3: mobile and desktop fixes
  - PR #2: design card and project memory
  - PR #4: dead-code removal, `.vercelignore`, `archive/`, untracked `node_modules/`
  - PR #5: branch audit docs
- **Branches:** six still exist (see the Branches table in `PROJECT_STATE.md`).
  - The owner approved deleting the three fully merged ones, but two attempts didn't remove them.
  - The two separate-site branches are safely preserved as the tags `archive/redesign-type-and-layout` and `archive/vercel-web-analytics-2026-09-16`.
- **Open owner questions:**
  - Why the branch deletions aren't taking effect (a screenshot or the `git push --delete` output was requested).
  - The three design-card answers: wordmark font, CSLB license number, "Elevated since 2026".

## What I Completed This Session

Across the whole session:
- A full-site mobile and desktop audit, with fixes.
- The six-models copy change.
- Doc fixes, and the PR #2 merge.
- Dead-code removal.
- A branch audit.
- Repo and deploy cleanup.
- Verification of the archive tags.

This last update records that the branch deletions haven't taken effect yet, and adds the sync instructions above.

## Latest Change (2026-09-27)

- **Privacy policy (Decision 014):**
  - Added `privacy.html` in the site's style, linked from every footer and under both contact forms, and added to `sitemap.xml`.
  - `main.js` no longer puts a lead's name, email and phone in the thank-you URL; `thank-you.html` reads them from sessionStorage.
  - Removed the unused Google Fonts preconnects.
  - Browser-tested: no JS errors at phone or desktop size, both forms land on the thank-you page with the visitor's name shown, and there are no query parameters in the URL.
  - The policy wording needs owner or legal review before relying on it.
- **Domain switch:** At the owner's request, every canonical, OG/Twitter, JSON-LD, sitemap, robots and llms URL moved from `aspen2homes.com` to `aspen2bakersfield.store`. That's 38 references in 8 public files. The email address `Aspen2homes@gmail.com` is unchanged. The JSON-LD on every page still parses. See Decision 013.

## Files Changed (earlier update)

`.ai/PROJECT_STATE.md` (deletion status, last-known-good commit) and `.ai/HANDOFF.md`.

## Important Discoveries

- The cloud session can push only to its working branch. It can't push tags, delete branches, or open `*.vercel.app` previews. The Vercel connector also isn't authorized for the owner's team. Tags, branch deletions and preview checks have to be done by the owner.
- The owner's Windows clone is at `C:\Users\blunts\Desktop\Aspen II`. Tag pushes from there work.

## What Is Not Finished

- Delete `v0-rebrand-from-hshomeshub`, `claude/aspen-2-homes-design-card-wk2tq5` and `claude/sharp-pasteur-dkxsfr`. The owner approved this, but it hasn't taken effect yet.
- Optionally delete `redesign/type-and-layout` and `vercel/install-vercel-web-analytics-twy28q`. They're safe to delete now that they're tagged, but the owner hasn't decided.
- The design-card answers, and the rest of `.ai/TODO.md`.

## EXACT NEXT STEP

1. Check the branch state with `git fetch --prune && git branch -r`, or on https://github.com/jasonmanuel-cmd/aspen2/branches.
2. If the three merged branches still exist, help the owner delete them. Read the error from `git push origin --delete <branch>`, and check Settings → Rules → Rulesets for a rule that blocks deletion.
3. Once they're gone, update the Branches table in `PROJECT_STATE.md` and the TODO.

## Warnings

- Keep the design and architecture as they are unless the owner asks for changes (see `AGENTS.md`).
- Don't merge the separate-site branches or tags into `main` (Decision 012).
- When adding new public files, check `.vercelignore` doesn't exclude them (Decision 011).
- Don't copy the sign-in-log password, the Formspree form ID or any credentials into docs.
- Never force-push, `reset --hard` or delete branches without explicit permission.
- Don't add back a caching service worker (Decision 003).

## Verification

- Branch state was checked three times with the GitHub API (`list_branches`) and `git ls-remote`, most recently 2026-09-27. Each time all six branches existed, on unchanged commits.
- Both `archive/*` tags exist on GitHub and match their branch tips.
- This update changes docs only, so no site checks were needed.
