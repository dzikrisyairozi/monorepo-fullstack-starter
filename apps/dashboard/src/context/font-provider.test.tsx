import { afterEach, describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { FontProvider, useFont } from './font-provider';

afterEach(() => {
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0]?.trim();
    if (name) {
      document.cookie = `${name}=; path=/; max-age=0`;
    }
  });
  document.documentElement.className = '';
});

describe('useFont', () => {
  it('throws when called outside a FontProvider', () => {
    expect(() => renderHook(() => useFont())).toThrow(
      'useFont must be used within a FontProvider',
    );
  });

  it('defaults to outfit and applies the matching class to <html>', () => {
    const { result } = renderHook(() => useFont(), { wrapper: FontProvider });

    expect(result.current.font).toBe('outfit');
    expect(document.documentElement.classList.contains('font-outfit')).toBe(
      true,
    );
  });

  it('setFont swaps the <html> class and persists to a cookie', () => {
    const { result } = renderHook(() => useFont(), { wrapper: FontProvider });

    act(() => result.current.setFont('inter'));

    expect(result.current.font).toBe('inter');
    expect(document.documentElement.classList.contains('font-inter')).toBe(
      true,
    );
    expect(document.documentElement.classList.contains('font-outfit')).toBe(
      false,
    );
    expect(document.cookie).toContain('dashboard_font=inter');
  });

  it('a fresh provider reads a persisted cookie as its initial state', () => {
    const { result: first } = renderHook(() => useFont(), {
      wrapper: FontProvider,
    });
    act(() => first.current.setFont('system'));

    const { result: second } = renderHook(() => useFont(), {
      wrapper: FontProvider,
    });
    expect(second.current.font).toBe('system');
  });
});
