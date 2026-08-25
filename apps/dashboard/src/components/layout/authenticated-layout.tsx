import { Outlet } from '@tanstack/react-router';
import { SidebarInset, SidebarProvider } from '@repo/ui/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { SkipToMain } from '../skip-to-main';
import { CommandMenu } from '../command-menu';
import { useLayout } from '../../context/layout-provider';

export function AuthenticatedLayout() {
  const { variant, collapsible } = useLayout();

  return (
    <SidebarProvider>
      <SkipToMain />
      <AppSidebar variant={variant} collapsible={collapsible} />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
      <CommandMenu />
    </SidebarProvider>
  );
}
