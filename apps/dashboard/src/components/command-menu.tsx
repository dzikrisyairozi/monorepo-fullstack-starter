import { useNavigate } from '@tanstack/react-router';
import { useTheme } from 'next-themes';
import { useTranslation } from '@repo/i18n';
import { Monitor, Moon, Sun } from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@repo/ui/components/ui/command';
import { sidebarData } from './layout/data/sidebar-data';
import { useSearch } from '../context/search-provider';
import { type NavItem, type NavLink } from './layout/types';

type FlatEntry = {
  title: string;
  url: NavLink['url'];
  icon?: React.ElementType;
};

function flattenNavItem(item: NavItem): FlatEntry[] {
  if (!item.items) {
    return [{ title: item.title, url: item.url, icon: item.icon }];
  }
  return item.items.map((sub) => ({
    title: sub.title,
    url: sub.url,
    icon: sub.icon ?? item.icon,
  }));
}

export function CommandMenu() {
  const { open, setOpen } = useSearch();
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const { t } = useTranslation('dashboard');

  const runCommand = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title={t('commandMenu.title')}
      description={t('commandMenu.placeholder')}
    >
      <Command>
        <CommandInput placeholder={t('commandMenu.placeholder')} />
        <CommandList>
          <CommandEmpty>{t('commandMenu.empty')}</CommandEmpty>
          {sidebarData.navGroups.map((group) => (
            <CommandGroup key={group.title} heading={t(group.title)}>
              {group.items.flatMap(flattenNavItem).map((entry) => (
                <CommandItem
                  key={entry.url}
                  value={`${t(entry.title)} ${entry.url}`}
                  onSelect={() => runCommand(() => navigate({ to: entry.url }))}
                >
                  {entry.icon && <entry.icon />}
                  <span>{t(entry.title)}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading={t('commandMenu.theme')}>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <Sun />
              <span>{t('commandMenu.lightTheme')}</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <Moon />
              <span>{t('commandMenu.darkTheme')}</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <Monitor />
              <span>{t('commandMenu.systemTheme')}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
