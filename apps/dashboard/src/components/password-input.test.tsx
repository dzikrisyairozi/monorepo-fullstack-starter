import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordInput } from './password-input';

describe('PasswordInput', () => {
  it('defaults to a password-type input', () => {
    render(<PasswordInput placeholder="Password" />);
    const input = screen.getByPlaceholderText('Password');
    expect(input).toHaveProperty('type', 'password');
  });

  it('toggling visibility flips the input type to text and back', async () => {
    const user = userEvent.setup();
    render(<PasswordInput placeholder="Password" />);

    const input = screen.getByPlaceholderText('Password');
    const toggle = screen.getByRole('button');

    await user.click(toggle);
    expect(input).toHaveProperty('type', 'text');

    await user.click(toggle);
    expect(input).toHaveProperty('type', 'password');
  });
});
