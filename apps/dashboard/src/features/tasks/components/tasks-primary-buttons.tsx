import { Upload, Plus } from 'lucide-react';
import { useTranslation } from '@repo/i18n';
import { Button } from '@repo/ui/components/ui/button';
import { useTasks } from './tasks-provider';

export function TasksPrimaryButtons() {
  const { t } = useTranslation('dashboard');
  const { setOpen } = useTasks();

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={() => setOpen('import')}>
        <Upload />
        {t('tasks.import.title')}
      </Button>
      <Button onClick={() => setOpen('create')}>
        <Plus />
        {t('tasks.createTask')}
      </Button>
    </div>
  );
}
