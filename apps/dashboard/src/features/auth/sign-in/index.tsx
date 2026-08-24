import { Link, type LinkProps } from '@tanstack/react-router';
import { useTranslation } from '@repo/i18n';
import { AuthLayout } from '../auth-layout';
import { UserAuthForm } from './components/user-auth-form';

// Sign-up and forgot-password land later in this same phase - typed
// loosely so this compiles against the current route tree meanwhile.
const SIGN_UP_URL: LinkProps['to'] | (string & {}) = '/sign-up';
const FORGOT_PASSWORD_URL: LinkProps['to'] | (string & {}) = '/forgot-password';

export function SignIn({ redirectTo }: { redirectTo?: string }) {
  const { t } = useTranslation('dashboard');

  return (
    <AuthLayout title={t('signIn.title')} description={t('signIn.description')}>
      <UserAuthForm redirectTo={redirectTo} />
      <div className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
        <Link to={FORGOT_PASSWORD_URL} className="hover:text-primary">
          {t('signIn.forgotPassword')}
        </Link>
        <p>
          {t('signIn.noAccount')}{' '}
          <Link
            to={SIGN_UP_URL}
            className="font-medium text-primary hover:underline"
          >
            {t('signIn.createAccount')}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
