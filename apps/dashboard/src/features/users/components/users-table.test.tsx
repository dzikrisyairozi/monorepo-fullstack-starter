import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { TooltipProvider } from '@repo/ui/components/ui/tooltip';
import { tableSearchSchema } from '../../../hooks/use-table-url-state';
import { type User } from '../data/schema';
import { UsersTable } from './users-table';
import { UsersProvider } from './users-provider';

const users: User[] = [
  {
    id: '1',
    username: 'jdoe',
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '555-0100',
    status: 'active',
    role: 'admin',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    username: 'bsmith',
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '555-0101',
    status: 'inactive',
    role: 'cashier',
    createdAt: '2026-01-02T00:00:00.000Z',
  },
];

// LongText (username cell) needs a TooltipProvider; the row-actions dropdown
// needs a UsersProvider (currentRow/open, for its edit/delete triggers).
async function renderUsersTable(data: User[]) {
  const rootRoute = createRootRoute();
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    validateSearch: tableSearchSchema,
    component: () => (
      <TooltipProvider>
        <UsersProvider>
          <UsersTable data={data} />
        </UsersProvider>
      </TooltipProvider>
    ),
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  });

  await router.load();
  render(<RouterProvider router={router} />);
}

describe('UsersTable', () => {
  it('renders a row per user with the translated column headers', async () => {
    await renderUsersTable(users);

    expect(screen.getByText('jdoe')).toBeTruthy();
    expect(screen.getByText('bsmith')).toBeTruthy();
    expect(screen.getByRole('columnheader', { name: 'Username' })).toBeTruthy();
    expect(screen.getByRole('columnheader', { name: 'Status' })).toBeTruthy();
    expect(screen.getByRole('columnheader', { name: 'Role' })).toBeTruthy();
  });

  it('shows the empty state when there are no rows', async () => {
    await renderUsersTable([]);

    expect(screen.getByText('No results.')).toBeTruthy();
  });
});
