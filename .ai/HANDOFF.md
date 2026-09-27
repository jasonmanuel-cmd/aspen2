# AI HANDOFF

Last Updated: 2026-09-27
Agent: Claude Code (cloud session)
Machine: Claude Code on the web, a temporary cloud container. Nothing is kept outside Git.
Branch: `claude/sharp-pasteur-dkxsfr`. It was restarted from `main` at `0c3befc`; its earlier PR, #3, was already merged.
Commit: the commit titled `Remove dead open-house registration count code` on this branch.

## What I Was Asked To Do

Remove the dead registration-count code. PR #3 removed the `#registrationCount` element from `contact.html`, but the code that fed it stayed behind in `main.js`.

## What I Completed

- **`main.js`:** removed
  - the `CRM_LOG_URL` constant (the GET `openhouse-log` endpoint)
  - `updateRegistrationCount()`
  - the IntersectionObserver that called it
  - the `openHouseCount` localStorage increment in both the tour form and the open-house form
- **`styles.css`:** removed the `.oh-count`, `.oh-count-num` and `.oh-count-label` rules.
- **`.ai/`:** updated `PROJECT_STATE.md`, `TODO.md` and this file.

## Files Changed

`main.js`, `styles.css`, `.ai/PROJECT_STATE.md`, `.ai/TODO.md`, `.ai/HANDOFF.md`.

## Important Discoveries

- `signin-log.html` still has its own copy of the `openhouse-log` URL and uses it on purpose. That page was not touched.
- Two other pieces of dead code remain and are listed in `.ai/TODO.md` under "Later":
  - the `#viewCounter` animated counter in `main.js`
  - the `.oh-log-link` style in `styles.css`

  They were left alone to keep this change scoped to what was asked.
- Visitors who used the old forms may still have an `openHouseCount` key in their browser's localStorage. It is harmless, and nothing reads it any more.

## Problems Encountered

None.

## What Is Not Finished

- The PR for this branch needs merging. Merge it once checks pass and the owner approves.
- The design-card questions and the rest of `.ai/TODO.md`.

## EXACT NEXT STEP

1. Merge this branch's PR into `main`.
2. After the merge, update `.ai/PROJECT_STATE.md`:
   - "Current Branch": `main`
   - "Last Known Good Commit": the new merge commit
   - Drop the "pending merge" wording.
3. Then ask the owner the three design-card questions (see `.ai/TODO.md` "Now").

## Warnings

- Keep the design and architecture as they are unless the owner asks for changes (see `AGENTS.md`).
- Don't copy the sign-in-log password, the Formspree form ID or any credentials into docs.
- Never force-push, `reset --hard` or delete branches without explicit permission.
- Don't add back a caching service worker (Decision 003).

## Verification

- `node --check main.js` passes.
- A grep finds no remaining references to `registrationCount`, `openHouseCount`, `CRM_LOG_URL` or `oh-count` in any page, script or stylesheet.
- In headless Chromium at phone size, with the network stubbed:
  - Both contact-page forms submit and redirect to `thank-you.html` with no JS errors.
  - The only outside requests are the lead POSTs (CRM, plus Formspree for the tour form). No GET to `openhouse-log`.
- Build: not applicable (static site). There is no test suite.
