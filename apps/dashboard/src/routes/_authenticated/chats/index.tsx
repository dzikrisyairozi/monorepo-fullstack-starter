import { createFileRoute } from '@tanstack/react-router';
import { Header } from '../../../components/layout/header';
import { Main } from '../../../components/layout/main';
import { ThemeSwitch } from '../../../components/theme-switch';
import { ConfigDrawer } from '../../../components/config-drawer';
import { ProfileDropdown } from '../../../components/profile-dropdown';
import { Search } from '../../../components/search';
import { Chats } from '../../../features/chats';

export const Route = createFileRoute('/_authenticated/chats/')({
  component: ChatsPage,
});

function ChatsPage() {
  return (
    <>
      <Header>
        <Search />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>
      <Main fixed>
        <Chats />
      </Main>
    </>
  );
}
