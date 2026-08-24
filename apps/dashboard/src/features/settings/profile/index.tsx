import { useTranslation } from '@repo/i18n';
import { ContentSection } from '../components/content-section';
import { ProfileForm } from './profile-form';

export function SettingsProfile() {
  const { t } = useTranslation('dashboard');

  return (
    <ContentSection
      title={t('settings.profile.title')}
      description={t('settings.profile.description')}
    >
      <ProfileForm />
    </ContentSection>
  );
}
