import { useNavigate, type LinkProps } from '@tanstack/react-router';
import { useTranslation } from '@repo/i18n';
import { ConfirmDialog } from './confirm-dialog';
import { useAuthStore } from '../stores/auth-store';

// /sign-in lands in a later phase - typed loosely so this compiles
// against the current route tree in the meantime.
const SIGN_IN_URL: LinkProps['to'] | (string & {}) = '/sign-in';

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
        navigate({ to: SIGN_IN_URL });
      }}
    />
  );
}
