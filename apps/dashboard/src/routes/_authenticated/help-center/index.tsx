import { createFileRoute } from '@tanstack/react-router';
import { useTranslation, LanguageSwitcher } from '@repo/i18n';
import { Header } from '../../../components/layout/header';
import { Main } from '../../../components/layout/main';
import { Search } from '../../../components/search';
import { ThemeSwitch } from '../../../components/theme-switch';
import { ConfigDrawer } from '../../../components/config-drawer';
import { ProfileDropdown } from '../../../components/profile-dropdown';
import { ComingSoon } from '../../../components/coming-soon';

export const Route = createFileRoute('/_authenticated/help-center/')({
  component: HelpCenter,
});

function HelpCenter() {
  const { t } = useTranslation('dashboard');

  return (
    <>
      <Header>
        <Search />
        <div className="hidden lg:block">
          <LanguageSwitcher />
        </div>
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>
      <Main>
        <ComingSoon
          title={t('helpCenter.title')}
          description={t('helpCenter.description')}
        />
      </Main>
    </>
  );
}
