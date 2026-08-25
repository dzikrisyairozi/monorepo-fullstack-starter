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
import { userRoleOptions, userStatusOptions } from '../data/data';
import { type User } from '../data/schema';
import { useUsersColumns } from './users-columns';
import { UsersMultiDeleteDialog } from './users-multi-delete-dialog';

const FILTER_KEYS = ['status', 'role'] as const;

export function UsersTable({ data }: { data: User[] }) {
  const { t } = useTranslation('dashboard');
  const columns = useUsersColumns();
  const [showMultiDelete, setShowMultiDelete] = useState(false);

  const { table, urlState, searchValue } = useDataTableState({
    data,
    columns,
    filterKeys: FILTER_KEYS,
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const search = filterValue.toLowerCase();
      const user = row.original;
      return (
        user.username.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
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
        deleteLabel={t('users.actions.delete')}
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
