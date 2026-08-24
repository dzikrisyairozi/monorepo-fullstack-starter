import { Construction } from 'lucide-react';

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-24 text-center">
      <Construction className="size-12 text-primary" />
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
