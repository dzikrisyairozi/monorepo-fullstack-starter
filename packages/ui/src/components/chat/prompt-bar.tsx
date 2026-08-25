'use client';

import { type KeyboardEvent } from 'react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

export function PromptBar({
  value,
  onValueChange,
  onSend,
  maxHeight = 200,
  placeholder = 'Ask anything...',
  sendLabel = 'Send',
  className,
}: {
  value: string;
  onValueChange: (value: string) => void;
  onSend: (value: string) => void;
  maxHeight?: number;
  placeholder?: string;
  sendLabel?: string;
  className?: string;
}) {
  function resizeTextarea(el: HTMLTextAreaElement) {
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const trimmed = value.trim();
      if (trimmed) {
        onSend(trimmed);
      }
    }
  }

  return (
    <div className={cn('rounded-lg border bg-background p-2', className)}>
      <textarea
        value={value}
        onChange={(event) => {
          onValueChange(event.target.value);
          resizeTextarea(event.target);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={placeholder}
        rows={1}
        style={{ maxHeight }}
        className="block w-full resize-none overflow-y-auto bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      <div className="mt-2 flex items-center justify-end">
        <Button
          type="button"
          size="sm"
          onClick={() => {
            const trimmed = value.trim();
            if (trimmed) onSend(trimmed);
          }}
        >
          {sendLabel}
        </Button>
      </div>
    </div>
  );
}
