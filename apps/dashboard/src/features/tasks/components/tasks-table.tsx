import { useState } from 'react';
import { flexRender } from '@tanstack/react-table';
import { useTranslation } from '@repo/i18n';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/ui/table';
import {
  DataTableBulkActions,
  DataTablePagination,
  DataTableToolbar,
  useDataTableState,
} from '../../../components/data-table';
import { taskPriorityOptions, taskStatusOptions } from '../data/data';
import { type Task } from '../data/schema';
import { useTasksColumns } from './tasks-columns';
import { TasksMultiDeleteDialog } from './tasks-multi-delete-dialog';

const FILTER_KEYS = ['status', 'priority'] as const;

export function TasksTable({ data }: { data: Task[] }) {
  const { t } = useTranslation('dashboard');
  const columns = useTasksColumns();
  const [showMultiDelete, setShowMultiDelete] = useState(false);

  const { table, urlState, searchValue } = useDataTableState({
    data,
    columns,
    filterKeys: FILTER_KEYS,
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const search = filterValue.toLowerCase();
      const task = row.original;
      return task.title.toLowerCase().includes(search);
    },
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        searchValue={searchValue}
        onSearchChange={(value) =>
          urlState.setFilter('search', value || undefined)
        }
        searchPlaceholder={t('tasks.searchPlaceholder')}
        facets={[
          {
            columnId: 'status',
            title: t('tasks.columns.status'),
            options: taskStatusOptions.map((option) => ({
              value: option.value,
              label: t(`tasks.status.${option.value}`),
              icon: option.icon,
            })),
          },
          {
            columnId: 'priority',
            title: t('tasks.columns.priority'),
            options: taskPriorityOptions.map((option) => ({
              value: option.value,
              label: t(`tasks.priority.${option.value}`),
              icon: option.icon,
            })),
          },
        ]}
      />
      <DataTableBulkActions
        table={table}
        onDelete={() => setShowMultiDelete(true)}
        deleteLabel={t('tasks.actions.delete')}
      />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t('dataTable.noResults')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      <TasksMultiDeleteDialog
        open={showMultiDelete}
        onOpenChange={setShowMultiDelete}
        rows={table
          .getFilteredSelectedRowModel()
          .rows.map((row) => row.original)}
        onConfirmed={() => table.resetRowSelection()}
      />
    </div>
  );
}
