import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchProvider, useSearch } from './search-provider';

describe('useSearch', () => {
  it('throws when called outside a SearchProvider', () => {
    expect(() => renderHook(() => useSearch())).toThrow(
      'useSearch must be used within a SearchProvider',
    );
  });

  it('starts closed', () => {
    const { result } = renderHook(() => useSearch(), {
      wrapper: SearchProvider,
    });
    expect(result.current.open).toBe(false);
  });

  it('setOpen(true) opens it', () => {
    const { result } = renderHook(() => useSearch(), {
      wrapper: SearchProvider,
    });
    act(() => result.current.setOpen(true));
    expect(result.current.open).toBe(true);
  });

  it('Cmd/Ctrl+K toggles open state', async () => {
    const user = userEvent.setup();
    const { result } = renderHook(() => useSearch(), {
      wrapper: SearchProvider,
    });

    await user.keyboard('{Control>}k{/Control}');
    expect(result.current.open).toBe(true);

    await user.keyboard('{Control>}k{/Control}');
    expect(result.current.open).toBe(false);
  });
});
