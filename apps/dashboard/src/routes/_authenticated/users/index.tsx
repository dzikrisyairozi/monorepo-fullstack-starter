import { createFileRoute } from '@tanstack/react-router';
import { Mail, UserPlus } from 'lucide-react';
import { z } from 'zod';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import { Header } from '../../../components/layout/header';
import { Main } from '../../../components/layout/main';
import { ThemeSwitch } from '../../../components/theme-switch';
import { ConfigDrawer } from '../../../components/config-drawer';
import { ProfileDropdown } from '../../../components/profile-dropdown';
import { Search } from '../../../components/search';
import { UsersDialogs } from '../../../features/users/components/users-dialogs';
import {
  UsersProvider,
  useUsers,
} from '../../../features/users/components/users-provider';
import { UsersTable } from '../../../features/users/components/users-table';
import { users } from '../../../features/users/data/users';

const usersSearchSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
  sortBy: z.string().optional(),
  sortDir: z.enum(['asc', 'desc']).optional(),
  filters: z.record(z.string(), z.string()).optional(),
});

export const Route = createFileRoute('/_authenticated/users/')({
  validateSearch: usersSearchSchema,
  component: UsersPage,
});

function UsersPage() {
  return (
    <UsersProvider>
      <Header>
        <Search />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>
      <Main>
        <UsersPageContent />
      </Main>
      <UsersDialogs />
    </UsersProvider>
  );
}

function UsersPageContent() {
  const { t } = useTranslation('dashboard');
  const { setOpen } = useUsers();

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {t('users.title')}
          </h2>
          <p className="text-muted-foreground">{t('users.description')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setOpen('invite')}>
            <Mail />
            {t('users.inviteUser')}
          </Button>
          <Button onClick={() => setOpen('add')}>
            <UserPlus />
            {t('users.addUser')}
          </Button>
        </div>
      </div>
      <UsersTable data={users} />
    </>
  );
}
