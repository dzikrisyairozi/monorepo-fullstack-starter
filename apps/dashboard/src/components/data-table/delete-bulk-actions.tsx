import { type Table } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { Button } from '@repo/ui/components/ui/button';
import { BulkActions } from './bulk-actions';

export function DataTableBulkActions<TData>({
  table,
  onDelete,
  deleteLabel,
}: {
  table: Table<TData>;
  onDelete: () => void;
  deleteLabel: string;
}) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <BulkActions
      selectedCount={selectedCount}
      onClearSelection={() => table.resetRowSelection()}
    >
      <Button variant="destructive" size="sm" onClick={onDelete}>
        <Trash2 />
        {deleteLabel}
      </Button>
    </BulkActions>
  );
}
