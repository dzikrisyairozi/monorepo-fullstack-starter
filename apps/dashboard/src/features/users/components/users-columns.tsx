import { type ColumnDef } from '@tanstack/react-table';
import { useTranslation } from '@repo/i18n';
import { Badge } from '@repo/ui/components/ui/badge';
import { Checkbox } from '@repo/ui/components/ui/checkbox';
import { cn } from '@repo/ui/lib/utils';
import { DataTableColumnHeader } from '../../../components/data-table';
import { LongText } from '../../../components/long-text';
import { type User, type UserStatus } from '../data/schema';

const statusClassName: Record<UserStatus, string> = {
  active: 'border-emerald-600/20 bg-emerald-600/10 text-emerald-600',
  invited: 'border-sky-600/20 bg-sky-600/10 text-sky-600',
  inactive: 'border-border bg-muted text-muted-foreground',
  suspended: 'border-destructive/20 bg-destructive/10 text-destructive',
};

export function useUsersColumns(): ColumnDef<User>[] {
  const { t } = useTranslation('dashboard');

  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'username',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('users.columns.username')}
        />
      ),
      cell: ({ row }) => (
        <LongText className="max-w-36">{row.original.username}</LongText>
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('users.columns.name')}
        />
      ),
      cell: ({ row }) => (
        <LongText className="max-w-36">{row.original.name}</LongText>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('users.columns.email')}
        />
      ),
      cell: ({ row }) => (
        <div className="max-w-48 truncate">{row.original.email}</div>
      ),
    },
    {
      accessorKey: 'phone',
      header: t('users.columns.phone'),
      cell: ({ row }) => <div>{row.original.phone}</div>,
      enableSorting: false,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('users.columns.status')}
        />
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge
            variant="outline"
            className={cn('capitalize', statusClassName[status])}
          >
            {t(`users.status.${status}`)}
          </Badge>
        );
      },
      filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: 'role',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('users.columns.role')}
        />
      ),
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {t(`users.role.${row.original.role}`)}
        </Badge>
      ),
      filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('users.columns.createdAt')}
        />
      ),
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
  ];
}
