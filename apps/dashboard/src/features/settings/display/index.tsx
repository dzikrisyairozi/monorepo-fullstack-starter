import { useTranslation } from '@repo/i18n';
import { ContentSection } from '../components/content-section';
import { DisplayForm } from './display-form';

export function SettingsDisplay() {
  const { t } = useTranslation('dashboard');

  return (
    <ContentSection
      title={t('settings.display.title')}
      description={t('settings.display.description')}
    >
      <DisplayForm />
    </ContentSection>
  );
}
