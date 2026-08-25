import { createFileRoute } from '@tanstack/react-router';
import { useTranslation, LanguageSwitcher } from '@repo/i18n';
import { AppHeader } from '../../components/layout/app-header';
import { Main } from '../../components/layout/main';
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
      <AppHeader
        nav={<TopNav links={topNavLinks} />}
        extra={
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
        }
      />
      <Main>
        <Dashboard />
      </Main>
    </>
  );
}
