import { type ReactNode } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';

export function ErrorPage({
  code,
  title,
  description,
  icon,
}: {
  code: string;
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  const { t } = useTranslation('dashboard');
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 overflow-hidden bg-neutral-50 p-4 text-center dark:bg-neutral-950">
      <div className="pointer-events-none absolute -top-20 -right-20 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px] will-change-transform" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[600px] w-[600px] rounded-full bg-indigo-500/5 blur-[120px] will-change-transform" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        {icon}
        <p className="text-sm font-semibold text-primary">{code}</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-md text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
        <div className="mt-2 flex items-center gap-3">
          <Button variant="outline" onClick={() => router.history.back()}>
            {t('errors.goBack')}
          </Button>
          <Button asChild>
            <Link to="/">{t('errors.backToHome')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
