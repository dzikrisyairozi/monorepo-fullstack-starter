'use client';

import { useState } from 'react';
import { CircleCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

export type ApprovalOption = {
  id: string;
  label: string;
};

export function ApprovalCard({
  question,
  options,
  onResolve,
  className,
}: {
  question: string;
  options: ApprovalOption[];
  onResolve?: (option: ApprovalOption) => void;
  className?: string;
}) {
  const [resolved, setResolved] = useState<ApprovalOption | null>(null);

  if (resolved) {
    return (
      <div
        className={cn(
          'rounded-md border bg-muted/40 px-3 py-2 text-sm',
          className,
        )}
      >
        <p className="text-muted-foreground">{question}</p>
        <p className="mt-1 flex items-center gap-1.5 font-medium">
          <CircleCheck className="size-4 text-emerald-600 dark:text-emerald-500" />
          {resolved.label}
        </p>
      </div>
    );
  }

  return (
    <div className={cn('rounded-md border bg-muted/40 p-3', className)}>
      <p className="text-sm">{question}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option.id}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setResolved(option);
              onResolve?.(option);
            }}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
