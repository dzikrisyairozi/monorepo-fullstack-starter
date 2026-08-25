import { Lock } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { ErrorPage } from './error-page';

export function UnauthorizedError() {
  const { t } = useTranslation('dashboard');

  return (
    <ErrorPage
      code="401"
      icon={<Lock className="size-12 text-primary" />}
      title={t('errors.unauthorized.title')}
      description={t('errors.unauthorized.description')}
    />
  );
}
