import { useTranslation } from '@repo/i18n';
import { ConfirmDialog } from '../../../components/confirm-dialog';
import { showSubmittedData } from '../../../lib/show-submitted-data';
import { type Task } from '../data/schema';

export function TasksDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Task;
}) {
  const { t } = useTranslation('dashboard');

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('tasks.deleteTask')}
      description={t('tasks.deleteTaskDescription', { id: currentRow.id })}
      confirmationValue={currentRow.id}
      confirmText={t('tasks.actions.delete')}
      destructive
      onConfirm={() => {
        showSubmittedData({ id: currentRow.id }, t('tasks.deleteTask'));
        onOpenChange(false);
      }}
    />
  );
}
