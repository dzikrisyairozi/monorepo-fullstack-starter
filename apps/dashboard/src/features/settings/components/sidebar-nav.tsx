import {
  Link,
  useLocation,
  useNavigate,
  type LinkProps,
} from '@tanstack/react-router';
import { Bell, Monitor, Palette, User, Wrench } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { buttonVariants } from '@repo/ui/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
import { cn } from '@repo/ui/lib/utils';

type SettingsNavItem = {
  to: string;
  labelKey: string;
  icon: typeof User;
};

const items: SettingsNavItem[] = [
  { to: '/settings', labelKey: 'nav.settingsProfile', icon: User },
  { to: '/settings/account', labelKey: 'nav.settingsAccount', icon: Wrench },
  {
    to: '/settings/appearance',
    labelKey: 'nav.settingsAppearance',
    icon: Palette,
  },
  {
    to: '/settings/notifications',
    labelKey: 'nav.settingsNotifications',
    icon: Bell,
  },
  { to: '/settings/display', labelKey: 'nav.settingsDisplay', icon: Monitor },
];

// useNavigate() targets are checked against the full route registry; this
// nav is built from a list that includes routes not shipped yet (Account,
// Notifications, Display land in later tasks), so the boundary is erased
// once here rather than cast at every call site.
type NavigateToPath = (opts: { to: string }) => void;

export function SettingsSidebarNav() {
  const { t } = useTranslation('dashboard');
  const location = useLocation();
  const navigate = useNavigate() as unknown as NavigateToPath;

  return (
    <>
      <div className="md:hidden">
        <Select
          value={location.pathname}
          onValueChange={(value) => navigate({ to: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.to} value={item.to}>
                <item.icon className="text-muted-foreground" />
                {t(item.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <nav className="hidden w-48 shrink-0 flex-col gap-1 md:flex">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to as LinkProps['to']}
            activeOptions={{ exact: true }}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'justify-start',
            )}
            activeProps={{ className: 'bg-muted' }}
          >
            <item.icon className="text-muted-foreground" />
            {t(item.labelKey)}
          </Link>
        ))}
      </nav>
    </>
  );
}
