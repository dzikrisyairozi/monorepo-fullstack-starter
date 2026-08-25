import { SearchIcon } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import { cn } from '@repo/ui/lib/utils';
import { useSearch } from '../context/search-provider';

export function Search({ className }: { className?: string }) {
  const { setOpen } = useSearch();
  const { t } = useTranslation('dashboard');

  return (
    <Button
      variant="outline"
      className={cn(
        'relative h-8 w-40 justify-start bg-background text-sm text-muted-foreground sm:w-56',
        className,
      )}
      onClick={() => setOpen(true)}
    >
      <SearchIcon className="mr-1" />
      <span className="truncate">{t('commandMenu.placeholder')}</span>
      <kbd className="pointer-events-none absolute top-1.5 right-1.5 hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
}
