'use client';

import { useState } from 'react';
import {
  ChevronDown,
  Circle,
  CircleCheck,
  CircleX,
  Loader2,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export type ToolInvocationStatus = 'pending' | 'running' | 'done' | 'error';

export type ToolInvocation = {
  id: string;
  name: string;
  status: ToolInvocationStatus;
};

const statusIcon: Record<ToolInvocationStatus, typeof Circle> = {
  pending: Circle,
  running: Loader2,
  done: CircleCheck,
  error: CircleX,
};

const statusColor: Record<ToolInvocationStatus, string> = {
  pending: 'text-muted-foreground',
  running: 'text-primary motion-safe:animate-spin',
  done: 'text-emerald-600 dark:text-emerald-500',
  error: 'text-destructive',
};

export function ToolChip({
  invocations,
  messageCount,
  className,
}: {
  invocations: ToolInvocation[];
  messageCount: number;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const toolCalls = invocations.length;

  return (
    <div className={cn('rounded-md border bg-muted/40', className)}>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-2 px-3 py-1.5 text-left text-xs text-muted-foreground"
      >
        <span>
          {toolCalls} tool call{toolCalls === 1 ? '' : 's'} &middot;{' '}
          {messageCount} message{messageCount === 1 ? '' : 's'}
        </span>
        <ChevronDown
          className={cn(
            'size-3.5 shrink-0 transition-transform',
            expanded && 'rotate-180',
          )}
        />
      </button>
      {expanded && (
        <ul className="space-y-1.5 border-t px-3 py-2">
          {invocations.map((invocation) => {
            const Icon = statusIcon[invocation.status];
            return (
              <li
                key={invocation.id}
                className="flex items-center gap-2 text-xs"
              >
                <Icon
                  className={cn('size-3.5', statusColor[invocation.status])}
                />
                <span>{invocation.name}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
