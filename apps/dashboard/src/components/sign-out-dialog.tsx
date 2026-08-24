import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from '@repo/i18n';
import { ConfirmDialog } from './confirm-dialog';
import { useAuthStore } from '../stores/auth-store';

export function SignOutDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('signOutDialog.title')}
      description={t('signOutDialog.description')}
      confirmText={t('signOutDialog.confirm')}
      onConfirm={() => {
        signOut();
        onOpenChange(false);
        navigate({ to: '/sign-in' });
      }}
    />
  );
}
