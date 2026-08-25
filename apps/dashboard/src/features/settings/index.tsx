import { type ReactNode } from 'react';
import { useTranslation } from '@repo/i18n';
import { SettingsSidebarNav } from './components/sidebar-nav';

export function SettingsLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation('dashboard');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {t('nav.settings')}
        </h2>
        <p className="text-muted-foreground">{t('settings.description')}</p>
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        <SettingsSidebarNav />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
