import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Header } from '../../../components/layout/header';
import { Main } from '../../../components/layout/main';
import { ThemeSwitch } from '../../../components/theme-switch';
import { ConfigDrawer } from '../../../components/config-drawer';
import { ProfileDropdown } from '../../../components/profile-dropdown';
import { Search } from '../../../components/search';
import { SettingsLayout } from '../../../features/settings';

export const Route = createFileRoute('/_authenticated/settings')({
  component: SettingsRoute,
});

function SettingsRoute() {
  return (
    <>
      <Header>
        <Search />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>
      <Main>
        <SettingsLayout>
          <Outlet />
        </SettingsLayout>
      </Main>
    </>
  );
}
