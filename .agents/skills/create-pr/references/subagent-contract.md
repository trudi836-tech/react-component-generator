# Subagent execution contract

## Inputs

Use the delegated repository as the only workspace. Treat the following as optional inputs that override repository inference: requested base branch, title, draft status, reviewers, labels, assignees, issue linkage, and push authorization.

## Authority boundary

Creating a PR is permitted only when the delegated request explicitly asks to create or open one. Pushing is separately permitted only when the user or delegating agent explicitly authorized it. Do not commit, edit repository files, merge, close, or update an existing PR as part of this task.

If a required decision or authorization is missing, stop before the mutation and report the precise question or blocker to the delegating agent. Do not request the same information directly from the user unless the delegation context permits it.

## Completion report

Return one of these outcomes:

- **Created:** PR URL, title, source branch, base branch, selected template language, concise change summary, and verification performed.
- **Already open:** existing PR URL and the reason no duplicate was created.
- **Blocked:** the exact failure or missing decision, plus any safe next action. Include whether an unpushed branch, GitHub CLI authentication, or base-branch selection caused the block.

Report only facts verified from the repository or GitHub CLI output. Never report a successful PR without its URL.
