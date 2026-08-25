import { useState } from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type Updater,
  type VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useTableUrlState } from '../../hooks/use-table-url-state';

function resolveUpdater<T>(updater: Updater<T>, previous: T): T {
  return typeof updater === 'function'
    ? (updater as (old: T) => T)(previous)
    : updater;
}

/**
 * Wires a TanStack table's sorting, column filters, pagination, and global
 * search to the URL via useTableUrlState. Shared by every data-table feature
 * (Tasks, Users, ...) - each one only differs in its data, columns, which
 * filter keys map to comma-separated URL values, and how global search
 * matches a row.
 */
export function useDataTableState<TData, TValue>({
  data,
  columns,
  filterKeys,
  globalFilterFn,
}: {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  filterKeys: readonly string[];
  globalFilterFn: FilterFn<TData>;
}) {
  const urlState = useTableUrlState();
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const sorting: SortingState = urlState.sorting ? [urlState.sorting] : [];
  const pagination: PaginationState = {
    pageIndex: urlState.page - 1,
    pageSize: urlState.pageSize,
  };
  const columnFilters: ColumnFiltersState = filterKeys.flatMap((key) => {
    const values = urlState.filters[key]
      ? urlState.filters[key].split(',')
      : [];
    return values.length ? [{ id: key, value: values }] : [];
  });
  const searchValue = urlState.filters.search ?? '';

  // TanStack Table's useReactTable() returns functions that aren't
  // referentially stable across renders, which the React Compiler can't
  // safely memoize - a known incompatibility with the library itself,
  // not a bug here.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    // Pagination is fully URL-driven - useTableUrlState already resets page
    // to 1 on every action that can change the row count (setFilter,
    // resetFilters, setPageSize). TanStack's own autoResetPageIndex (on by
    // default) is redundant with that and actively wrong here: globalFilterFn
    // is a new function reference on every render (it's defined inline by
    // each table's caller), which invalidates the library's row-model memo
    // and fires its own reset - including right after a real page change,
    // reverting page 2 back to page 1 on the very next render.
    autoResetPageIndex: false,
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
      filterKeys.forEach((key) => {
        const nextValues = next.find((filter) => filter.id === key)?.value as
          string[] | undefined;
        urlState.setFilter(
          key,
          nextValues?.length ? nextValues.join(',') : undefined,
        );
      });
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
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return { table, urlState, searchValue };
}
