import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '../../lib/utils';

export type ChatSource = {
  id: string;
  label: string;
  avatarUrl?: string;
};

export function SourceChip({
  source,
  className,
}: {
  source: ChatSource;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex max-w-40 items-center gap-1.5 rounded-full border bg-muted/60 py-0.5 pr-2 pl-0.5 text-xs',
        className,
      )}
    >
      <Avatar size="sm">
        <AvatarImage src={source.avatarUrl} alt="" />
        <AvatarFallback>
          {source.label.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="truncate">{source.label}</span>
    </span>
  );
}

export function SourceChipGroup({
  sources,
  max = 3,
  className,
}: {
  sources: ChatSource[];
  max?: number;
  className?: string;
}) {
  const visible = sources.slice(0, max);
  const overflow = sources.length - visible.length;

  return (
    <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
      {visible.map((source) => (
        <SourceChip key={source.id} source={source} />
      ))}
      {overflow > 0 && (
        <span className="inline-flex items-center rounded-full border bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground">
          +{overflow}
        </span>
      )}
    </div>
  );
}
