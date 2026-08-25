import { useTranslation } from '@repo/i18n';
import { ContentSection } from '../components/content-section';
import { AccountForm } from './account-form';

export function SettingsAccount() {
  const { t } = useTranslation('dashboard');

  return (
    <ContentSection
      title={t('settings.account.title')}
      description={t('settings.account.description')}
    >
      <AccountForm />
    </ContentSection>
  );
}
