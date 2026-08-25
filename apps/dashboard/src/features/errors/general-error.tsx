import { ServerOff } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { ErrorPage } from './error-page';

export function GeneralError() {
  const { t } = useTranslation('dashboard');

  return (
    <ErrorPage
      code="500"
      icon={<ServerOff className="size-12 text-primary" />}
      title={t('errors.general.title')}
      description={t('errors.general.description')}
    />
  );
}
