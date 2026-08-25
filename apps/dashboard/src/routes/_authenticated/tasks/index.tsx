import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from '@repo/i18n';
import { AppHeader } from '../../../components/layout/app-header';
import { Main } from '../../../components/layout/main';
import { TasksDialogs } from '../../../features/tasks/components/tasks-dialogs';
import { TasksPrimaryButtons } from '../../../features/tasks/components/tasks-primary-buttons';
import { TasksProvider } from '../../../features/tasks/components/tasks-provider';
import { TasksTable } from '../../../features/tasks/components/tasks-table';
import { tasks } from '../../../features/tasks/data/tasks';
import { tableSearchSchema } from '../../../hooks/use-table-url-state';

export const Route = createFileRoute('/_authenticated/tasks/')({
  validateSearch: tableSearchSchema,
  component: TasksPage,
});

function TasksPage() {
  const { t } = useTranslation('dashboard');

  return (
    <TasksProvider>
      <AppHeader />
      <Main>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {t('tasks.title')}
            </h2>
            <p className="text-muted-foreground">{t('tasks.description')}</p>
          </div>
          <TasksPrimaryButtons />
        </div>
        <TasksTable data={tasks} />
      </Main>
      <TasksDialogs />
    </TasksProvider>
  );
}
