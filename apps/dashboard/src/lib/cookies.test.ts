import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCookie, removeCookie, setCookie } from './cookies';

afterEach(() => {
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0]?.trim();
    if (name) {
      document.cookie = `${name}=; path=/; max-age=0`;
    }
  });
});

describe('cookies', () => {
  it('round-trips a plain value', () => {
    setCookie('theme', 'dark', 60);
    expect(getCookie('theme')).toBe('dark');
  });

  it('returns null for a missing key', () => {
    expect(getCookie('does-not-exist')).toBeNull();
  });

  it('round-trips a value containing ; and =', () => {
    setCookie('weird', 'a=b;c=d', 60);
    expect(getCookie('weird')).toBe('a=b;c=d');
  });

  it('removeCookie clears a previously set value', () => {
    setCookie('temp', 'value', 60);
    expect(getCookie('temp')).toBe('value');

    removeCookie('temp');
    expect(getCookie('temp')).toBeNull();
  });

  it('sets SameSite=Lax so the cookie is not sent on cross-site requests', () => {
    const setSpy = vi.spyOn(document, 'cookie', 'set');
    setCookie('theme', 'dark', 60);

    expect(setSpy).toHaveBeenCalledWith(
      expect.stringContaining('SameSite=Lax'),
    );

    setSpy.mockRestore();
  });
});
