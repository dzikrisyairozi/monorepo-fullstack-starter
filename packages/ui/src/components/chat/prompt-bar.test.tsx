import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PromptBar } from './prompt-bar';

function ControlledPromptBar({ onSend }: { onSend: (value: string) => void }) {
  const [value, setValue] = useState('');
  return <PromptBar value={value} onValueChange={setValue} onSend={onSend} />;
}

describe('PromptBar', () => {
  it('sends the trimmed message on Enter', async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();
    render(<ControlledPromptBar onSend={onSend} />);

    const textarea = screen.getByPlaceholderText('Ask anything...');
    await user.type(textarea, '  Hello there  ');
    await user.keyboard('{Enter}');

    expect(onSend).toHaveBeenCalledTimes(1);
    expect(onSend).toHaveBeenCalledWith('Hello there');
  });

  it('inserts a newline on Shift+Enter instead of sending', async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();
    render(<ControlledPromptBar onSend={onSend} />);

    const textarea = screen.getByPlaceholderText(
      'Ask anything...',
    ) as HTMLTextAreaElement;
    await user.type(textarea, 'Line one');
    await user.keyboard('{Shift>}{Enter}{/Shift}');
    await user.type(textarea, 'Line two');

    expect(onSend).not.toHaveBeenCalled();
    expect(textarea.value).toBe('Line one\nLine two');
  });

  it('is a no-op when submitting empty or whitespace-only input', async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();
    render(<ControlledPromptBar onSend={onSend} />);

    const textarea = screen.getByPlaceholderText('Ask anything...');
    await user.keyboard('{Enter}');
    expect(onSend).not.toHaveBeenCalled();

    await user.type(textarea, '   ');
    await user.keyboard('{Enter}');
    expect(onSend).not.toHaveBeenCalled();
  });
});
