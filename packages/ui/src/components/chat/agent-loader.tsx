'use client';

import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

export function AgentLoader({
  label = 'Thinking',
  className,
}: {
  label?: string;
  className?: string;
}) {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setElapsedMs(Date.now() - start), 100);
    return () => clearInterval(id);
  }, []);

  const seconds = (elapsedMs / 1000).toFixed(1);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('flex items-center gap-2', className)}
    >
      <div className="grid grid-cols-3 gap-0.5" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, index) => (
          <span
            key={index}
            className="size-1.5 rounded-[1px] bg-primary/70 motion-safe:animate-pulse"
            style={{ animationDelay: `${index * 80}ms` }}
          />
        ))}
      </div>
      <span className="font-mono text-xs text-muted-foreground">
        {label} &middot; {seconds}s
      </span>
    </div>
  );
}
