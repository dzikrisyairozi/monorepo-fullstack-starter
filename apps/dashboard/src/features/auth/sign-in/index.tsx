import { Link } from '@tanstack/react-router';
import { useTranslation } from '@repo/i18n';
import { AuthLayout } from '../auth-layout';
import { UserAuthForm } from './components/user-auth-form';

export function SignIn({ redirectTo }: { redirectTo?: string }) {
  const { t } = useTranslation('dashboard');

  return (
    <AuthLayout title={t('signIn.title')} description={t('signIn.description')}>
      <UserAuthForm redirectTo={redirectTo} />
      <div className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
        <Link to="/forgot-password" className="hover:text-primary">
          {t('signIn.forgotPassword')}
        </Link>
        <p>
          {t('signIn.noAccount')}{' '}
          <Link
            to="/sign-up"
            className="font-medium text-primary hover:underline"
          >
            {t('signIn.createAccount')}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
