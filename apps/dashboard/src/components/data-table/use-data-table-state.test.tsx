import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { type ColumnDef } from '@tanstack/react-table';
import { useDataTableState } from './use-data-table-state';

type Row = { id: string; name: string; status: string };

const columns: ColumnDef<Row>[] = [
  { accessorKey: 'name', header: 'Name' },
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
];

// Deliberately not alphabetical, so a sort test proves sorting actually ran.
const data: Row[] = [
  { id: '1', name: 'Carol', status: 'active' },
  { id: '2', name: 'Alice', status: 'active' },
  { id: '3', name: 'Bob', status: 'inactive' },
];

function TestPage() {
  const { table, urlState, searchValue } = useDataTableState({
    data,
    columns,
    filterKeys: ['status'],
    globalFilterFn: (row, _columnId, filterValue: string) =>
      row.original.name.toLowerCase().includes(filterValue.toLowerCase()),
  });

  return (
    <div>
      <span data-testid="rowCount">{table.getRowModel().rows.length}</span>
      <span data-testid="searchValue">{searchValue}</span>
      <span data-testid="firstRowName">
        {table.getRowModel().rows[0]?.original.name ?? ''}
      </span>
      <button onClick={() => urlState.setFilter('search', 'ali')}>
        search ali
      </button>
      <button onClick={() => urlState.setFilter('status', 'active')}>
        filter active
      </button>
      <button onClick={() => table.getColumn('name')?.toggleSorting(false)}>
        sort name asc
      </button>
    </div>
  );
}

async function renderTestPage() {
  const rootRoute = createRootRoute();
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    validateSearch: (search: Record<string, unknown>) => search,
    component: TestPage,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
    // A router's default history wraps the real jsdom window.history, which
    // Vitest doesn't reset between tests in the same file - search params
    // set by one test otherwise leak into the next. Each test gets its own
    // isolated in-memory history instead.
    history: createMemoryHistory({ initialEntries: ['/'] }),
  });

  await router.load();
  render(<RouterProvider router={router} />);
  return router;
}

describe('useDataTableState', () => {
  it('shows all rows with no filters applied', async () => {
    await renderTestPage();
    expect(screen.getByTestId('rowCount').textContent).toBe('3');
  });

  it('global search filters rows using the provided globalFilterFn', async () => {
    const user = userEvent.setup();
    await renderTestPage();

    await user.click(screen.getByText('search ali'));

    expect(screen.getByTestId('searchValue').textContent).toBe('ali');
    expect(screen.getByTestId('rowCount').textContent).toBe('1');
    expect(screen.getByTestId('firstRowName').textContent).toBe('Alice');
  });

  it('a column filter round-trips through urlState.filters', async () => {
    const user = userEvent.setup();
    await renderTestPage();

    await user.click(screen.getByText('filter active'));

    expect(screen.getByTestId('rowCount').textContent).toBe('2');
  });

  it('sorting a column round-trips through urlState.sorting', async () => {
    const user = userEvent.setup();
    await renderTestPage();

    expect(screen.getByTestId('firstRowName').textContent).toBe('Carol');
    await user.click(screen.getByText('sort name asc'));
    expect(screen.getByTestId('firstRowName').textContent).toBe('Alice');
  });
});
