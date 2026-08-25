import { type ReactNode } from 'react';
import { Separator } from '@repo/ui/components/ui/separator';

export function ContentSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Separator />
      <div className="max-w-xl">{children}</div>
    </div>
  );
}
