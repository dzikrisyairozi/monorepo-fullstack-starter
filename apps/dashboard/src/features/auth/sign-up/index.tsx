import { Link } from '@tanstack/react-router';
import { useTranslation } from '@repo/i18n';
import { AuthLayout } from '../auth-layout';
import { SignUpForm } from './components/sign-up-form';

export function SignUp() {
  const { t } = useTranslation('dashboard');

  return (
    <AuthLayout title={t('signUp.title')} description={t('signUp.description')}>
      <SignUpForm />
      <p className="text-center text-sm text-muted-foreground">
        {t('signUp.haveAccount')}{' '}
        <Link
          to="/sign-in"
          className="font-medium text-primary hover:underline"
        >
          {t('signUp.signIn')}
        </Link>
      </p>
    </AuthLayout>
  );
}
