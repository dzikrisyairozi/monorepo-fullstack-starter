import { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export function MessageBubble({
  role,
  children,
  className,
}: {
  role: 'user' | 'assistant';
  children: ReactNode;
  className?: string;
}) {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'flex',
        isUser ? 'justify-end' : 'justify-start',
        className,
      )}
    >
      <div
        className={cn(
          'max-w-[85%] space-y-2 rounded-2xl px-4 py-2.5 text-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground',
        )}
      >
        {children}
      </div>
    </div>
  );
}
