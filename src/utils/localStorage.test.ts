import { beforeEach, describe, expect, it } from 'vitest';
import type { GeneratedComponent } from '../types';
import {
  loadApiKey,
  loadComponents,
  loadPromptHistory,
  loadProvider,
  saveApiKey,
  saveComponents,
  savePromptHistory,
  saveProvider,
} from './localStorage';

describe('localStorage persistence', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('stores and restores the API key and selected provider', () => {
    saveApiKey('secret-key');
    saveProvider('anthropic');

    expect(loadApiKey()).toBe('secret-key');
    expect(loadProvider()).toBe('anthropic');
  });

  it('restores prompt history and generated components, including their creation time', () => {
    const components: GeneratedComponent[] = [{
      id: 'component-1',
      prompt: 'Create a profile card',
      code: 'render(<div />)',
      createdAt: new Date('2026-01-01T12:00:00.000Z'),
    }];

    savePromptHistory(['Create a profile card']);
    saveComponents(components);

    expect(loadPromptHistory()).toEqual(['Create a profile card']);
    expect(loadComponents()).toEqual(components);
  });

  it('uses defaults when persisted data is invalid', () => {
    window.localStorage.setItem('react-component-generator.provider', 'invalid');
    window.localStorage.setItem('react-component-generator.components', '{not-json');

    expect(loadProvider()).toBe('google');
    expect(loadComponents()).toEqual([]);
  });
});
