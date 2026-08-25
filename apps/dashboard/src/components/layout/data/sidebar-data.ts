import {
  Box,
  Building,
  Building2,
  Bug,
  Construction,
  FileX,
  HelpCircle,
  Layers,
  ListTodo,
  Lock,
  LayoutDashboard,
  MessagesSquare,
  Monitor,
  Package,
  ServerOff,
  Settings,
  ShieldCheck,
  UserCog,
  UserX,
  Users,
  Palette,
  Bell,
  Wrench,
} from 'lucide-react';
import { type SidebarData } from '../types';

export const sidebarData: SidebarData = {
  user: {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatar: '',
  },
  teams: [
    {
      name: 'nav.teams.starter',
      logo: Box,
      plan: 'nav.teams.starterPlan',
    },
    {
      name: 'nav.teams.acme',
      logo: Building2,
      plan: 'nav.teams.acmePlan',
    },
    {
      name: 'nav.teams.globex',
      logo: Building,
      plan: 'nav.teams.globexPlan',
    },
  ],
  navGroups: [
    {
      title: 'nav.groups.general',
      items: [
        { title: 'nav.dashboard', url: '/', icon: LayoutDashboard },
        { title: 'nav.tasks', url: '/tasks', icon: ListTodo },
        { title: 'nav.apps', url: '/apps', icon: Package },
        { title: 'nav.chats', url: '/chats', icon: MessagesSquare },
        { title: 'nav.users', url: '/users', icon: Users },
        { title: 'nav.sandbox', url: '/sandbox', icon: Layers },
      ],
    },
    {
      title: 'nav.groups.pages',
      items: [
        {
          title: 'nav.auth',
          icon: ShieldCheck,
          items: [
            { title: 'nav.authSignIn', url: '/sign-in' },
            { title: 'nav.authSignIn2', url: '/sign-in-2' },
            { title: 'nav.authSignUp', url: '/sign-up' },
            { title: 'nav.authForgotPassword', url: '/forgot-password' },
            { title: 'nav.authOtp', url: '/otp' },
          ],
        },
        {
          title: 'nav.errors',
          icon: Bug,
          items: [
            { title: 'nav.errorUnauthorized', url: '/401', icon: Lock },
            { title: 'nav.errorForbidden', url: '/403', icon: UserX },
            { title: 'nav.errorNotFound', url: '/404', icon: FileX },
            { title: 'nav.errorServer', url: '/500', icon: ServerOff },
            {
              title: 'nav.errorMaintenance',
              url: '/503',
              icon: Construction,
            },
          ],
        },
      ],
    },
    {
      title: 'nav.groups.other',
      items: [
        {
          title: 'nav.settings',
          icon: Settings,
          items: [
            { title: 'nav.settingsProfile', url: '/settings', icon: UserCog },
            {
              title: 'nav.settingsAccount',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'nav.settingsAppearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'nav.settingsNotifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'nav.settingsDisplay',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        { title: 'nav.helpCenter', url: '/help-center', icon: HelpCircle },
      ],
    },
  ],
};
