# Server Module Guidelines

## Module Context

`server/` is the Bun API proxy for Anthropic and Google generation. It sanitizes provider output before the browser executes it through `react-live`.

## Commands

- `bun run server` — run the watched API server.
- `bun run test -- server` — run the server unit tests through Vitest.

## Local Rules

- Keep provider keys server-side. `ENV_KEYS` reads process environment variables, while `/api/config` exposes only their presence (`index.ts:59-62`, `index.ts:147-156`).
- Maintain the generated-code contract: generated code has no imports or TypeScript and requires a `render(...)` call (`index.ts:10-20`). Normalize responses through `stripCodeFences` and `ensureRenderCall` before returning them (`index.ts:188`).
- Do not replace the ordered Google fallback with parallel requests; `withModelFallback` returns the first successful result and throws the final error only after every model fails (`fallback.ts:11-19`).
- Keep pure transformation and fallback helpers independently testable. Their adjacent tests cover code fences, render injection, empty model lists, and retry behavior (`generator.test.ts`, `fallback.test.ts`).
