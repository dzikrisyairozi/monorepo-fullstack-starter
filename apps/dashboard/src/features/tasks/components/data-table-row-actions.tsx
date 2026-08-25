import { type Row } from '@tanstack/react-table';
import { Copy, EllipsisVertical, SquarePen, Tag, Trash2 } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@repo/ui/components/ui/dropdown-menu';
import { showSubmittedData } from '../../../lib/show-submitted-data';
import { TASK_LABELS, type Task } from '../data/schema';
import { useTasks } from './tasks-provider';

export function DataTableRowActions({ row }: { row: Row<Task> }) {
  const { t } = useTranslation('dashboard');
  const { setOpen, setCurrentRow } = useTasks();

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
          onClick={() => {
            setCurrentRow(row.original);
            setOpen('edit');
          }}
        >
          <SquarePen className="text-muted-foreground/70" />
          {t('tasks.actions.edit')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(row.original.id)}
        >
          <Copy className="text-muted-foreground/70" />
          {t('tasks.actions.copyId')}
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Tag className="text-muted-foreground/70" />
            {t('tasks.actions.labels')}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={row.original.label}
              onValueChange={(value) =>
                showSubmittedData(
                  { id: row.original.id, label: value },
                  t('tasks.editTask'),
                )
              }
            >
              {TASK_LABELS.map((label) => (
                <DropdownMenuRadioItem key={label} value={label}>
                  {t(`tasks.label.${label}`)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            setCurrentRow(row.original);
            setOpen('delete');
          }}
        >
          <Trash2 />
          {t('tasks.actions.delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
