import type { GeneratedComponent, Provider } from '../types';

const STORAGE_PREFIX = 'react-component-generator';
const API_KEY = `${STORAGE_PREFIX}.api-key`;
const PROVIDER = `${STORAGE_PREFIX}.provider`;
const PROMPT_HISTORY = `${STORAGE_PREFIX}.prompt-history`;
const COMPONENTS = `${STORAGE_PREFIX}.components`;

function loadJson<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function saveJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Keep the application usable when browser storage is unavailable.
  }
}

export function loadApiKey(): string {
  return loadJson(API_KEY, '');
}

export function saveApiKey(apiKey: string) {
  saveJson(API_KEY, apiKey);
}

export function loadProvider(): Provider {
  const provider = loadJson<string>(PROVIDER, 'google');
  return provider === 'anthropic' || provider === 'google' ? provider : 'google';
}

export function saveProvider(provider: Provider) {
  saveJson(PROVIDER, provider);
}

export function loadPromptHistory(): string[] {
  const prompts = loadJson<unknown>(PROMPT_HISTORY, []);
  return Array.isArray(prompts) && prompts.every((prompt) => typeof prompt === 'string') ? prompts : [];
}

export function savePromptHistory(prompts: string[]) {
  saveJson(PROMPT_HISTORY, prompts);
}

export function loadComponents(): GeneratedComponent[] {
  const components = loadJson<Array<Omit<GeneratedComponent, 'createdAt'> & { createdAt: string }>>(COMPONENTS, []);

  if (!Array.isArray(components)) {
    return [];
  }

  return components.flatMap((component) => {
    const createdAt = new Date(component.createdAt);
    return typeof component.id === 'string' &&
      typeof component.prompt === 'string' &&
      typeof component.code === 'string' &&
      !Number.isNaN(createdAt.getTime())
      ? [{ ...component, createdAt }]
      : [];
  });
}

export function saveComponents(components: GeneratedComponent[]) {
  saveJson(COMPONENTS, components);
}
