import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ApprovalCard } from './approval-card';

const options = [
  { id: 'yes', label: 'Yes, proceed' },
  { id: 'no', label: 'No, cancel' },
];

describe('ApprovalCard', () => {
  it('resolves to the chosen option and stays resolved', async () => {
    const user = userEvent.setup();
    const onResolve = vi.fn();
    render(
      <ApprovalCard
        question="Deploy to production?"
        options={options}
        onResolve={onResolve}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Yes, proceed' }));

    expect(onResolve).toHaveBeenCalledWith(options[0]);
    expect(screen.getByText('Yes, proceed')).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'No, cancel' })).toBeNull();
    expect(screen.queryAllByRole('button').length).toBe(0);
  });
});
