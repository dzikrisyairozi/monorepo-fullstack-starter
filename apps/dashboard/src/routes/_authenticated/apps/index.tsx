import { createFileRoute } from '@tanstack/react-router';
import { Header } from '../../../components/layout/header';
import { Main } from '../../../components/layout/main';
import { ThemeSwitch } from '../../../components/theme-switch';
import { ConfigDrawer } from '../../../components/config-drawer';
import { ProfileDropdown } from '../../../components/profile-dropdown';
import { Search } from '../../../components/search';
import { Apps } from '../../../features/apps';

export const Route = createFileRoute('/_authenticated/apps/')({
  component: AppsPage,
});

function AppsPage() {
  return (
    <>
      <Header>
        <Search />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>
      <Main>
        <Apps />
      </Main>
    </>
  );
}
