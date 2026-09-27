# AI HANDOFF

Last Updated: 2026-09-27
Agent: Claude Code (cloud session)
Machine: Claude Code on the web, a temporary cloud container. Nothing is kept outside Git.
Branch: `claude/sharp-pasteur-dkxsfr`, restarted from `main` at `3eb2b0e` (the merge of PR #4). Its only change is this docs update.
Commit: the commit titled `Record archive tags and approved branch deletions in .ai docs`.

## What I Was Asked To Do

1. Delete the fully merged branches. The owner approved this on 2026-09-27.
2. Record that the owner created the archive tags.

## What I Completed

- **Tags verified.** The owner created and pushed both tags from their own machine, and each matches its branch tip:
  - `archive/redesign-type-and-layout` points to `c7e9049`, the tip of `redesign/type-and-layout`
  - `archive/vercel-web-analytics-2026-09-16` points to `cd6214c`, the tip of `vercel/install-vercel-web-analytics-twy28q`
- **Branch deletion failed from here.** The git proxy rejected `git push --delete` for all three merged branches, and the GitHub connector has no delete-branch action. The branches still exist; the owner has to delete them on GitHub.
- **Docs updated.** `.ai/PROJECT_STATE.md` (Branches table), `.ai/DECISIONS.md` (Decision 012), `.ai/TODO.md` and this file now reflect the tags and the approved deletions.

## Files Changed

`.ai/PROJECT_STATE.md`, `.ai/DECISIONS.md`, `.ai/TODO.md`, `.ai/HANDOFF.md`. No site code changed.

## Important Discoveries

- This cloud session can push only to its own working branch. It can't push tags or delete any branch, including its own. Tags and branch deletions have to be done by the owner, either on GitHub or from their own clone (`C:\Users\blunts\Desktop\Aspen II`).

## Problems Encountered

`git push origin --delete <branch>` failed with "the remote end hung up unexpectedly" for every branch. This is a proxy restriction, not a repository problem.

## What Is Not Finished

- **Delete these branches** (owner approved; all are fully merged):
  - `v0-rebrand-from-hshomeshub`
  - `claude/aspen-2-homes-design-card-wk2tq5`
  - `claude/sharp-pasteur-dkxsfr`, after the PR carrying this commit merges
- The owner hasn't decided yet whether to delete `redesign/type-and-layout` and `vercel/install-vercel-web-analytics-twy28q`. Both are safe to delete now that the tags exist.
- The design-card questions and the rest of `.ai/TODO.md`.

## EXACT NEXT STEP

Merge the PR from `claude/sharp-pasteur-dkxsfr`, then delete the merged branches, either at https://github.com/jasonmanuel-cmd/aspen2/branches or from the owner's clone:

```
git push origin --delete v0-rebrand-from-hshomeshub claude/aspen-2-homes-design-card-wk2tq5 claude/sharp-pasteur-dkxsfr
```

Then update the `.ai/` Branches table.

## Warnings

- Keep the design and architecture as they are unless the owner asks for changes (see `AGENTS.md`).
- Don't merge the unrelated-site branches or tags into `main` (Decision 012).
- When adding new public files, check `.vercelignore` doesn't exclude them (Decision 011).
- Don't copy the sign-in-log password, the Formspree form ID or any credentials into docs.
- Never force-push, `reset --hard` or delete branches without explicit permission.
- Don't add back a caching service worker (Decision 003).

## Verification

- `git rev-parse` confirms each `archive/*` tag resolves to the same commit as its branch tip.
- This change touches docs only, so no site checks were needed.
