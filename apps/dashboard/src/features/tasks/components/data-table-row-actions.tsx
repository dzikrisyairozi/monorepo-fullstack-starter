import { type Row } from '@tanstack/react-table';
import { EllipsisVertical, SquarePen, Trash2 } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/ui/dropdown-menu';
import { showSubmittedData } from '../../../lib/show-submitted-data';
import { type Task } from '../data/schema';

export function DataTableRowActions({ row }: { row: Row<Task> }) {
  const { t } = useTranslation('dashboard');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <EllipsisVertical />
          <span className="sr-only">{t('tasks.columns.actions')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => showSubmittedData(row.original, t('tasks.editTask'))}
        >
          <SquarePen className="text-muted-foreground/70" />
          {t('tasks.actions.edit')}
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={() =>
            showSubmittedData({ id: row.original.id }, t('tasks.deleteTask'))
          }
        >
          <Trash2 />
          {t('tasks.actions.delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
