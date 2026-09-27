# AI HANDOFF

Last Updated: 2026-09-27
Agent: Claude Code (cloud session, started from the owner's desktop app)
Machine: Claude Code on the web, a temporary cloud container. Nothing is kept outside Git.
Branch: `main`. This update was made on `claude/sharp-pasteur-dkxsfr` and merged.
Commit: the merge of the PR titled `Update .ai docs for the laptop`. The last site change before it is `a616a5d`.

## Syncing Across Machines

The owner works from both a desktop and a laptop, and each has its own Claude session. All shared project knowledge lives in this repo: `AGENTS.md`, `CLAUDE.md` and `.ai/`. On each machine, before starting work:

1. Open the local clone and switch to `main`: `git checkout main`. The desktop clone is at `C:\Users\blunts\Desktop\Aspen II`.
2. Pull the latest: `git pull origin main`
3. Start Claude in that folder. `CLAUDE.md` tells it to read `AGENTS.md` and the four `.ai/` files first.

Before ending any session, update `.ai/`, commit, push, and get it merged into `main`, so the other machine sees it. Conversations don't sync between machines; only the repository does.

## Where Things Stand

- **Production:** `main` deploys through Vercel (project `aspen2`) to **https://aspen2bakersfield.store**. The owner confirmed on 2026-09-27 that it's live. It's the domain "for now" (Decision 013). `aspen2homes.com` is not this site.
- **Open pull requests:** none.
- **Site:** a static HTML/CSS/JS site with six public pages: Home, Models, Financing, Contact, Thank-you and Privacy. It's mobile-optimized. Leads go to the CRM, with Formspree as a backup.
- **Branches:** six exist. The owner approved deleting the three fully merged ones:
  - `v0-rebrand-from-hshomeshub`
  - `claude/aspen-2-homes-design-card-wk2tq5`
  - `claude/sharp-pasteur-dkxsfr`

  Two deletion attempts didn't take effect, and the cause isn't known yet. The two separate-site branches are preserved as `archive/*` tags (see the Branches table in `PROJECT_STATE.md`).

## Pull Requests So Far

| PR | What it did |
|---|---|
| #3 | Mobile and desktop layout, navigation and form fixes; "six home models" copy |
| #2 | Brand design card, vector logo, and this `.ai/` memory system |
| #4 | Dead-code removal, `.vercelignore`, `archive/`, `node_modules/` untracked |
| #5–#7, #9 | Docs only: branch audit, archive tags, sync steps, domain notes |
| #8 | Every canonical, OG, JSON-LD, sitemap, robots and llms URL moved to `aspen2bakersfield.store` |
| #10 | New `privacy.html`, linked site-wide; lead details removed from the thank-you URL |
| #11–#15 | Owner's privacy-policy edits: removed "reply STOP" and the lender references, 30-day responses, 2-year retention with the purchase-records exception |

## Latest Change (this update)

Docs only. I updated all four `.ai/` files to reflect PRs #8–#15:
- the privacy policy is published and reviewed by the owner
- the last known good commit is now `a616a5d`
- a new TODO covers purging leads after 2 years, which the policy now promises

## Important Discoveries

- **What the cloud session can't do:**
  - push tags, or delete branches (even its own)
  - reach `aspen2bakersfield.store`, `aspen2homes.com` or `*.vercel.app`
  - use the Vercel connector, which isn't authorized for the owner's team

  Live-site checks, tags and branch deletions come from the owner. A local Claude session on the owner's machine may be able to do some of them.
- **CLA check:** a "Contributor License Agreement" check (the superagent / open-cla app) fails on every PR. It doesn't block merging. The owner was advised to uninstall it under Settings → GitHub Apps.
- **Retention promise:** the privacy policy now promises to delete contact details 2 years after last contact. That's an operational duty for the CRM and the Formspree inbox, not only website text.

## What Is Not Finished

See `.ai/TODO.md`. In priority order:
1. Submit `https://aspen2bakersfield.store/sitemap.xml` in Google Search Console.
2. Lead privacy: confirm the CRM endpoint is the right destination, and replace the client-side password on `signin-log.html` with real protection.
3. Delete the three merged branches.
4. The design-card answers: wordmark font, CSLB license number, "Est. 1998" / "Elevated since 2026".
5. Set up a routine to purge leads after 2 years.

## EXACT NEXT STEP

Ask the owner which item from the list above to take on next. If they want the branch cleanup:
1. Run `git fetch --prune && git branch -r`.
2. If the branches are still there, have the owner run `git push origin --delete v0-rebrand-from-hshomeshub claude/aspen-2-homes-design-card-wk2tq5 claude/sharp-pasteur-dkxsfr` from their clone and share the exact output. Also check Settings → Rules → Rulesets for a rule that blocks deletion.

## Warnings

- Keep the design and architecture as they are unless the owner asks for changes (see `AGENTS.md`).
- Don't merge the separate-site branches or tags into `main` (Decision 012).
- When adding new public files, check `.vercelignore` doesn't exclude them (Decision 011).
- If the site starts texting leads, adds cookies or ad pixels, or changes where leads go, update `privacy.html` in the same PR (Decision 014).
- Don't copy the sign-in-log password, the Formspree form ID or any credentials into docs.
- Never force-push, `reset --hard` or delete branches without explicit permission.
- Don't add back a caching service worker (Decision 003).

## Verification

- `main` at `a616a5d`:
  - The privacy page's structured data parses, and its canonical tag points at `aspen2bakersfield.store`.
  - It has no JS errors and no horizontal scroll at phone or desktop size.
  - Both contact forms reach `thank-you.html` with no personal details in the URL.
- Every PR from #8 to #15 had a successful Vercel deployment.
- This update changes docs only.
