import { Link } from '@tanstack/react-router';
import { useTranslation } from '@repo/i18n';
import { AuthLayout } from '../auth-layout';
import { OtpForm } from './components/otp-form';

export function Otp() {
  const { t } = useTranslation('dashboard');

  return (
    <AuthLayout title={t('otp.title')} description={t('otp.description')}>
      <OtpForm />
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
