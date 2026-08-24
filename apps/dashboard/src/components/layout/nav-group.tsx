import { Link, useLocation } from '@tanstack/react-router';
import { useTranslation } from '@repo/i18n';
import { ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/ui/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@repo/ui/components/ui/sidebar';
import {
  type NavCollapsible,
  type NavGroup as NavGroupData,
  type NavItem,
  type NavLink,
} from './types';

function isNavLink(item: NavItem): item is NavLink {
  return !item.items;
}

export function NavGroup({ title, items }: NavGroupData) {
  const { t } = useTranslation('dashboard');
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t(title)}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          isNavLink(item) ? (
            <NavLinkItem key={item.title} item={item} pathname={pathname} />
          ) : (
            <NavCollapsibleItem
              key={item.title}
              item={item}
              pathname={pathname}
            />
          ),
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function NavLinkItem({ item, pathname }: { item: NavLink; pathname: string }) {
  const { t } = useTranslation('dashboard');
  const isActive = pathname === item.url;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={t(item.title)}>
        <Link to={item.url}>
          {item.icon && <item.icon />}
          <span>{t(item.title)}</span>
        </Link>
      </SidebarMenuButton>
      {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
    </SidebarMenuItem>
  );
}

function NavCollapsibleItem({
  item,
  pathname,
}: {
  item: NavCollapsible;
  pathname: string;
}) {
  const { t } = useTranslation('dashboard');
  const isChildActive = item.items.some((sub) => pathname === sub.url);

  return (
    <Collapsible
      asChild
      defaultOpen={isChildActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={t(item.title)} isActive={isChildActive}>
            {item.icon && <item.icon />}
            <span>{t(item.title)}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((sub) => (
              <SidebarMenuSubItem key={sub.title}>
                <SidebarMenuSubButton asChild isActive={pathname === sub.url}>
                  <Link to={sub.url}>
                    {sub.icon && <sub.icon />}
                    <span>{t(sub.title)}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
