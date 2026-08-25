import { StrictMode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, render, renderHook, screen } from '@testing-library/react';
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

  it('refocuses the trigger exactly once after close, even under StrictMode double-invocation', async () => {
    function TestPage() {
      const { open, setOpen } = useSearch();
      return (
        <div>
          <button onClick={() => setOpen(true)}>open</button>
          {open && <button onClick={() => setOpen(false)}>close</button>}
        </div>
      );
    }

    const user = userEvent.setup();
    render(
      <StrictMode>
        <SearchProvider>
          <TestPage />
        </SearchProvider>
      </StrictMode>,
    );

    const openButton = screen.getByText('open');
    await user.click(openButton);

    const focusSpy = vi.spyOn(openButton, 'focus');
    await user.click(screen.getByText('close'));

    // Focus restore is deferred with setTimeout(..., 0).
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(focusSpy).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(openButton);

    focusSpy.mockRestore();
  });
});
