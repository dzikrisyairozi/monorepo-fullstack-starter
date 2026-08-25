/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Monorepo Fullstack Starter — Dashboard App
 *
 * @author  Dzikri Syairozi <dzikrisyairozi@gmail.com>
 * @see     https://github.com/dzikrisyairozi/monorepo-fullstack-starter
 * @license MIT
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DEFAULT_THEME, ThemeProvider } from './components/theme-provider';
import { FontProvider } from './context/font-provider';
import { LayoutProvider } from './context/layout-provider';
import { SearchProvider } from './context/search-provider';
import { I18nProvider } from '@repo/i18n';
import { Toaster } from '@repo/ui/components/ui/sonner';
import './index.css';

// Import dashboard i18n resources
import dashboardEn from './i18n/locales/en.json';
import dashboardId from './i18n/locales/id.json';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider
      detection={true}
      defaultNS="dashboard"
      resources={{
        en: { dashboard: dashboardEn },
        id: { dashboard: dashboardId },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme={DEFAULT_THEME} attribute="class">
          <FontProvider>
            <LayoutProvider>
              <SearchProvider>
                <RouterProvider router={router} />
                <Toaster />
              </SearchProvider>
            </LayoutProvider>
          </FontProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </I18nProvider>
  </StrictMode>,
);
