import { createFileRoute } from '@tanstack/react-router';
import { useTranslation, LanguageSwitcher } from '@repo/i18n';
import { Header } from '../../components/layout/header';
import { Main } from '../../components/layout/main';
import { ThemeSwitch } from '../../components/theme-switch';
import { ConfigDrawer } from '../../components/config-drawer';
import { ProfileDropdown } from '../../components/profile-dropdown';
import { Search } from '../../components/search';
import { TopNav } from '../../components/layout/top-nav';
import { Dashboard } from '../../features/dashboard';

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
});

function Index() {
  const { t } = useTranslation('dashboard');

  const topNavLinks = [
    { title: t('nav.dashboard'), href: '/', isActive: true },
    { title: t('nav.tasks'), href: '/tasks', isActive: false },
    { title: t('nav.users'), href: '/users', isActive: false },
    { title: t('nav.apps'), href: '/apps', isActive: false },
  ];

  return (
    <>
      <Header nav={<TopNav links={topNavLinks} />}>
        <Search />
        <div className="hidden lg:block">
          <LanguageSwitcher />
        </div>
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>
      <Main>
        <Dashboard />
      </Main>
    </>
  );
}
