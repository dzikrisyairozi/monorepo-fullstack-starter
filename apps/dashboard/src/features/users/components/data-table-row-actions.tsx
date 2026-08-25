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
import { useUsers } from './users-provider';
import { type User } from '../data/schema';

export function DataTableRowActions({ row }: { row: Row<User> }) {
  const { t } = useTranslation('dashboard');
  const { setOpen, setCurrentRow } = useUsers();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <EllipsisVertical />
          <span className="sr-only">{t('users.columns.actions')}</span>
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
          {t('users.actions.edit')}
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            setCurrentRow(row.original);
            setOpen('delete');
          }}
        >
          <Trash2 />
          {t('users.actions.delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
