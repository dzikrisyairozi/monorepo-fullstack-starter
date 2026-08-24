import { type Table } from '@tanstack/react-table';
import { X, type LucideIcon } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { DataTableFacetedFilter } from './faceted-filter';
import { DataTableViewOptions } from './view-options';

export function DataTableToolbar<TData>({
  table,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  facets,
}: {
  table: Table<TData>;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  facets?: {
    columnId: string;
    title: string;
    options: { value: string; label: string; icon?: LucideIcon }[];
  }[];
}) {
  const { t } = useTranslation('dashboard');
  const isFiltered =
    table.getState().columnFilters.length > 0 || searchValue.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-8 w-40 lg:w-64"
        />
        {facets?.map((facet) => {
          const column = table.getColumn(facet.columnId);
          return (
            <DataTableFacetedFilter
              key={facet.columnId}
              column={column}
              title={facet.title}
              options={facet.options}
            />
          );
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              onSearchChange('');
            }}
            className="h-8 px-2 lg:px-3"
          >
            {t('dataTable.resetFilters')}
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
