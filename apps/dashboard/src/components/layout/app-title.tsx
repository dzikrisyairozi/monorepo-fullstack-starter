import { Link } from '@tanstack/react-router';
import { Box } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { cn } from '@repo/ui/lib/utils';

export function AppTitle({ className }: { className?: string }) {
  const { t } = useTranslation('dashboard');

  return (
    <Link
      to="/"
      className={cn('flex items-center gap-2.5 font-semibold', className)}
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary shadow-md">
        <Box className="size-5 text-primary-foreground" />
      </div>
      <span className="truncate bg-gradient-to-r from-neutral-900 to-neutral-500 bg-clip-text text-lg tracking-tight text-transparent dark:from-white dark:to-neutral-400">
        {t('nav.teams.starter')}
      </span>
    </Link>
  );
}
