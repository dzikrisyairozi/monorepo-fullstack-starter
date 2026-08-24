import { useState } from 'react';
import { Link, type LinkProps } from '@tanstack/react-router';
import { LogOut, Settings, UserCog } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/ui/dropdown-menu';
import { sidebarData } from './layout/data/sidebar-data';
import { SignOutDialog } from './sign-out-dialog';
import { getInitials } from '../lib/utils';

// Settings routes land in a later phase - typed loosely so this
// compiles against the current route tree in the meantime.
const SETTINGS_URL: LinkProps['to'] | (string & {}) = '/settings';

export function ProfileDropdown() {
  const { t } = useTranslation('dashboard');
  const [signOutOpen, setSignOutOpen] = useState(false);
  const { user } = sidebarData;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative size-8 rounded-full">
            <Avatar className="size-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to={SETTINGS_URL}>
                <UserCog />
                {t('profileDropdown.profile')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={SETTINGS_URL}>
                <Settings />
                {t('profileDropdown.settings')}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setSignOutOpen(true)}
          >
            <LogOut />
            {t('profileDropdown.signOut')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SignOutDialog open={signOutOpen} onOpenChange={setSignOutOpen} />
    </>
  );
}
