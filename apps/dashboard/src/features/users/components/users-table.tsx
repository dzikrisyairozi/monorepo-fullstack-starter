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
import { userRoleOptions, userStatusOptions } from '../data/data';
import { type User } from '../data/schema';
import { DataTableBulkActions } from './data-table-bulk-actions';
import { useUsersColumns } from './users-columns';
import { UsersMultiDeleteDialog } from './users-multi-delete-dialog';

function resolveUpdater<T>(updater: Updater<T>, previous: T): T {
  return typeof updater === 'function'
    ? (updater as (old: T) => T)(previous)
    : updater;
}

export function UsersTable({ data }: { data: User[] }) {
  const { t } = useTranslation('dashboard');
  const columns = useUsersColumns();
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
  const roleValues = urlState.filters.role
    ? urlState.filters.role.split(',')
    : [];
  const columnFilters: ColumnFiltersState = [
    ...(statusValues.length ? [{ id: 'status', value: statusValues }] : []),
    ...(roleValues.length ? [{ id: 'role', value: roleValues }] : []),
  ];
  const searchValue = urlState.filters.search ?? '';

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
      const nextRole = next.find((f) => f.id === 'role')?.value as
        string[] | undefined;
      urlState.setFilter(
        'status',
        nextStatus?.length ? nextStatus.join(',') : undefined,
      );
      urlState.setFilter(
        'role',
        nextRole?.length ? nextRole.join(',') : undefined,
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
      const user = row.original as User;
      return (
        user.username.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
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
        searchPlaceholder={t('users.searchPlaceholder')}
        facets={[
          {
            columnId: 'status',
            title: t('users.columns.status'),
            options: userStatusOptions.map((option) => ({
              value: option.value,
              label: t(`users.status.${option.value}`),
              icon: option.icon,
            })),
          },
          {
            columnId: 'role',
            title: t('users.columns.role'),
            options: userRoleOptions.map((option) => ({
              value: option.value,
              label: t(`users.role.${option.value}`),
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
      <UsersMultiDeleteDialog
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
