import { type ReactNode } from 'react';

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="rounded-xl border border-border bg-white/60 p-4 sm:p-6 dark:bg-neutral-900/60">
        {children}
      </div>
    </section>
  );
}
