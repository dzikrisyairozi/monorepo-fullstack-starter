import { useState, type ChangeEvent } from 'react';
import { useTranslation } from '@repo/i18n';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';
import { Button } from '@repo/ui/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/ui/table';
import { showSubmittedData } from '../../../lib/show-submitted-data';
import { type Task } from '../data/schema';
import { parseTasksCsv, type ParseTasksCsvError } from '../lib/parse-tasks-csv';

function errorMessage(
  t: (key: string, options?: Record<string, unknown>) => string,
  error: ParseTasksCsvError,
): string {
  const { code, ...params } = error;
  return t(`tasks.import.errors.${code}`, params);
}

export function TasksImportDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation('dashboard');
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<Omit<Task, 'id'>[] | null>(null);

  const reset = () => {
    setError(null);
    setRows(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    reset();
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) {
      return;
    }
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError(t('tasks.import.wrongExtension'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const content = String(reader.result ?? '');
      const result = parseTasksCsv(content);
      if (result.ok) {
        setRows(result.rows);
      } else {
        setError(errorMessage(t, result.error));
      }
    };
    reader.readAsText(file);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        reset();
        onOpenChange(next);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('tasks.import.title')}</DialogTitle>
          <DialogDescription>{t('tasks.import.description')}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tasks-csv-file">
              {t('tasks.import.filePrompt')}
            </Label>
            <Input
              id="tasks-csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {rows && (
            <div className="max-h-64 overflow-y-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('tasks.columns.title')}</TableHead>
                    <TableHead>{t('tasks.columns.status')}</TableHead>
                    <TableHead>{t('tasks.label.label')}</TableHead>
                    <TableHead>{t('tasks.columns.priority')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="max-w-48 truncate">
                        {row.title}
                      </TableCell>
                      <TableCell>{t(`tasks.status.${row.status}`)}</TableCell>
                      <TableCell>{t(`tasks.label.${row.label}`)}</TableCell>
                      <TableCell>
                        {t(`tasks.priority.${row.priority}`)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            disabled={!rows}
            onClick={() => {
              if (!rows) return;
              showSubmittedData(rows, t('tasks.import.title'));
              reset();
              onOpenChange(false);
            }}
          >
            {t('tasks.import.confirm', { count: rows?.length ?? 0 })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
