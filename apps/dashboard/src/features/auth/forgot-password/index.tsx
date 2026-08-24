import { Link } from '@tanstack/react-router';
import { useTranslation } from '@repo/i18n';
import { AuthLayout } from '../auth-layout';
import { ForgotPasswordForm } from './components/forgot-password-form';

export function ForgotPassword() {
  const { t } = useTranslation('dashboard');

  return (
    <AuthLayout
      title={t('forgotPassword.title')}
      description={t('forgotPassword.description')}
    >
      <ForgotPasswordForm />
      <p className="text-center text-sm text-muted-foreground">
        <Link
          to="/sign-in"
          className="font-medium text-primary hover:underline"
        >
          {t('forgotPassword.backToSignIn')}
        </Link>
      </p>
    </AuthLayout>
  );
}
