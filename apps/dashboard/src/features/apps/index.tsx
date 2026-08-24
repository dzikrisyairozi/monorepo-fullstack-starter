import { useMemo, useState } from 'react';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent, CardHeader } from '@repo/ui/components/ui/card';
import { Input } from '@repo/ui/components/ui/input';
import { cn } from '@repo/ui/lib/utils';
import { SelectDropdown } from '../../components/select-dropdown';
import { apps } from './data/apps';

type FilterMode = 'all' | 'connected';
type SortOrder = 'asc' | 'desc';

export function Apps() {
  const { t } = useTranslation('dashboard');
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [connections, setConnections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(apps.map((app) => [app.id, app.connected])),
  );

  const visibleApps = useMemo(() => {
    const search_ = search.trim().toLowerCase();
    return apps
      .filter((app) => app.name.toLowerCase().includes(search_))
      .filter((app) => filterMode === 'all' || connections[app.id])
      .sort((a, b) =>
        sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      );
  }, [search, filterMode, sortOrder, connections]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('apps.title')}</h2>
        <p className="text-muted-foreground">{t('apps.description')}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder={t('apps.searchPlaceholder')}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-9 w-full sm:w-64"
        />
        <div className="flex overflow-hidden rounded-md border">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={cn(
              'px-3 py-1.5 text-sm',
              filterMode === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-muted-foreground hover:bg-muted',
            )}
          >
            {t('apps.filterAll')}
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('connected')}
            className={cn(
              'px-3 py-1.5 text-sm',
              filterMode === 'connected'
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-muted-foreground hover:bg-muted',
            )}
          >
            {t('apps.filterConnected')}
          </button>
        </div>
        <SelectDropdown
          value={sortOrder}
          onValueChange={(value) => setSortOrder(value as SortOrder)}
          className="h-9 w-40"
          items={[
            { value: 'asc', label: t('apps.sortAsc') },
            { value: 'desc', label: t('apps.sortDesc') },
          ]}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleApps.map((app) => {
          const isConnected = connections[app.id];
          return (
            <Card key={app.id}>
              <CardHeader className="flex flex-row items-center gap-3">
                <app.icon className="size-9 shrink-0 rounded-md" />
                <div className="min-w-0">
                  <p className="truncate font-medium">{app.name}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t(`apps.descriptions.${app.descriptionKey}`)}
                </p>
                <Button
                  variant={isConnected ? 'outline' : 'default'}
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    setConnections((prev) => ({
                      ...prev,
                      [app.id]: !prev[app.id],
                    }))
                  }
                >
                  {isConnected ? t('apps.connected') : t('apps.connect')}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
