import { type ColumnDef } from '@tanstack/react-table';
import { useTranslation } from '@repo/i18n';
import { Badge } from '@repo/ui/components/ui/badge';
import { Checkbox } from '@repo/ui/components/ui/checkbox';
import { DataTableColumnHeader } from '../../../components/data-table';
import { LongText } from '../../../components/long-text';
import { taskPriorityOptions, taskStatusOptions } from '../data/data';
import { type Task } from '../data/schema';
import { DataTableRowActions } from './data-table-row-actions';

export function useTasksColumns(): ColumnDef<Task>[] {
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
          aria-label={t('dataTable.selectAll')}
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={t('dataTable.selectRow')}
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('tasks.columns.id')} />
      ),
      cell: ({ row }) => (
        <div className="w-24 font-mono text-xs text-muted-foreground">
          {row.original.id}
        </div>
      ),
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('tasks.columns.title')}
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="capitalize">
            {t(`tasks.label.${row.original.label}`)}
          </Badge>
          <LongText className="max-w-72">{row.original.title}</LongText>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('tasks.columns.status')}
        />
      ),
      cell: ({ row }) => {
        const option = taskStatusOptions.find(
          (item) => item.value === row.original.status,
        );
        return (
          <div className="flex items-center gap-2">
            {option && <option.icon className="size-4 text-muted-foreground" />}
            <span className="capitalize">
              {t(`tasks.status.${row.original.status}`)}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('tasks.columns.priority')}
        />
      ),
      cell: ({ row }) => {
        const option = taskPriorityOptions.find(
          (item) => item.value === row.original.priority,
        );
        return (
          <div className="flex items-center gap-2">
            {option && <option.icon className="size-4 text-muted-foreground" />}
            <span className="capitalize">
              {t(`tasks.priority.${row.original.priority}`)}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    },
    {
      id: 'actions',
      cell: ({ row }) => <DataTableRowActions row={row} />,
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
