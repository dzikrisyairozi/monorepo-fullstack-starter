import { UserX } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { ErrorPage } from './error-page';

export function Forbidden() {
  const { t } = useTranslation('dashboard');

  return (
    <ErrorPage
      code="403"
      icon={<UserX className="size-12 text-primary" />}
      title={t('errors.forbidden.title')}
      description={t('errors.forbidden.description')}
    />
  );
}
