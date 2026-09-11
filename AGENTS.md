# Repository Guidelines

## Project Structure & Module Organization

`src/` contains the React 19 client: reusable UI lives in `src/components/`, client state and API calls in `src/hooks/`, shared types in `src/types/`, and test setup in `src/test/`. `server/` is the Bun API proxy and response-normalization layer. Place tests beside their subject as `*.test.ts` or `*.test.tsx`. Static files belong in `public/`; generated output in `dist/` is ignored.

## Operational Commands

Use Bun; `bun.lock` is the committed lockfile.

- `bun install` — install locked dependencies.
- `bun run dev` — start the API server on port 3002 and Vite on port 5173.
- `bun run server` — run only the watched Bun API server.
- `bun run build` — type-check project references and create the production bundle.
- `bun run lint` — run ESLint across TypeScript and TSX files.
- `bun run test` or `bun run test:watch` — run Vitest once or in watch mode.

## Coding Style & Naming Conventions

Write TypeScript and TSX with two-space indentation and semicolons in application files. Use PascalCase for React components (`PromptInput.tsx`), camelCase for functions and hooks (`useComponentGenerator.ts`), and `*.test.ts(x)` for tests. Follow the existing ESLint flat configuration, including TypeScript, React Hooks, and React Refresh rules (`eslint.config.js:11-17`).

## Testing Guidelines

Vitest runs in jsdom and discovers only `src/**/*.test.{ts,tsx}` and `server/**/*.test.ts` (`vite.config.ts:16-20`). Use Testing Library to assert visible UI behavior; the shared setup cleans up rendered DOM after every test (`src/test/setup.ts:5-7`). Add focused tests whenever changing generated-code normalization, model fallback, or prompt submission behavior. No coverage threshold is configured.

## TDD Rule

**이 규칙은 Rigid — 상황에 맞게 변형하지 마라.** 하위 디렉토리의 `AGENTS.md`에 별도 TDD 규칙이 있으면 그것을 우선한다. 이 섹션은 전역 기본값(fallback)이다.

**반드시 적용:** 비즈니스 로직, API, 유틸리티, 버그 수정. **불필요:** 타입 정의, 설정 파일, 순수 UI 변경, SQL.

1. **RED:** 하나의 동작마다 하나의 테스트를 먼저 작성하고 반드시 실행한다. 실패 이유는 반드시 **기능 미구현**이어야 한다.
2. **GREEN:** 테스트를 통과시키는 최소 코드만 작성한다. **YAGNI**를 지키고 신규 및 기존 테스트 전체가 통과하는지 확인한다.
3. **REFACTOR:** 중복 제거, 이름 개선, 헬퍼 추출만 수행한다. green을 유지하고 새 동작을 추가하지 않는다.
4. **반복:** 다음 동작의 RED로 돌아간다.

테스트 전에 프로덕션 코드를 작성했다면 **반드시 삭제**하고 RED부터 다시 시작한다. "참고용"으로 남기는 것도 금지한다.

| 변명 | 원칙 |
| --- | --- |
| 너무 단순해서 테스트 불필요 | 단순한 동작도 요구사항과 회귀 방지를 검증한다. |
| 나중에 추가하겠다 | 테스트는 구현 순서의 일부이며 나중으로 미루지 않는다. |
| 시간이 없다 | TDD는 재작업과 디버깅 시간을 줄이는 필수 절차다. |
| 삭제하면 낭비 | 잘못된 순서의 코드는 비용이 아니라 정리 대상이다. |
| 프로토타입이다 | 적용 대상이면 프로토타입도 동일한 규칙을 따른다. |

## Golden Rules

- Keep generated preview code self-contained JavaScript: no imports, CSS modules, or TypeScript syntax; it must end in `render(<Component />)` (`server/index.ts:10-20`). Preserve both `stripCodeFences` and `ensureRenderCall` when changing this path (`server/index.ts:188`, `server/generator.ts:5-23`).
- Do not expose server environment keys to the client. The configuration endpoint returns booleans only (`server/index.ts:147-156`); API keys are resolved server-side with an optional request key (`server/index.ts:59-65`).
- Preserve Google model ordering and retry semantics: models are tried sequentially and the last error is surfaced (`server/index.ts:4-5`, `server/fallback.ts:11-19`).

## Commits & Pull Requests

Use concise conventional-style commits; the existing history uses `feat: React 컴포넌트 생성기 초기 구현`. Keep each commit scoped. PRs should summarize behavior changes, list validation commands, link relevant issues, and include screenshots for visual UI changes.

## Maintenance

If code and these rules diverge, propose an update to this file in the same change.
