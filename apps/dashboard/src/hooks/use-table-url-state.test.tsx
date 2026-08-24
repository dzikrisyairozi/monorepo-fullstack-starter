import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { useTableUrlState } from './use-table-url-state';

function TestPage() {
  const {
    page,
    pageSize,
    sorting,
    filters,
    setPage,
    setSorting,
    setFilter,
    resetFilters,
  } = useTableUrlState();

  return (
    <div>
      <span data-testid="page">{page}</span>
      <span data-testid="pageSize">{pageSize}</span>
      <span data-testid="sorting">{JSON.stringify(sorting)}</span>
      <span data-testid="filters">{JSON.stringify(filters)}</span>
      <button onClick={() => setPage(3)}>set page 3</button>
      <button onClick={() => setSorting({ id: 'name', desc: true })}>
        sort by name desc
      </button>
      <button onClick={() => setFilter('status', 'active')}>
        filter status=active
      </button>
      <button onClick={() => resetFilters()}>reset filters</button>
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
  });

  await router.load();
  render(<RouterProvider router={router} />);
  return router;
}

describe('useTableUrlState', () => {
  it('defaults to page 1 and pageSize 10 with no sorting or filters', async () => {
    await renderTestPage();

    expect(screen.getByTestId('page').textContent).toBe('1');
    expect(screen.getByTestId('pageSize').textContent).toBe('10');
    expect(screen.getByTestId('sorting').textContent).toBe('null');
    expect(screen.getByTestId('filters').textContent).toBe('{}');
  });

  it('setPage updates the URL and round-trips back through search', async () => {
    const user = userEvent.setup();
    await renderTestPage();

    await user.click(screen.getByText('set page 3'));
    expect(screen.getByTestId('page').textContent).toBe('3');
  });

  it('setSorting round-trips id and direction', async () => {
    const user = userEvent.setup();
    await renderTestPage();

    await user.click(screen.getByText('sort by name desc'));
    expect(screen.getByTestId('sorting').textContent).toBe(
      JSON.stringify({ id: 'name', desc: true }),
    );
  });

  it('setFilter resets the page back to 1', async () => {
    const user = userEvent.setup();
    await renderTestPage();

    await user.click(screen.getByText('set page 3'));
    expect(screen.getByTestId('page').textContent).toBe('3');

    await user.click(screen.getByText('filter status=active'));
    expect(screen.getByTestId('filters').textContent).toBe(
      JSON.stringify({ status: 'active' }),
    );
    expect(screen.getByTestId('page').textContent).toBe('1');
  });

  it('resetFilters clears all filters and resets the page', async () => {
    const user = userEvent.setup();
    await renderTestPage();

    await user.click(screen.getByText('filter status=active'));
    await user.click(screen.getByText('set page 3'));
    await user.click(screen.getByText('reset filters'));

    expect(screen.getByTestId('filters').textContent).toBe('{}');
    expect(screen.getByTestId('page').textContent).toBe('1');
  });
});
