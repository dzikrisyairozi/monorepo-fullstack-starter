import { afterEach, describe, expect, it } from 'vitest';
import { act, render, renderHook, screen } from '@testing-library/react';
import { LayoutProvider, useLayout } from './layout-provider';

afterEach(() => {
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0]?.trim();
    if (name) {
      document.cookie = `${name}=; path=/; max-age=0`;
    }
  });
});

describe('useLayout', () => {
  it('throws when called outside a LayoutProvider', () => {
    expect(() => renderHook(() => useLayout())).toThrow(
      'useLayout must be used within a LayoutProvider',
    );
  });

  it('defaults to variant=inset and collapsible=icon', () => {
    const { result } = renderHook(() => useLayout(), {
      wrapper: LayoutProvider,
    });

    expect(result.current.variant).toBe('inset');
    expect(result.current.collapsible).toBe('icon');
  });

  it('persists variant and collapsible changes to cookies', () => {
    const { result } = renderHook(() => useLayout(), {
      wrapper: LayoutProvider,
    });

    act(() => result.current.setVariant('floating'));
    act(() => result.current.setCollapsible('none'));

    expect(result.current.variant).toBe('floating');
    expect(result.current.collapsible).toBe('none');
    expect(document.cookie).toContain('layout_variant=floating');
    expect(document.cookie).toContain('layout_collapsible=none');
  });

  it('a fresh provider reads persisted cookies as its initial state', () => {
    const { result: first } = renderHook(() => useLayout(), {
      wrapper: LayoutProvider,
    });
    act(() => first.current.setVariant('sidebar'));

    const { result: second } = renderHook(() => useLayout(), {
      wrapper: LayoutProvider,
    });
    expect(second.current.variant).toBe('sidebar');
  });

  it('resetLayout returns both values to their defaults', () => {
    const { result } = renderHook(() => useLayout(), {
      wrapper: LayoutProvider,
    });

    act(() => result.current.setVariant('floating'));
    act(() => result.current.setCollapsible('offcanvas'));
    act(() => result.current.resetLayout());

    expect(result.current.variant).toBe('inset');
    expect(result.current.collapsible).toBe('icon');
  });

  it('renders children', () => {
    render(
      <LayoutProvider>
        <div>child content</div>
      </LayoutProvider>,
    );
    expect(screen.getByText('child content')).toBeTruthy();
  });
});
