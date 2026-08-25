import { type ReactNode } from 'react';
import { Header } from './header';
import { ConfigDrawer } from '../config-drawer';
import { ProfileDropdown } from '../profile-dropdown';
import { Search } from '../search';
import { ThemeSwitch } from '../theme-switch';

/**
 * The Search/ThemeSwitch/ConfigDrawer/ProfileDropdown cluster every
 * authenticated route renders in its header. `extra` slots in anything a
 * specific route needs between Search and ThemeSwitch (e.g. LanguageSwitcher
 * on help-center and sandbox); `nav` passes through to Header's own nav slot
 * (used by the dashboard route's TopNav).
 */
export function AppHeader({
  nav,
  extra,
}: {
  nav?: ReactNode;
  extra?: ReactNode;
}) {
  return (
    <Header nav={nav}>
      <Search />
      {extra}
      <ThemeSwitch />
      <ConfigDrawer />
      <ProfileDropdown />
    </Header>
  );
}
