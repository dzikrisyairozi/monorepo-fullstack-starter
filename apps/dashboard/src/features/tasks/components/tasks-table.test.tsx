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
import { type Task } from '../data/schema';
import { TasksTable } from './tasks-table';
import { TasksProvider } from './tasks-provider';

const tasks: Task[] = [
  {
    id: '1',
    title: 'Fix the login bug',
    status: 'todo',
    label: 'bug',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Write API docs',
    status: 'done',
    label: 'documentation',
    priority: 'low',
  },
];

// LongText (title cell) needs a TooltipProvider; the row-actions dropdown
// needs a TasksProvider (currentRow/open, for its edit/delete triggers).
async function renderTasksTable(data: Task[]) {
  const rootRoute = createRootRoute();
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    validateSearch: tableSearchSchema,
    component: () => (
      <TooltipProvider>
        <TasksProvider>
          <TasksTable data={data} />
        </TasksProvider>
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

describe('TasksTable', () => {
  it('renders a row per task with the translated column headers', async () => {
    await renderTasksTable(tasks);

    expect(screen.getByText('Fix the login bug')).toBeTruthy();
    expect(screen.getByText('Write API docs')).toBeTruthy();
    expect(screen.getByRole('columnheader', { name: 'Title' })).toBeTruthy();
    expect(screen.getByRole('columnheader', { name: 'Status' })).toBeTruthy();
    expect(screen.getByRole('columnheader', { name: 'Priority' })).toBeTruthy();
  });

  it('shows the empty state when there are no rows', async () => {
    await renderTasksTable([]);

    expect(screen.getByText('No results.')).toBeTruthy();
  });
});
