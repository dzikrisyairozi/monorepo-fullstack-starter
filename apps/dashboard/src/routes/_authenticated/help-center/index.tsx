import { createFileRoute } from '@tanstack/react-router';
import { useTranslation, LanguageSwitcher } from '@repo/i18n';
import { AppHeader } from '../../../components/layout/app-header';
import { Main } from '../../../components/layout/main';
import { ComingSoon } from '../../../components/coming-soon';

export const Route = createFileRoute('/_authenticated/help-center/')({
  component: HelpCenter,
});

function HelpCenter() {
  const { t } = useTranslation('dashboard');

  return (
    <>
      <AppHeader
        extra={
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
        }
      />
      <Main>
        <ComingSoon
          title={t('helpCenter.title')}
          description={t('helpCenter.description')}
        />
      </Main>
    </>
  );
}
