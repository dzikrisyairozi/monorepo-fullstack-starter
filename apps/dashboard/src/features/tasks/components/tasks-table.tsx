import { useState } from 'react';
import {
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Updater,
} from '@tanstack/react-table';
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
  DataTablePagination,
  DataTableToolbar,
} from '../../../components/data-table';
import { useTableUrlState } from '../../../hooks/use-table-url-state';
import { taskPriorityOptions, taskStatusOptions } from '../data/data';
import { type Task } from '../data/schema';
import { DataTableBulkActions } from './data-table-bulk-actions';
import { useTasksColumns } from './tasks-columns';
import { TasksMultiDeleteDialog } from './tasks-multi-delete-dialog';

function resolveUpdater<T>(updater: Updater<T>, previous: T): T {
  return typeof updater === 'function'
    ? (updater as (old: T) => T)(previous)
    : updater;
}

export function TasksTable({ data }: { data: Task[] }) {
  const { t } = useTranslation('dashboard');
  const columns = useTasksColumns();
  const urlState = useTableUrlState();

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [showMultiDelete, setShowMultiDelete] = useState(false);

  const sorting: SortingState = urlState.sorting ? [urlState.sorting] : [];
  const pagination: PaginationState = {
    pageIndex: urlState.page - 1,
    pageSize: urlState.pageSize,
  };
  const statusValues = urlState.filters.status
    ? urlState.filters.status.split(',')
    : [];
  const priorityValues = urlState.filters.priority
    ? urlState.filters.priority.split(',')
    : [];
  const columnFilters: ColumnFiltersState = [
    ...(statusValues.length ? [{ id: 'status', value: statusValues }] : []),
    ...(priorityValues.length
      ? [{ id: 'priority', value: priorityValues }]
      : []),
  ];
  const searchValue = urlState.filters.search ?? '';

  // TanStack Table's useReactTable() returns functions that aren't
  // referentially stable across renders, which the React Compiler can't
  // safely memoize - a known incompatibility with the library itself,
  // not a bug here.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter: searchValue,
    },
    onSortingChange: (updater) => {
      const next = resolveUpdater(updater, sorting);
      urlState.setSorting(next[0] ?? null);
    },
    onColumnFiltersChange: (updater) => {
      const next = resolveUpdater(updater, columnFilters);
      const nextStatus = next.find((f) => f.id === 'status')?.value as
        string[] | undefined;
      const nextPriority = next.find((f) => f.id === 'priority')?.value as
        string[] | undefined;
      urlState.setFilter(
        'status',
        nextStatus?.length ? nextStatus.join(',') : undefined,
      );
      urlState.setFilter(
        'priority',
        nextPriority?.length ? nextPriority.join(',') : undefined,
      );
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      const next = resolveUpdater(updater, pagination);
      if (next.pageSize !== pagination.pageSize) {
        urlState.setPageSize(next.pageSize);
      } else if (next.pageIndex !== pagination.pageIndex) {
        urlState.setPage(next.pageIndex + 1);
      }
    },
    onGlobalFilterChange: (value: string) => {
      urlState.setFilter('search', value || undefined);
    },
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const search = filterValue.toLowerCase();
      const task = row.original as Task;
      return task.title.toLowerCase().includes(search);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
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
