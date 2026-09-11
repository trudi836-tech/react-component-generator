import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { saveApiKey, saveProvider } from './utils/localStorage';

describe('App persistence', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: async () => ({ envKeys: { anthropic: false, google: false } }),
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('restores the API key and provider selection', () => {
    saveApiKey('persisted-key');
    saveProvider('anthropic');

    render(<App />);

    expect(screen.getByLabelText('API Key')).toHaveValue('persisted-key');
    expect(screen.getByLabelText('Provider')).toHaveValue('anthropic');
  });
});
