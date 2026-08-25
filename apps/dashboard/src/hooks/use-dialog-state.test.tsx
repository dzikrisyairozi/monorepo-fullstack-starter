import { StrictMode, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDialogState } from './use-dialog-state';

function TestPage() {
  const [open, setOpen] = useDialogState<'create'>();
  const [renderCount, setRenderCount] = useState(0);

  return (
    <div>
      <button onClick={() => setOpen('create')}>open</button>
      {open === 'create' && (
        <div>
          <button
            onClick={() => {
              setOpen(null);
              setRenderCount((n) => n + 1);
            }}
          >
            close
          </button>
        </div>
      )}
      <span data-testid="renders">{renderCount}</span>
    </div>
  );
}

describe('useDialogState', () => {
  it('refocuses the trigger exactly once after close, even under StrictMode double-invocation', async () => {
    const user = userEvent.setup();

    render(
      <StrictMode>
        <TestPage />
      </StrictMode>,
    );

    const openButton = screen.getByText('open');
    await user.click(openButton);

    // Only count focus() calls made by the close-restore logic, not the
    // real click above (a real click focuses its target too).
    const focusSpy = vi.spyOn(openButton, 'focus');
    await user.click(screen.getByText('close'));

    // Focus restore is deferred with setTimeout(..., 0).
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(focusSpy).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(openButton);

    focusSpy.mockRestore();
  });
});
