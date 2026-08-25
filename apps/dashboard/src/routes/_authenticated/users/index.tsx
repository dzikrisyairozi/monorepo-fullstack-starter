import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from '@repo/i18n';
import { Header } from '../../../components/layout/header';
import { Main } from '../../../components/layout/main';
import { ThemeSwitch } from '../../../components/theme-switch';
import { ConfigDrawer } from '../../../components/config-drawer';
import { ProfileDropdown } from '../../../components/profile-dropdown';
import { Search } from '../../../components/search';
import { UsersDialogs } from '../../../features/users/components/users-dialogs';
import { UsersPrimaryButtons } from '../../../features/users/components/users-primary-buttons';
import { UsersProvider } from '../../../features/users/components/users-provider';
import { UsersTable } from '../../../features/users/components/users-table';
import { users } from '../../../features/users/data/users';
import { tableSearchSchema } from '../../../hooks/use-table-url-state';

export const Route = createFileRoute('/_authenticated/users/')({
  validateSearch: tableSearchSchema,
  component: UsersPage,
});

function UsersPage() {
  const { t } = useTranslation('dashboard');

  return (
    <UsersProvider>
      <Header>
        <Search />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>
      <Main>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {t('users.title')}
            </h2>
            <p className="text-muted-foreground">{t('users.description')}</p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <UsersTable data={users} />
      </Main>
      <UsersDialogs />
    </UsersProvider>
  );
}
