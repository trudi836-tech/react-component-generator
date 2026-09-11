---
name: commit
description: Analyze working-tree changes and prepare conventionally prefixed Korean Git commits when the user asks to commit, save changes, or requests "커밋".
---

# Commit

변경사항을 의도와 영향 범위에 맞는 논리적 커밋으로 저장한다. 이 스킬은 `커밋`, `커밋해줘`, 또는 변경사항을 저장해 달라는 요청에 사용한다.

## Workflowㄴ

1. `git status --short`와 `git diff`를 확인해 추적·미추적 변경사항 및 현재 변경 범위를 분석한다. 필요하면 `git diff --staged`와 관련 파일을 확인한다.
2. 서로 독립적으로 되돌리거나 검토할 수 있는 변경을 논리적 단위로 분류한다. 관련 없는 기존 변경은 사용자 소유로 간주해 스테이징하거나 수정하지 않는다.
3. 각 단위에 한국어 Conventional Commit 메시지를 작성한다. 형식은 `feat: 요약`, `fix: 요약`, `refactor: 요약`, `chore: 요약` 중 변경 성격에 맞는 것을 사용한다.
4. 각 단위의 대상 파일만 스테이징하고 즉시 커밋한다. 별도의 사용자 승인을 기다리지 않는다.
5. 완료 뒤 커밋 해시, 커밋 메시지, 남은 변경사항을 간결하게 보고한다.

## Boundaries

- 하나의 명확한 논리 단위면 하나의 커밋으로 만든다. 여러 단위가 섞였으면 각각 별도 커밋으로 제안한다.
- `git diff`에 표시되지 않는 미추적 파일은 `git status --short`로 확인하고, 내용과 관련성을 검토한 뒤에만 대상에 포함한다.
- 커밋 요청은 현재 작업 트리의 관련 변경을 커밋할 권한으로 간주한다. 단, 관련 없는 기존 변경은 포함하지 않는다.
- 커밋 메시지는 변경 결과를 짧고 구체적인 한국어 문장으로 쓴다. 마침표는 생략한다.
