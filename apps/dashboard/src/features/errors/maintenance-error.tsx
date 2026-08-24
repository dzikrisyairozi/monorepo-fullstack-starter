import { Construction } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { ErrorPage } from './error-page';

export function MaintenanceError() {
  const { t } = useTranslation('dashboard');

  return (
    <ErrorPage
      code="503"
      icon={<Construction className="size-12 text-primary" />}
      title={t('errors.maintenance.title')}
      description={t('errors.maintenance.description')}
    />
  );
}
