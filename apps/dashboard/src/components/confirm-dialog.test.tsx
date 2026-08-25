import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { ConfirmDialog } from './confirm-dialog';

function Harness({
  onConfirm,
  confirmationValue,
}: {
  onConfirm: () => void;
  confirmationValue?: string;
}) {
  const [open, setOpen] = useState(true);
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      title="Delete item"
      description="This cannot be undone."
      onConfirm={onConfirm}
      confirmationValue={confirmationValue}
    />
  );
}

describe('ConfirmDialog', () => {
  it('fires onConfirm when the confirm button is clicked', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<Harness onConfirm={onConfirm} />);

    await user.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it('does not fire onConfirm when cancel is clicked', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<Harness onConfirm={onConfirm} />);

    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('does not fire onConfirm when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<Harness onConfirm={onConfirm} />);

    await user.keyboard('{Escape}');
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('disables confirm until the typed value matches confirmationValue', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<Harness onConfirm={onConfirm} confirmationValue="delete-me" />);

    const confirmButton = screen.getByRole<HTMLButtonElement>('button', {
      name: 'Confirm',
    });
    expect(confirmButton.disabled).toBe(true);

    await user.type(screen.getByRole('textbox'), 'delete-me');
    expect(confirmButton.disabled).toBe(false);

    await user.click(confirmButton);
    expect(onConfirm).toHaveBeenCalledOnce();
  });
});
