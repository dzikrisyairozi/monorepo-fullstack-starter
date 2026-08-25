import { useTranslation } from '@repo/i18n';
import { ContentSection } from '../components/content-section';
import { NotificationsForm } from './notifications-form';

export function SettingsNotifications() {
  const { t } = useTranslation('dashboard');

  return (
    <ContentSection
      title={t('settings.notifications.title')}
      description={t('settings.notifications.description')}
    >
      <NotificationsForm />
    </ContentSection>
  );
}
