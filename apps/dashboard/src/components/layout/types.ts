import { type LinkProps } from '@tanstack/react-router';

export type NavUser = {
  name: string;
  email: string;
  avatar: string;
};

export type Team = {
  name: string;
  logo: React.ElementType;
  plan: string;
};

type BaseNavItem = {
  /** i18n key, resolved with t() at render time - never a literal string. */
  title: string;
  badge?: string;
  icon?: React.ElementType;
};

export type NavLink = BaseNavItem & {
  url: LinkProps['to'] | (string & {});
  items?: never;
};

export type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps['to'] | (string & {}) })[];
  url?: never;
};

export type NavItem = NavCollapsible | NavLink;

export type NavGroup = {
  /** i18n key, resolved with t() at render time - never a literal string. */
  title: string;
  items: NavItem[];
};

export type SidebarData = {
  user: NavUser;
  teams: Team[];
  navGroups: NavGroup[];
};
