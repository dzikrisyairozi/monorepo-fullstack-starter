import { useTranslation } from '@repo/i18n';
import { ConfirmDialog } from '../../../components/confirm-dialog';
import { showSubmittedData } from '../../../lib/show-submitted-data';
import { type User } from '../data/schema';

export function UsersMultiDeleteDialog({
  open,
  onOpenChange,
  rows,
  onConfirmed,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rows: User[];
  onConfirmed: () => void;
}) {
  const { t } = useTranslation('dashboard');

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('users.deleteUsers')}
      description={t('users.deleteUsersDescription', { count: rows.length })}
      confirmText={t('users.actions.delete')}
      destructive
      onConfirm={() => {
        showSubmittedData(
          rows.map((row) => row.id),
          t('users.deleteUsers'),
        );
        onOpenChange(false);
        onConfirmed();
      }}
    />
  );
}
