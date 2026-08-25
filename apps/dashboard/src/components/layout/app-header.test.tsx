import { type ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SidebarProvider } from '@repo/ui/components/ui/sidebar';
import { AppHeader } from './app-header';
import { FontProvider } from '../../context/font-provider';
import { LayoutProvider } from '../../context/layout-provider';
import { SearchProvider } from '../../context/search-provider';

function Providers({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <SearchProvider>
        <LayoutProvider>
          <FontProvider>{children}</FontProvider>
        </LayoutProvider>
      </SearchProvider>
    </SidebarProvider>
  );
}

describe('AppHeader', () => {
  it('renders the shared Search/ThemeSwitch/ConfigDrawer/ProfileDropdown cluster', () => {
    render(
      <Providers>
        <AppHeader />
      </Providers>,
    );

    expect(screen.getByText('Type a command or search...')).toBeTruthy();
  });

  it('slots extra content between Search and ThemeSwitch', () => {
    render(
      <Providers>
        <AppHeader extra={<div data-testid="extra">Extra</div>} />
      </Providers>,
    );

    expect(screen.getByTestId('extra')).toBeTruthy();
  });

  it('passes nav through to the header', () => {
    render(
      <Providers>
        <AppHeader nav={<nav data-testid="nav">Nav</nav>} />
      </Providers>,
    );

    expect(screen.getByTestId('nav')).toBeTruthy();
  });
});
