import { createFileRoute } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { z } from 'zod';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import { Header } from '../../../components/layout/header';
import { Main } from '../../../components/layout/main';
import { ThemeSwitch } from '../../../components/theme-switch';
import { ConfigDrawer } from '../../../components/config-drawer';
import { ProfileDropdown } from '../../../components/profile-dropdown';
import { Search } from '../../../components/search';
import { TasksDialogs } from '../../../features/tasks/components/tasks-dialogs';
import {
  TasksProvider,
  useTasks,
} from '../../../features/tasks/components/tasks-provider';
import { TasksTable } from '../../../features/tasks/components/tasks-table';
import { tasks } from '../../../features/tasks/data/tasks';

const tasksSearchSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
  sortBy: z.string().optional(),
  sortDir: z.enum(['asc', 'desc']).optional(),
  filters: z.record(z.string(), z.string()).optional(),
});

export const Route = createFileRoute('/_authenticated/tasks/')({
  validateSearch: tasksSearchSchema,
  component: TasksPage,
});

function TasksPage() {
  return (
    <TasksProvider>
      <Header>
        <Search />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>
      <Main>
        <TasksPageContent />
      </Main>
      <TasksDialogs />
    </TasksProvider>
  );
}

function TasksPageContent() {
  const { t } = useTranslation('dashboard');
  const { setOpen } = useTasks();

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {t('tasks.title')}
          </h2>
          <p className="text-muted-foreground">{t('tasks.description')}</p>
        </div>
        <Button onClick={() => setOpen('create')}>
          <Plus />
          {t('tasks.createTask')}
        </Button>
      </div>
      <TasksTable data={tasks} />
    </>
  );
}
