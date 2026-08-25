import { useTranslation } from '@repo/i18n';
import { ConfirmDialog } from '../../../components/confirm-dialog';
import { showSubmittedData } from '../../../lib/show-submitted-data';
import { type User } from '../data/schema';

export function UsersDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: User;
}) {
  const { t } = useTranslation('dashboard');

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('users.deleteUser')}
      description={t('users.deleteUserDescription', {
        username: currentRow.username,
      })}
      confirmationValue={currentRow.username}
      confirmText={t('users.actions.delete')}
      destructive
      onConfirm={() => {
        showSubmittedData({ id: currentRow.id }, t('users.deleteUser'));
        onOpenChange(false);
      }}
    />
  );
}
