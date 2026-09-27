# PROJECT OPERATING INSTRUCTIONS

Before modifying this repository:

1. Read this entire file.
2. Read `.ai/PROJECT_STATE.md`.
3. Read `.ai/DECISIONS.md`.
4. Read `.ai/TODO.md`.
5. Read `.ai/HANDOFF.md`.
6. Inspect the existing code before proposing changes.
7. Check `git status` and current branch.

## SOURCE OF TRUTH

The current repository and its Git history are authoritative.

Do not recreate, redesign, restructure, or replace existing work merely
because another implementation seems preferable.

Preserve existing:
- design
- architecture
- functionality
- styling
- integrations

unless explicitly instructed otherwise.

## BEFORE MAKING CHANGES

Explain:
- what currently exists
- what you intend to change
- which files will change

Do not assume unfinished work should be replaced.

## AFTER COMPLETING WORK

Update:

`.ai/PROJECT_STATE.md`
`.ai/DECISIONS.md` if architectural/product decisions were made
`.ai/TODO.md`
`.ai/HANDOFF.md`

HANDOFF.md must contain enough information for another AI agent on
another computer to continue the project without access to this conversation.

Never place passwords, API keys, tokens, service-role keys,
or other secrets in these files.

## GIT SAFETY

Never:
- force push
- reset --hard
- delete branches
- overwrite uncommitted work

without explicit permission.

Before finishing, report:
- files changed
- tests/build performed
- current Git status
- recommended next action