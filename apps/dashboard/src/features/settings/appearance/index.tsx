import { useTranslation } from '@repo/i18n';
import { ContentSection } from '../components/content-section';
import { AppearanceForm } from './appearance-form';

export function SettingsAppearance() {
  const { t } = useTranslation('dashboard');

  return (
    <ContentSection
      title={t('settings.appearance.title')}
      description={t('settings.appearance.description')}
    >
      <AppearanceForm />
    </ContentSection>
  );
}
