import { type ReactNode } from 'react';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { AppTitle } from '../../components/layout/app-title';

export function AuthLayout({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-50 p-4 dark:bg-neutral-950">
      <div className="pointer-events-none absolute -top-20 -right-20 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px] will-change-transform" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[600px] w-[600px] rounded-full bg-indigo-500/5 blur-[120px] will-change-transform" />

      <div className="relative z-10 w-full max-w-sm space-y-6">
        <div className="flex justify-center">
          <AppTitle />
        </div>
        <Card className="border-white/20 bg-white/60 shadow-lg dark:border-white/5 dark:bg-neutral-900/60">
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-1.5 text-center">
              <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
