import { useNavigate, useSearch } from '@tanstack/react-router';
import { z } from 'zod';

export type TableSort = { id: string; desc: boolean } | null;
export type TableFilters = Record<string, string>;

/**
 * Shared validateSearch schema for any route backed by useTableUrlState.
 * Out-of-range page/pageSize values fall back to undefined (and from there
 * to useTableUrlState's own page 1 / size 10 defaults) via .catch() rather
 * than erroring the route.
 */
export const tableSearchSchema = z.object({
  page: z.number().int().min(1).optional().catch(undefined),
  pageSize: z.number().int().min(1).max(100).optional().catch(undefined),
  sortBy: z.string().optional(),
  sortDir: z.enum(['asc', 'desc']).optional(),
  filters: z.record(z.string(), z.string()).optional(),
});

type TableSearch = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  filters?: TableFilters;
};

// useNavigate() without a `from` infers its search type from whichever
// route context it resolves to, not the generic shape every consuming
// route's own validateSearch actually provides. This hook is meant to
// be reusable across routes (Users, Tasks, ...), so the exact search
// shape can't be known here - erased once, at this one boundary.
type NavigateWithTableSearch = (opts: {
  search: (prev: TableSearch) => TableSearch;
}) => void;

/**
 * Syncs a data table's page, page size, sort, and filters to the URL
 * search params of the current route. Any consuming route must
 * declare page/pageSize/sortBy/sortDir/filters in its validateSearch.
 */
export function useTableUrlState() {
  const search = useSearch({ strict: false }) as TableSearch;
  const navigate = useNavigate() as unknown as NavigateWithTableSearch;

  const page = search.page ?? 1;
  const pageSize = search.pageSize ?? 10;
  const sorting: TableSort = search.sortBy
    ? { id: search.sortBy, desc: search.sortDir === 'desc' }
    : null;
  const filters = search.filters ?? {};

  const setPage = (next: number) => {
    navigate({ search: (prev) => ({ ...prev, page: next }) });
  };

  const setPageSize = (next: number) => {
    navigate({ search: (prev) => ({ ...prev, pageSize: next, page: 1 }) });
  };

  const setSorting = (next: TableSort) => {
    navigate({
      search: (prev) => ({
        ...prev,
        sortBy: next?.id,
        sortDir: next ? (next.desc ? 'desc' : 'asc') : undefined,
      }),
    });
  };

  const setFilter = (key: string, value: string | undefined) => {
    navigate({
      search: (prev) => {
        const nextFilters = { ...(prev.filters ?? {}) };
        if (value) {
          nextFilters[key] = value;
        } else {
          delete nextFilters[key];
        }
        return { ...prev, filters: nextFilters, page: 1 };
      },
    });
  };

  const resetFilters = () => {
    navigate({ search: (prev) => ({ ...prev, filters: {}, page: 1 }) });
  };

  return {
    page,
    pageSize,
    sorting,
    filters,
    setPage,
    setPageSize,
    setSorting,
    setFilter,
    resetFilters,
  };
}
