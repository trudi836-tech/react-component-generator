import { describe, expect, it } from 'vitest';
import { isPromptLengthValid, MAX_PROMPT_LENGTH } from './prompt';

describe('isPromptLengthValid', () => {
  it('500자 프롬프트는 유효하다', () => {
    expect(isPromptLengthValid('a'.repeat(MAX_PROMPT_LENGTH))).toBe(true);
  });

  it('501자 프롬프트는 유효하지 않다', () => {
    expect(isPromptLengthValid('a'.repeat(MAX_PROMPT_LENGTH + 1))).toBe(false);
  });
});
