import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TasksImportDialog } from './tasks-import-dialog';

function makeFile(name: string, sizeBytes: number, type = 'text/csv') {
  const file = new File(['x'], name, { type });
  Object.defineProperty(file, 'size', { value: sizeBytes });
  return file;
}

describe('TasksImportDialog', () => {
  it('rejects a CSV file over the 2MB size cap without reading it', async () => {
    const user = userEvent.setup();
    render(<TasksImportDialog open onOpenChange={vi.fn()} />);

    const input = screen.getByLabelText('CSV file') as HTMLInputElement;
    const tooLarge = makeFile('huge.csv', 2_000_001);
    await user.upload(input, tooLarge);

    expect(
      screen.getByText(/File is too large/i, { exact: false }),
    ).toBeTruthy();
    const importButton = screen.getByRole('button', {
      name: /Import/i,
    }) as HTMLButtonElement;
    expect(importButton.disabled).toBe(true);
  });

  it('accepts a CSV file at or under the size cap', async () => {
    const user = userEvent.setup();
    render(<TasksImportDialog open onOpenChange={vi.fn()} />);

    const input = screen.getByLabelText('CSV file') as HTMLInputElement;
    const csv = 'title,status,label,priority\nFix bug,todo,bug,high\n';
    const file = new File([csv], 'tasks.csv', { type: 'text/csv' });
    await user.upload(input, file);

    expect(await screen.findByText('Fix bug')).toBeTruthy();
  });
});
