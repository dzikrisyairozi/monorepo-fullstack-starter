import { useTranslation } from '@repo/i18n';
import { ConfirmDialog } from '../../../components/confirm-dialog';
import { showSubmittedData } from '../../../lib/show-submitted-data';
import { type Task } from '../data/schema';

export function TasksMultiDeleteDialog({
  open,
  onOpenChange,
  rows,
  onConfirmed,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rows: Task[];
  onConfirmed: () => void;
}) {
  const { t } = useTranslation('dashboard');

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('tasks.deleteTasks')}
      description={t('tasks.deleteTasksDescription', { count: rows.length })}
      confirmText={t('tasks.actions.delete')}
      destructive
      onConfirm={() => {
        showSubmittedData(
          rows.map((row) => row.id),
          t('tasks.deleteTasks'),
        );
        onOpenChange(false);
        onConfirmed();
      }}
    />
  );
}
