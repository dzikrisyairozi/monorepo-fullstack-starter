import { FileX } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { ErrorPage } from './error-page';

export function NotFoundError() {
  const { t } = useTranslation('dashboard');

  return (
    <ErrorPage
      code="404"
      icon={<FileX className="size-12 text-primary" />}
      title={t('errors.notFound.title')}
      description={t('errors.notFound.description')}
    />
  );
}
