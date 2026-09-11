---
name: create-pr
description: Create a GitHub pull request from the current branch, using the Korean template for react-component-generator-main and the English template elsewhere. Use when the user asks to open or create a PR.
---

# Create PR

Create a clear, review-ready GitHub pull request for the current branch. This skill is for creating PRs, not for implementing, committing, or pushing changes that the user has not authorized.

## Delegated execution

This skill can be assigned to a subagent as a self-contained PR-creation task. The delegating agent should provide the repository working directory, the user's PR request, any explicit base branch or PR options, and whether pushing an unpushed branch is authorized.

When running as a subagent, read [references/subagent-contract.md](references/subagent-contract.md). Complete the inspection and PR creation within the delegated repository, then return the required result to the delegating agent. Do not delegate the external PR mutation again.

## Before creating the PR

- Inspect the repository state, current branch, remotes, commit history, and diff against the intended base branch. Use the repository's PR conventions when they exist.
- Confirm the branch is not the base branch and check whether an open PR already exists for it. Do not create a duplicate.
- Select a sensible base branch from the repository default branch or the user's explicit choice. If this cannot be determined safely, ask the user.
- Check that the branch is available on its GitHub remote. If it has not been pushed, ask before pushing unless the user has explicitly authorized pushing as part of the request.
- Summarize actual changes and validation already run. Never claim tests, screenshots, issue links, or behavior that cannot be supported by the branch contents or available evidence.

## Choose the template

Use the Korean template only when the repository root resolves exactly to:

`C:\Users\student\Desktop\react-component-generator-main`

Read [references/korean.md](references/korean.md) for that repository. For every other repository, read [references/english.md](references/english.md). Fill in the template from the inspected diff; remove inapplicable optional sections rather than leaving placeholders.

## Create and report

- Use the GitHub CLI when available and authenticated. Set the PR title and body explicitly, target the selected base, and create the PR from the current branch.
- Preserve the user's requested draft state, reviewers, labels, assignees, and issue linkage. Do not invent any of them.
- If PR creation fails, report the exact actionable failure and do not retry mutations blindly.
- On success, provide the PR URL, title, base branch, and a compact summary of included changes and validation.
