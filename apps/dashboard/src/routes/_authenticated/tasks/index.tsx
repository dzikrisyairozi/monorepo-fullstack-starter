import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { useTranslation } from '@repo/i18n';
import { Header } from '../../../components/layout/header';
import { Main } from '../../../components/layout/main';
import { ThemeSwitch } from '../../../components/theme-switch';
import { ConfigDrawer } from '../../../components/config-drawer';
import { ProfileDropdown } from '../../../components/profile-dropdown';
import { Search } from '../../../components/search';
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
  const { t } = useTranslation('dashboard');

  return (
    <>
      <Header>
        <Search />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>
      <Main>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {t('tasks.title')}
            </h2>
            <p className="text-muted-foreground">{t('tasks.description')}</p>
          </div>
        </div>
        <TasksTable data={tasks} />
      </Main>
    </>
  );
}
