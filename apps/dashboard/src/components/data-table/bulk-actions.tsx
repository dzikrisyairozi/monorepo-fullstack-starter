import { type ReactNode } from 'react';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';

export function BulkActions({
  selectedCount,
  onClearSelection,
  children,
}: {
  selectedCount: number;
  onClearSelection: () => void;
  children: ReactNode;
}) {
  const { t } = useTranslation('dashboard');

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-between rounded-md border bg-muted/50 px-4 py-2">
      <span className="text-sm text-muted-foreground">
        {t('dataTable.rowsSelected', { count: selectedCount })}
      </span>
      <div className="flex items-center gap-2">
        {children}
        <Button variant="ghost" size="sm" onClick={onClearSelection}>
          {t('dataTable.clearSelection')}
        </Button>
      </div>
    </div>
  );
}
