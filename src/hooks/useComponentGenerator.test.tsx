import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { GeneratedComponent } from '../types';
import { loadComponents, loadPromptHistory, saveComponents } from '../utils/localStorage';
import { useComponentGenerator } from './useComponentGenerator';

describe('useComponentGenerator persistence', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('restores generated components from localStorage', () => {
    const components: GeneratedComponent[] = [{
      id: 'saved-component',
      prompt: 'Saved prompt',
      code: 'render(<div />)',
      createdAt: new Date('2026-01-01T12:00:00.000Z'),
    }];
    saveComponents(components);

    const { result } = renderHook(() => useComponentGenerator());

    expect(result.current.components).toEqual(components);
  });

  it('persists successful generations and their prompts', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ code: 'render(<div />)' }),
    }));
    const { result } = renderHook(() => useComponentGenerator());

    await act(async () => {
      await result.current.generate('Create a profile card', undefined, 'google');
    });

    await waitFor(() => {
      expect(loadPromptHistory()).toEqual(['Create a profile card']);
      expect(loadComponents()).toMatchObject([{
        prompt: 'Create a profile card',
        code: 'render(<div />)',
      }]);
    });
  });
});
