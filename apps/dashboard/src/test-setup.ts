import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { initDashboardI18n } from './i18n';

// Real translations, not the raw keys - any test asserting on rendered
// button/label text needs the actual strings, same as production.
initDashboardI18n();

afterEach(() => {
  cleanup();
});

// jsdom does not implement matchMedia. Anything using useIsMobile or a
// prefers-color-scheme / prefers-reduced-motion query needs this in tests.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
