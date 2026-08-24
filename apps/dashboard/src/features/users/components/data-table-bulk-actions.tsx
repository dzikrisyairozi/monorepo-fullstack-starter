import { type Table } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import { BulkActions } from '../../../components/data-table';
import { type User } from '../data/schema';

export function DataTableBulkActions({
  table,
  onDelete,
}: {
  table: Table<User>;
  onDelete: () => void;
}) {
  const { t } = useTranslation('dashboard');
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <BulkActions
      selectedCount={selectedCount}
      onClearSelection={() => table.resetRowSelection()}
    >
      <Button variant="destructive" size="sm" onClick={onDelete}>
        <Trash2 />
        {t('users.actions.delete')}
      </Button>
    </BulkActions>
  );
}
