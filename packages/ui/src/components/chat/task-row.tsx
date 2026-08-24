import { cn } from '../../lib/utils';

export type TaskStatus = 'queued' | 'running' | 'done' | 'failed';

const statusDotColor: Record<TaskStatus, string> = {
  queued: 'bg-muted-foreground/40',
  running: 'bg-primary motion-safe:animate-pulse',
  done: 'bg-emerald-500',
  failed: 'bg-destructive',
};

export function TaskRow({
  title,
  status,
  elapsedLabel,
  className,
}: {
  title: string;
  status: TaskStatus;
  elapsedLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-2 text-sm', className)}>
      <span
        aria-hidden="true"
        className={cn('size-2 shrink-0 rounded-full', statusDotColor[status])}
      />
      <span className="min-w-0 flex-1 truncate">{title}</span>
      {elapsedLabel && (
        <span className="shrink-0 font-mono text-xs text-muted-foreground">
          {elapsedLabel}
        </span>
      )}
      <span className="sr-only">{status}</span>
    </div>
  );
}
